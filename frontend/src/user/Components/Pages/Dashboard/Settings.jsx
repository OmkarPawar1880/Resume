import { useState } from "react";

import Button from "/src/User/Components/Common/Button";
import Alert from "/src/User/Components/Common/Alert";

import "./Dashboard.css";

// ==========================================================
// Settings Page
// ==========================================================
const Settings = () => {

    const [settings, setSettings] = useState({

        darkMode: false,

        emailNotifications: true,

        language: "English"

    });

    const [success, setSuccess] = useState("");

    const handleToggle = (e) => {

        setSettings({

            ...settings,

            [e.target.name]: e.target.checked

        });

    };

    const handleLanguage = (e) => {

        setSettings({

            ...settings,

            language: e.target.value

        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        // TODO
        // Save settings using backend API

        setSuccess("Settings saved successfully.");

    };

    return (

        <section className="settings-page">

            <div className="settings-card">

                <h1>

                    Settings

                </h1>

                <p>

                    Customize your Resume Builder experience.

                </p>

                {success && (

                    <Alert

                        type="success"

                        message={success}

                    />

                )}

                <form onSubmit={handleSubmit}>

                    {/* ==========================
                        Theme
                    ========================== */}

                    <div className="setting-item">

                        <div>

                            <h3>

                                Dark Mode

                            </h3>

                            <p>

                                Enable dark appearance.

                            </p>

                        </div>

                        <input

                            type="checkbox"

                            name="darkMode"

                            checked={settings.darkMode}

                            onChange={handleToggle}

                        />

                    </div>

                    {/* ==========================
                        Notifications
                    ========================== */}

                    <div className="setting-item">

                        <div>

                            <h3>

                                Email Notifications

                            </h3>

                            <p>

                                Receive updates via email.

                            </p>

                        </div>

                        <input

                            type="checkbox"

                            name="emailNotifications"

                            checked={settings.emailNotifications}

                            onChange={handleToggle}

                        />

                    </div>

                    {/* ==========================
                        Language
                    ========================== */}

                    <div className="setting-item">

                        <div>

                            <h3>

                                Language

                            </h3>

                            <p>

                                Choose your preferred language.

                            </p>

                        </div>

                        <select

                            value={settings.language}

                            onChange={handleLanguage}

                        >

                            <option>

                                English

                            </option>

                            <option>

                                Hindi

                            </option>

                        </select>

                    </div>

                    <Button

                        type="submit"

                        className="settings-btn"

                    >

                        Save Settings

                    </Button>

                </form>

            </div>

        </section>

    );

};

export default Settings;
