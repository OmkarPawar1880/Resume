import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth";


// ==========================================================
// Private Route
// Protect routes that require authentication
// ==========================================================
const PrivateRoute = () => {

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
    // User Not Logged In
    // ======================================================
    if (!isAuthenticated) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }


    // ======================================================
    // User Logged In
    // ======================================================
    return <Outlet />;

};

export default PrivateRoute;