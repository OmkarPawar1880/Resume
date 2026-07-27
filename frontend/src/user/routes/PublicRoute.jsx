import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../Hooks/useAuth";

// ==========================================================
// Public Route
// Prevent logged-in users from accessing
// Login, Register, Forgot Password, etc.
// ==========================================================
const PublicRoute = () => {

    const {
        loading,
        isAuthenticated
    } = useAuth();


    // ======================================================
    // Wait until authentication is checked
    // ======================================================
    if (loading) {

        return (
            <div>
                Loading...
            </div>
        );

    }


    // ======================================================
    // Already Logged In
    // ======================================================
    if (isAuthenticated) {

        return (
            <Navigate
                to="/dashboard"
                replace
            />
        );

    }


    // ======================================================
    // Guest User
    // ======================================================
    return <Outlet />;

};

export default PublicRoute;
