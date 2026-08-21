import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditStudent() {

    const { id } = useParams();

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

       const token = localStorage.getItem("token");

        fetch("http://127.0.0.1:8000/api/courses", {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })

            .then(response => response.json())

            .then(data => {

                setCourses(data);

            })

            .catch(error => {

                console.error("Error:", error);

            });

    }, []);


    // Get the student
    useEffect(() => {

       const token = localStorage.getItem("token");

            fetch(`${API_URL}/${id}`, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })

            .then(response => response.json())

            .then(data => {

                console.log(data);

                setFormData({

                    first_name: data.first_name || "",

                    last_name: data.last_name || "",

                    course_id: data.course_id || "",

                    year: data.year || "",

                    sex: data.sex || "",

                    birthdate: data.birthdate || "",

                    number: data.number || "",

                    address: data.address || ""

                });

            })

            .catch(error => {

                console.error("Error:", error);

            });

    }, [id]);


    // Handle input changes
    const handleChange = (event) => {

        setFormData({

            ...formData,

            [event.target.name]: event.target.value

        });

    };


    // Update student
    const handleSubmit = (event) => {

        event.preventDefault();
        const token = localStorage.getItem("token");

        fetch(`${API_URL}/${id}`, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json",

                "Accept": "application/json",
                 "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify(formData)

        })

            .then(response => response.json())

            .then(data => {

                console.log(data);

                alert("Student updated successfully!");

                         navigate("/students");

            })

            .catch(error => {

                console.error("Error:", error);

            });

    };


    return (

        <div>

            <h2>Edit Student</h2>

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


                <button

                    type="submit"

                    className="save-button"

                >

                    Update Student

                </button>


                <Link to="/students">

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

export default EditStudent;