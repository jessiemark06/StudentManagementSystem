import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function StudentList() {

    const [students, setStudents] = useState([]);
    const [pagination, setPagination] = useState({});
    const [search, setSearch] = useState("");

    const API_URL = "http://127.0.0.1:8000/api/students";


    // Get students
    const getStudents = (page = 1, searchValue = search) => {

        fetch(`${API_URL}?page=${page}&search=${searchValue}`)
            .then(response => response.json())
            .then(data => {

                console.log(data);

                setStudents(data.data);
                setPagination(data);

            })
            .catch(error => {
                console.error("Error:", error);
            });
    };


    useEffect(() => {
        getStudents();
    }, []);


    // Search
    const handleSearch = (e) => {

        const value = e.target.value;

        setSearch(value);

        // Go back to page 1 when searching
        getStudents(1, value);
    };


    // Delete student
    const deleteStudent = (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (!confirmDelete) {
            return;
        }

        fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        })
            .then(response => response.json())
            .then(data => {

                console.log(data);

                // Refresh current page
                getStudents(pagination.current_page);

            })
            .catch(error => {
                console.error("Error:", error);
            });
    };


    return (
        <div>

            <div className="top-section">

                <h2>Students</h2>

                <Link to="/students/add">
                    <button className="add-button">
                        + Add Student
                    </button>
                </Link>

            </div>


            {/* Search */}

            <div className="search-section">

                <input
                    type="text"
                    placeholder="Search students..."
                    value={search}
                    onChange={handleSearch}
                />

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

                    {students.map(student => (

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

                                <Link
                                    to={`/students/edit/${student.id}`}
                                >
                                    <button className="edit-button">
                                        Edit
                                    </button>
                                </Link>


                                <button
                                    className="delete-button"
                                    onClick={() =>
                                        deleteStudent(student.id)
                                    }
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>


            {/* Pagination */}

            <div className="pagination">

                <button
                    onClick={() =>
                        getStudents(
                            pagination.current_page - 1
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
                            pagination.current_page + 1
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