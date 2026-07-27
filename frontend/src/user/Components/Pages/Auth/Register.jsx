import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Input from "/Src/User/Components/Common/Input";
import Button from "/Src/User/Components/Common/Button";
import Alert from "/Src/User/Components/Common/Alert";
import Loader from "/Src/User/Components/Common/Loader";

import useAuth from "/Src/User/Hooks/useAuth";

import "./Auth.css";

// ==========================================================
// Register Page
// ==========================================================
const Register = () => {

    const navigate = useNavigate();

    const { register } = useAuth();

    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState("");

    const [error, setError] = useState("");

    const [formData, setFormData] = useState({

        first_name: "",

        last_name: "",

        email: "",

        phone: "",

        password: ""

    });

    // ======================================================
    // Handle Input Change
    // ======================================================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    // ======================================================
    // Register User
    // ======================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        console.log("1. handleSubmit called");

        setLoading(true);

        setError("");

        setSuccess("");

        try {

            await register(formData);

            setSuccess(

                "Account created successfully. Please login."

            );

            setTimeout(() => {

                navigate("/login");

            }, 1500);

        }

        catch (err) {

            setError(

                err?.response?.data?.detail ||

                "Registration failed."

            );

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <Loader

                fullScreen

                text="Creating Account..."

            />

        );

    }

    return (

        <section className="register-page">

            <div className="register-card">

                <h1>

                    Create Your Account

                </h1>

                <p>

                    Start building professional resumes today.

                </p>

                {success && (

                    <Alert

                        type="success"

                        message={success}

                    />

                )}

                {error && (

                    <Alert

                        type="error"

                        message={error}

                    />

                )}

                <form onSubmit={handleSubmit}>

                    <Input
                        label="First Name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        label="Last Name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />

                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <Button
                        type="submit"
                        className="register-btn"
                    >
                        Create Account
                    </Button>

                </form>

                <div className="register-links">

                    <span>

                        Already have an account?

                    </span>

                    <Link to="/login">

                        Login

                    </Link>

                </div>

            </div>

        </section>

    );

};

export default Register;