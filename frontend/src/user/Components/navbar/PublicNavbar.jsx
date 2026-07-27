import { Link } from "react-router-dom";

import "./PublicNavbar.css";

import Button from "/Src/User/Components/Common/Button";

// ==========================================================
// Public Navigation Bar
// ==========================================================
const PublicNavbar = () => {

    return (

        <header className="navbar">

            {/* ==========================
                Logo
            ========================== */}

            <Link
                to="/"
                className="navbar-logo"
            >
                ResumeBuilder
            </Link>

            {/* ==========================
                Navigation Links
            ========================== */}

            <nav className="navbar-links">

                <a href="#home">
                    Home
                </a>

                <a href="#features">
                    Features
                </a>

                <a href="#templates">
                    Templates
                </a>

                <a href="#pricing">
                    Pricing
                </a>

                <a href="#contact">
                    Contact
                </a>

            </nav>

            {/* ==========================
                Authentication Buttons
            ========================== */}

            <div className="navbar-actions">

                <Link to="/login">

                    <Button variant="secondary">

                        Login

                    </Button>

                </Link>

                <Link to="/register">

                    <Button>

                        Create Account

                    </Button>

                </Link>

            </div>

        </header>

    );

};

export default PublicNavbar;