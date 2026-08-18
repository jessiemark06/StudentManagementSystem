import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    });

    const [error, setError] = useState("");

    const API_URL = "http://127.0.0.1:8000/api/register";


    // Handle input
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    // Submit signup
    const handleSubmit = (e) => {

        e.preventDefault();

        setError("");

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

                if (data.message) {
                    alert("Registration successful!");

                    navigate("/");
                }

            })
            .catch(error => {

                console.error("Error:", error);

                setError(
                    "Something went wrong. Please try again."
                );

            });

    };


    return (
        <div className="signup-container">

            <h2>Create Account</h2>

            {error && (
                <p className="error">
                    {error}
                </p>
            )}

            <form onSubmit={handleSubmit}>

                <div className="form-group">

                    <label>Name</label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                    />

                </div>


                <div className="form-group">

                    <label>Email</label>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />

                </div>


                <div className="form-group">

                    <label>Password</label>

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                    />

                </div>


                <div className="form-group">

                    <label>Confirm Password</label>

                    <input
                        type="password"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        required
                    />

                </div>


                <button type="submit">
                    Sign Up
                </button>

            </form>


            <p>
                Already have an account?{" "}
                <Link to="/login">
                    Login
                </Link>
            </p>

        </div>
    );
}

export default Signup;