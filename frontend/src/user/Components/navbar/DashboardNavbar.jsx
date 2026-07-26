import { Link, NavLink } from "react-router-dom";

import "./DashboardNavbar.css";

import Button from "/src/user/Components/common/Button";
import useAuth from "/src/user/hooks/useAuth";

// ==========================================================
// Dashboard Navigation Bar
// ==========================================================
const DashboardNavbar = () => {

    const {
        user,
        logout
    } = useAuth();

    return (

        <header className="dashboard-navbar">

            {/* ==========================
                Logo
            ========================== */}

            <Link
                to="/dashboard"
                className="dashboard-logo"
            >
                ResumeBuilder
            </Link>

            {/* ==========================
                Navigation Links
            ========================== */}

            <nav className="dashboard-links">

                <NavLink to="/dashboard">
                    Dashboard
                </NavLink>

                <NavLink to="/profile">
                    Profile
                </NavLink>

                <NavLink to="/settings">
                    Settings
                </NavLink>

                <NavLink to="/account">
                    Account
                </NavLink>

            </nav>

            {/* ==========================
                User Information
            ========================== */}

            <div className="dashboard-user">

                <div className="user-details">

                    <span className="user-name">
                        {user?.first_name} {user?.last_name}
                    </span>

                    <span className="user-email">
                        {user?.email}
                    </span>

                </div>

                <Button
                    variant="danger"
                    onClick={logout}
                >
                    Logout
                </Button>

            </div>

        </header>

    );

};

export default DashboardNavbar;