import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
    return (
        <div className="landing-page">

            {/* Navbar */}
            <nav className="navbar">
                <div className="navbar-container">

                    <Link to="/" className="logo">
                        <div className="logo-icon">S</div>
                        <span>StudentHub</span>
                    </Link>

                    <div className="nav-links">
                        <a href="#home">Home</a>
                        <a href="#features">Features</a>
                        <a href="#about">About</a>
                    </div>

                    <div className="auth-buttons">
                        <Link to="/login" className="login-btn">
                            Login
                        </Link>
 
                    </div>

                </div>
            </nav>


            {/* Hero Section */}
            <section id="home" className="hero">

                <div className="hero-container">

                    <div className="hero-content">

                        <div className="hero-badge">
                            <span></span>
                            Simple • Powerful • Reliable
                        </div>

                        <h1>
                            Manage Everything
                            <strong> In One Place.</strong>
                        </h1>

                        <p>
                            A modern platform designed to help you manage
                            your information efficiently, stay organized,
                            and access everything you need from one place.
                        </p>

                        <div className="hero-buttons">

                            <Link to="/signup" className="primary-btn">
                                Get Started →
                            </Link>

                            <Link to="/login" className="secondary-btn">
                                Login
                            </Link>

                        </div>

                        <div className="hero-checks">
                            <span>✓ Easy to use</span>
                            <span>✓ Secure</span>
                            <span>✓ Reliable</span>
                        </div>

                    </div>


                    {/* Dashboard Preview */}
                    <div className="dashboard-wrapper">

                        <div className="dashboard-card">

                            <div className="browser-bar">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>

                            <div className="dashboard-content">

                                <div className="dashboard-header">

                                    <div>
                                        <small>Welcome back</small>
                                        <h2>Dashboard</h2>
                                    </div>

                                    <div className="profile-circle">
                                        U
                                    </div>

                                </div>


                                <div className="stats">

                                    <div className="stat-card">
                                        <small>Total Users</small>
                                        <h3>1,248</h3>
                                        <p>+12% this month</p>
                                    </div>

                                    <div className="stat-card">
                                        <small>Total Records</small>
                                        <h3>3,426</h3>
                                        <p>+8% this month</p>
                                    </div>

                                </div>


                                <div className="activity">

                                    <div className="activity-title">
                                        Recent Activity
                                    </div>

                                    <div className="activity-item">
                                        <span></span>
                                        New user registered
                                    </div>

                                    <div className="activity-item">
                                        <span></span>
                                        Record successfully updated
                                    </div>

                                    <div className="activity-item">
                                        <span></span>
                                        New activity recorded
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* Features */}
            <section id="features" className="features">

                <div className="section-container">

                    <div className="section-heading">
                        <span>FEATURES</span>

                        <h2>
                            Everything You Need
                        </h2>

                        <p>
                            Powerful features designed to make your work
                            easier and more efficient.
                        </p>
                    </div>


                    <div className="feature-grid">

                        <div className="feature-card">
                            <div className="feature-icon blue">
                                ✓
                            </div>

                            <h3>Easy to Use</h3>

                            <p>
                                A clean and intuitive interface that makes
                                managing your information simple.
                            </p>
                        </div>


                        <div className="feature-card">
                            <div className="feature-icon green">
                                🔒
                            </div>

                            <h3>Secure</h3>

                            <p>
                                Keep your information protected with secure
                                authentication and access control.
                            </p>
                        </div>


                        <div className="feature-card">
                            <div className="feature-icon purple">
                                ⚡
                            </div>

                            <h3>Fast & Reliable</h3>

                            <p>
                                Quickly access and manage your information
                                through a responsive system.
                            </p>
                        </div>

                    </div>

                </div>

            </section>


            {/* About / CTA */}
            <section id="about" className="cta">

                <div className="cta-container">

                    <h2>
                        Ready to Get Started?
                    </h2>

                    <p>
                        Create your account and start using the system today.
                    </p>

                    <Link to="/signup" className="cta-button">
                        Create an Account
                    </Link>

                </div>

            </section>


            {/* Footer */}
            <footer className="footer">

                <div className="footer-container">

                    <div className="footer-logo">
                        StudentHub
                    </div>

                    <p>
                        © 2026 c. All rights reserved.
                    </p>

                    <div className="footer-links">
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign Up</Link>
                    </div>

                </div>

            </footer>

        </div>
    );
}

export default LandingPage;