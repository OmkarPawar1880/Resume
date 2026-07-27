import api from "./axios";

// ==========================================================
// Get Logged-in User Profile
// GET /api/user/users/me
// ==========================================================
export const getUserProfile = async () => {
    const response = await api.get(
        "/user/users/me"
    );

    return response.data;
};


// ==========================================================
// Update User Profile
// PUT /api/user/users/update
// ==========================================================
export const updateUserProfile = async (userData) => {
    const response = await api.put(
        "/user/users/update",
        userData
    );

    return response.data;
};


// ==========================================================
// Change Password
// PUT /api/user/users/change-password
// ==========================================================
export const changePassword = async (passwordData) => {
    const response = await api.put(
        "/user/users/change-password",
        passwordData
    );

    return response.data;
};


// ==========================================================
// Delete Account
// DELETE /api/user/users/delete
// ==========================================================
export const deleteAccount = async () => {
    const response = await api.delete(
        "/user/users/delete"
    );

    return response.data;
};
