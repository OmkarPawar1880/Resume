import { useState } from "react";

import Button from "/src/User/Components/Common/Button";
import Input from "/src/User/Components/Common/Input";
import Alert from "/src/User/Components/Common/Alert";
import Loader from "/src/User/Components/Common/Loader";

import useAuth from "/src/User/Hooks/useAuth";

import "./Dashboard.css";

// ==========================================================
// Profile Page
// ==========================================================
const Profile = () => {

    const { user } = useAuth();

    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState("");

    const [error, setError] = useState("");

    const [formData, setFormData] = useState({

        first_name: user?.first_name || "",

        last_name: user?.last_name || "",

        email: user?.email || "",

        phone: user?.phone || ""

    });

    // ======================================================
    // Handle Change
    // ======================================================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    // ======================================================
    // Save Profile
    // ======================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        setSuccess("");

        try {

            // TODO:
            // await userApi.updateProfile(formData);

            setSuccess(

                "Profile updated successfully."

            );

        }

        catch (err) {

            setError(

                err?.response?.data?.detail ||

                "Unable to update profile."

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

                text="Updating Profile..."

            />

        );

    }

    return (

        <section className="profile-page">

            <div className="profile-card">

                <h1>

                    My Profile

                </h1>

                <p>

                    Update your personal information.

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

                        name="email"

                        value={formData.email}

                        disabled

                    />

                    <Input

                        label="Phone Number"

                        name="phone"

                        value={formData.phone}

                        onChange={handleChange}

                    />

                    <Button

                        type="submit"

                        className="profile-btn"

                    >

                        Save Changes

                    </Button>

                </form>

            </div>

        </section>

    );

};

export default Profile;
