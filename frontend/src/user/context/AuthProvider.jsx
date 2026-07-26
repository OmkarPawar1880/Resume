import { useCallback, useEffect, useState } from "react";

import AuthContext from "./AuthContext";

import {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser
} from "../api/authApi";

// ==========================================================
// Auth Provider
// ==========================================================

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // ======================================================
    // Logout
    // ======================================================

  const logout = useCallback(() => {

    try {

        logoutUser();

    } catch (error) {

        console.error(error);

    }

    localStorage.removeItem("access_token");

    localStorage.removeItem("refresh_token");

    // Remove any cached user data
    localStorage.removeItem("current_user");

    setUser(null);

    setIsAuthenticated(false);

}, []);

    // ======================================================
    // Load Current User
    // ======================================================

   const loadUser = useCallback(async () => {

    const token = localStorage.getItem("access_token");

    if (!token) {

        setLoading(false);

        return;

    }

    try {

        const data = await getCurrentUser();

        console.log("Current User:", data);

        setUser(data);

        localStorage.setItem(
        "current_user",
         JSON.stringify(data)
            );

        setIsAuthenticated(true);

    }

    catch {

        logout();

    }

    finally {

        setLoading(false);

    }

}, [logout]);


    // ======================================================
    // Login
    // ======================================================

    const login = async (loginData) => {

        const data = await loginUser(loginData);

        localStorage.setItem(
            "access_token",
            data.access_token
        );

        localStorage.setItem(
            "refresh_token",
            data.refresh_token
        );

        await loadUser();

    };

    // ======================================================
// Register
// ======================================================

const register = async (userData) => {

    console.log("2. register() called");
    console.log(userData);

    const data = await registerUser(userData);

    return data;

};
    // ======================================================
    // Load User on Startup
    // ======================================================

    useEffect(() => {

        loadUser();

    }, [loadUser]);

    return (

        <AuthContext.Provider

    value={{

        user,

        loading,

        isAuthenticated,

        register,

        login,

        logout,

        loadUser

    }}

>

            {children}

        </AuthContext.Provider>

    );

};

export default AuthProvider;