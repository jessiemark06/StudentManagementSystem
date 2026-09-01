 
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddCourse() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        course_name: ""
    });

    const API_URL = "http://127.0.0.1:8000/api/courses";


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

        const token = localStorage.getItem("token");

        fetch(API_URL, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {

                console.log(data);

                alert("Course added successfully!");

                navigate("/students");

            })
            .catch(error => {

                console.error("Error:", error);

            });

    };


    return (
        <div className="container">

            <h2>Add Course</h2>

            <form onSubmit={handleSubmit}>

                <div className="form-group">

                    <label>
                        Course Name
                    </label>

                    <input
                        type="text"
                        name="course_name"
                        value={formData.course_name}
                        onChange={handleChange}
                        placeholder="Enter course name"
                        required
                    />

                </div>


                <button
                    type="submit"
                    className="save-button"
                >
                    Add Course
                </button>


                <button
                    type="button"
                    className="back-button"
                    onClick={() => navigate("/students")}
                >
                    Cancel
                </button>

            </form>

        </div>
    );
}

export default AddCourse;
 