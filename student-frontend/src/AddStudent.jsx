import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddStudent() {

    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        course_id: "",
        year: "",
        sex: "",
        birthdate: "",
        number: "",
        address: ""
    });

    const API_URL = "http://127.0.0.1:8000/api/students";

    // Get courses
    useEffect(() => {

        fetch("http://127.0.0.1:8000/api/courses")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setCourses(data);
            })
            .catch(error => {
                console.error("Error:", error);
            });

    }, []);


    // Handle input changes
    const handleChange = (event) => {

        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });

    };


    // Submit form
    const handleSubmit = (event) => {

        event.preventDefault();

        fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },

            body: JSON.stringify(formData)

        })

            .then(response => response.json())

            .then(data => {

                console.log(data);

                alert("Student added successfully!");

                // Go back to student list
                navigate("/");

            })

            .catch(error => {

                console.error("Error:", error);

            });

    };


    return (

        <div>

            <h2>Add Student</h2>

            <form onSubmit={handleSubmit}>

                <div className="form-group">

                    <label>First Name</label>

                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                    />

                </div>


                <div className="form-group">

                    <label>Last Name</label>

                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                    />

                </div>


                <div className="form-group">

                    <label>Course</label>

                    <select
                        name="course_id"
                        value={formData.course_id}
                        onChange={handleChange}
                    >

                        <option value="">
                            Select Course
                        </option>

                        {courses.map(course => (

                            <option
                                key={course.id}
                                value={course.id}
                            >
                                {course.course_name}
                            </option>

                        ))}

                    </select>

                </div>


                <div className="form-group">

                    <label>Year</label>

                    <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                    />

                </div>


                <div className="form-group">

                    <label>Sex</label>

                    <select
                        name="sex"
                        value={formData.sex}
                        onChange={handleChange}
                    >

                        <option value="">
                            Select Sex
                        </option>

                        <option value="Male">
                            Male
                        </option>

                        <option value="Female">
                            Female
                        </option>

                    </select>

                </div>


                <div className="form-group">

                    <label>Birthdate</label>

                    <input
                        type="date"
                        name="birthdate"
                        value={formData.birthdate}
                        onChange={handleChange}
                    />

                </div>


                <div className="form-group">

                    <label>Number</label>

                    <input
                        type="text"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                    />

                </div>


                <div className="form-group">

                    <label>Address</label>

                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />

                </div>


                <button type="submit" className="save-button">
                    Add Student
                </button>


                <Link to="/">
                    <button
                        type="button"
                        className="cancel-button"
                    >
                        Cancel
                    </button>
                </Link>

            </form>

        </div>

    );
}

export default AddStudent;