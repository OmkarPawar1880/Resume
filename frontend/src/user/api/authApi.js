import api from "./axios";



// ==========================================================
// Register User
// POST /api/user/auth/register
// ==========================================================
export const registerUser = async (userData) => {

    console.log("3. Calling Backend");

    const response = await api.post(
        "/user/auth/register",
        userData
    );

    return response.data;
};

// ==========================================================
// Login User
// POST /api/user/auth/login
// ==========================================================


export const loginUser = async (loginData) => {

    const formData = new URLSearchParams();

    formData.append("username", loginData.email);

    formData.append("password", loginData.password);

    const response = await api.post(
        "/user/auth/login",
        formData,
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );

    return response.data;
};

// ==========================================================
// Get Current User
// GET /api/user/users/me
// ==========================================================
export const getCurrentUser = async () => {
    const response = await api.get(
        "/user/users/me"
    );

    return response.data;
};


// ==========================================================
// Forgot Password
// POST /api/user/auth/forgot-password
// ==========================================================
export const forgotPassword = async (email) => {
    const response = await api.post(
        "/user/auth/forgot-password",
        {
            email
        }
    );

    return response.data;
};


// ==========================================================
// Reset Password
// POST /api/user/auth/reset-password
// ==========================================================
export const resetPassword = async (data) => {
    const response = await api.post(
        "/user/auth/reset-password",
        data
    );

    return response.data;
};


// ==========================================================
// Logout User
// ==========================================================
export const logoutUser = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
};