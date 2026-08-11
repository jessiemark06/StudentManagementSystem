import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function StudentList() {
    const [students, setStudents] = useState([]);

    const API_URL = "http://127.0.0.1:8000/api/students";

    // Get students
    const getStudents = () => {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setStudents(data);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    };

    useEffect(() => {
        getStudents();
    }, []);

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

                // Remove deleted student from screen
                setStudents(
                    students.filter(student => student.id !== id)
                );
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
                                    ? student.course.name
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

        </div>
    );
}

export default StudentList;