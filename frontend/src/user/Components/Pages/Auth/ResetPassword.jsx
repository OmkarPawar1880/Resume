import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";

import Button from "/src/user/Components/common/Button";
import Input from "/src/user/Components/common/Input";
import Alert from "/src/user/Components/common/Alert";
import Loader from "/src/user/components/common/Loader";

import "./Auth.css";

// ==========================================================
// Reset Password Page
// ==========================================================
const ResetPassword = () => {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");

    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState("");

    const [error, setError] = useState("");

    const [formData, setFormData] = useState({

        password: "",

        confirmPassword: ""

    });

    // ======================================================
    // Handle Input
    // ======================================================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    // ======================================================
    // Submit
    // ======================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        setSuccess("");

        if (formData.password !== formData.confirmPassword) {

            setError("Passwords do not match.");

            return;

        }

        setLoading(true);

        try {

            // TODO
            // await authApi.resetPassword({
            //     token,
            //     password: formData.password
            // });

            setSuccess(

                "Password updated successfully."

            );

            setTimeout(() => {

                navigate("/login");

            }, 2000);

        }

        catch (err) {

            setError(

                err?.response?.data?.detail ||

                "Unable to reset password."

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

                text="Updating Password..."

            />

        );

    }

    return (

        <section className="reset-page">

            <div className="reset-card">

                <h1>

                    Reset Password

                </h1>

                <p>

                    Enter your new password.

                </p>

                {!token && (

                    <Alert

                        type="warning"

                        message="Reset token is missing or invalid."

                    />

                )}

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

                        label="New Password"

                        type="password"

                        name="password"

                        value={formData.password}

                        onChange={handleChange}

                        required

                    />

                    <Input

                        label="Confirm Password"

                        type="password"

                        name="confirmPassword"

                        value={formData.confirmPassword}

                        onChange={handleChange}

                        required

                    />

                    <Button

                        type="submit"

                        className="reset-btn"

                        disabled={!token}

                    >

                        Update Password

                    </Button>

                </form>

                <div className="reset-links">

                    <Link to="/login">

                        Back to Login

                    </Link>

                </div>

            </div>

        </section>

    );

};

export default ResetPassword;