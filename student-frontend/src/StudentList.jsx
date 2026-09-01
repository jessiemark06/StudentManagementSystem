import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function StudentList() {

    const [students, setStudents] = useState([]);
    const [pagination, setPagination] = useState({});
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const API_URL = "http://127.0.0.1:8000/api/students";

 
   const getStudents = (
    page = 1,
    searchValue = search,
    sortValue = sort
) => {
    setLoading(true);

    const token = localStorage.getItem("token");

    fetch(
        `${API_URL}?page=${page}&search=${encodeURIComponent(searchValue)}&sort=${encodeURIComponent(sortValue)}`,
        {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        }
    )
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            return response.json();
        })
        .then(data => {
            console.log(data);

            setStudents(data.data || []);
            setPagination(data);
        })
        .catch(error => {
            console.error("Error:", error);
            setStudents([]);
        })
        .finally(() => {
            setLoading(false);
        });
};

    // Initial load
    useEffect(() => {
        getStudents();
    }, []);


    // Search
    const handleSearch = (e) => {

        const value = e.target.value;

        setSearch(value);

        // Go back to page 1
        getStudents(1, value, sort);
    };


    // Sort
    const handleSort = (e) => {

        const value = e.target.value;

        setSort(value);

        // Go back to page 1
        getStudents(1, search, value);
    };


    // Delete student
    const deleteStudent = (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (!confirmDelete) {
            return;
        }

      const token = localStorage.getItem("token");

        fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: {
              "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {

                console.log(data);

                // Refresh current page
                getStudents(
                    pagination.current_page,
                    search,
                    sort
                );

            })
            .catch(error => {
                console.error("Error:", error);
            });
    };

        const handleLogout = async () => {

            const token = localStorage.getItem("token");

            try {

                await fetch("http://127.0.0.1:8000/api/logout", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

            } catch (error) {
                console.error(error);
            }

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            navigate("/");
        };

    return (
       <div className="container student-list-page">

        <div className="logout-section">
            <button
                className="logout-button"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>

         <div className="top-section">

    <h2>Students</h2>

    <div className="top-buttons">

        <Link to="/courses/add">
            <button className="add-course-button">
                + Add Course
            </button>
        </Link>

        <Link to="/students/add">
            <button className="add-button">
                + Add Student
            </button>
        </Link>

    </div>

</div>

            {/* Search and Order By */}

            <div className="search-section">

                <input
                    type="text"
                    placeholder="Search students..."
                    value={search}
                    onChange={handleSearch}
                />


                <select
                    value={sort}
                    onChange={handleSort}
                >

                    <option value="">
                        Order By
                    </option>

                    <option value="first_name">
                        First Name
                    </option>

                    <option value="last_name">
                        Last Name
                    </option>

                    <option value="year">
                        Year
                    </option>

                    <option value="birthdate">
                        Birthdate
                    </option>

                </select>

            </div>


            {/* Students Table */}

          <table>
    <thead>
        <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Course</th>
            <th>Year</th>
            <th>Sex</th>
            <th>Birthdate</th>
            <th>Number</th>
            <th>Address</th>
            <th>Actions</th>
        </tr>
    </thead>

    <tbody>
        {loading ? (
            <tr>
                <td colSpan="10" className="loading-message">
                    Loading students...
                </td>
            </tr>
        ) : students.length === 0 ? (
            <tr>
                <td colSpan="10" className="empty-message">
                    No students found.
                </td>
            </tr>
        ) : (
            students.map(student => (
                <tr key={student.id}>
                    <td>{student.id}</td>

                    <td>{student.first_name}</td>

                    <td>{student.last_name}</td>

                    <td>
                        {student.course
                            ? student.course.course_name
                            : "No Course"}
                    </td>

                    <td>{student.year}</td>

                    <td>{student.sex}</td>

                    <td>{student.birthdate}</td>

                    <td>{student.number}</td>

                    <td>{student.address}</td>

                    <td>
                        <Link to={`/students/edit/${student.id}`}>
                            <button className="edit-button">
                                Edit
                            </button>
                        </Link>

                        <button
                            className="delete-button"
                            onClick={() => deleteStudent(student.id)}
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))
        )}
    </tbody>
</table>


            {/* Pagination */}

            <div className="pagination">

                <button
                    onClick={() =>
                        getStudents(
                            pagination.current_page - 1,
                            search,
                            sort
                        )
                    }
                    disabled={pagination.current_page === 1}
                >
                    Previous
                </button>


                <span>
                    Page {pagination.current_page} of{" "}
                    {pagination.last_page}
                </span>


                <button
                    onClick={() =>
                        getStudents(
                            pagination.current_page + 1,
                            search,
                            sort
                        )
                    }
                    disabled={
                        pagination.current_page ===
                        pagination.last_page
                    }
                >
                    Next
                </button>

            </div>

        </div>
    );
}

export default StudentList;