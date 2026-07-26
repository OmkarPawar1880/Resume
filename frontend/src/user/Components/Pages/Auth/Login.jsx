import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Input from "/src/user/Components/common/Input";
import Button from "/src/user/Components/common/Button";
import Loader from "/src/user/Components/common/Loader";
import Alert from "/src/user/Components/common/Alert";

import useAuth from "/src/user/hooks/useAuth";

import "./Auth.css";

// ==========================================================
// Login Page
// ==========================================================
const Login = () => {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [formData, setFormData] = useState({

        email: "",

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
    // Login
    // ======================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            await login(formData);

            navigate("/dashboard");

        }

        catch (err) {

            setError(

                err?.response?.data?.detail ||

                "Invalid email or password."

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

                text="Signing In..."

            />

        );

    }

    return (

        <section className="login-page">

            <div className="login-card">

                <h1>

                    Welcome Back

                </h1>

                <p>

                    Login to continue building your resume.

                </p>

                {error && (

                    <Alert

                        type="error"

                        message={error}

                    />

                )}

                <form onSubmit={handleSubmit}>

                    <Input

                        label="Email"

                        name="email"

                        type="email"

                        value={formData.email}

                        onChange={handleChange}

                        required

                    />

                    <Input

                        label="Password"

                        name="password"

                        type="password"

                        value={formData.password}

                        onChange={handleChange}

                        required

                    />

                    <Button

                        type="submit"

                        className="login-btn"

                    >

                        Login

                    </Button>

                </form>

                <div className="login-links">

                    <Link to="/forgot-password">

                        Forgot Password?

                    </Link>

                    <span>

                        Don't have an account?

                    </span>

                    <Link to="/register">

                        Create Account

                    </Link>

                </div>

            </div>

        </section>

    );

};

export default Login;