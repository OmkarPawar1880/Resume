import { useState } from "react";
import { Link } from "react-router-dom";

import Button from "/src/user/Components/common/Button";
import Input from "/src/user/Components/common/Input";
import Alert from "/src/user/Components/common/Alert";
import Loader from "/src/user/Components/common/Loader";

import "./Auth.css";

// ==========================================================
// Forgot Password Page
// ==========================================================
const ForgotPassword = () => {

    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState("");

    const [error, setError] = useState("");

    // ======================================================
    // Submit
    // ======================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setSuccess("");

        setError("");

        try {

            // TODO:
            // await authApi.forgotPassword(email);

            setSuccess(

                "If an account exists with this email, a password reset link has been sent."

            );

        }

        catch (err) {

            setError(

                err?.response?.data?.detail ||

                "Unable to process your request."

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

                text="Sending Reset Link..."

            />

        );

    }

    return (

        <section className="forgot-page">

            <div className="forgot-card">

                <h1>

                    Forgot Password

                </h1>

                <p>

                    Enter your registered email address and we'll send you a password reset link.

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

                        label="Email"

                        type="email"

                        name="email"

                        value={email}

                        onChange={(e) => setEmail(e.target.value)}

                        required

                    />

                    <Button

                        type="submit"

                        className="forgot-btn"

                    >

                        Send Reset Link

                    </Button>

                </form>

                <div className="forgot-links">

                    <Link to="/login">

                        Back to Login

                    </Link>

                </div>

            </div>

        </section>

    );

};

export default ForgotPassword;