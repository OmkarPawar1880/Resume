import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

import Landing from "/Src/user/Components/Pages/Landing/Landing";
import Login from "/Src/User/Components/Pages/Auth/Login";
import Register from "/Src/User/Components/Pages/Auth/Register";
import ForgotPassword from "/Src/User/Components/Pages/Auth/ForgotPassword";
import ResetPassword from "/Src/User/Components/Pages/Auth/ResetPassword";

import Dashboard from "/Src/User/Components/Pages/Dashboard/Dashboard";
import Profile from "/Src/User/Components/Pages/Dashboard/Profile";
import Settings from "/Src/User/Components/Pages/Dashboard/Settings";
import Account from "/Src/User/Components/Pages/Dashboard/Account";

import ResumeBuilder from "/Src/Resume/Pages/ResumeBuilder";
import NotFound from "/Src/User/Components/Pages/NotFound/NotFound";

const AppRoutes = () => {
    // Replace this with your auth state
    const isAuthenticated = !!localStorage.getItem("access_token");

    return (
        <BrowserRouter>
            <Routes>

                {/* Root Route */}
                <Route
                    path="/"
                    element={
                        isAuthenticated
                            ? <Navigate to="/dashboard" replace />
                            : <Landing />
                    }
                />

                {/* Public Routes */}
                <Route element={<PublicRoute />}>

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />

                </Route>

                {/* Private Routes */}
                <Route element={<PrivateRoute />}>

                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/resume-builder" element={<ResumeBuilder />} />

                </Route>

                <Route path="*" element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;