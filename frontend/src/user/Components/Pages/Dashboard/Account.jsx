import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "/src/user/Components/common/Button";
import Alert from "/src/user/Components/common/Alert";
import Modal from "/src/user/Components/common/Modal";

import useAuth from "/src/user/hooks/useAuth";

import "./Dashboard.css";

// ==========================================================
// Account Page
// ==========================================================
const Account = () => {

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    

    const [error, setError] = useState("");

    // ======================================================
    // Logout
    // ======================================================

    const handleLogout = () => {

        logout();

        navigate("/login");

    };

    // ======================================================
    // Delete Account
    // ======================================================

    const handleDeleteAccount = async () => {

        try {

            // TODO
            // await userApi.deleteAccount();

            logout();

            navigate("/");

        }

        catch (err) {

            setError(

                err?.response?.data?.detail ||

                "Unable to delete account."

            );

        }

    };

    return (

        <section className="account-page">

            <div className="account-card">

                <h1>

                    Account

                </h1>

                <p>

                    Manage your account and security settings.

                </p>

                

                {error && (

                    <Alert
                        type="error"
                        message={error}
                    />

                )}

                {/* ==========================
                    Account Information
                ========================== */}

                <div className="account-section">

                    <h2>

                        Account Information

                    </h2>

                    <div className="account-item">

                        <strong>

                            Name

                        </strong>

                        <span>

                            {user?.first_name} {user?.last_name}

                        </span>

                    </div>

                    <div className="account-item">

                        <strong>

                            Email

                        </strong>

                        <span>

                            {user?.email}

                        </span>

                    </div>

                    <div className="account-item">

                        <strong>

                            Account Status

                        </strong>

                        <span>

                            {user?.is_verified

                                ? "Verified"

                                : "Not Verified"}

                        </span>

                    </div>

                </div>

                {/* ==========================
                    Security
                ========================== */}

                <div className="account-section">

                    <h2>

                        Security

                    </h2>

                    <Button>

                        Change Password

                    </Button>

                </div>

                {/* ==========================
                    Logout
                ========================== */}

                <div className="account-section">

                    <h2>

                        Session

                    </h2>

                    <Button

                        variant="secondary"

                        onClick={handleLogout}

                    >

                        Logout

                    </Button>

                </div>

                {/* ==========================
                    Danger Zone
                ========================== */}

                <div className="danger-zone">

                    <h2>

                        Danger Zone

                    </h2>

                    <p>

                        Permanently delete your account and all associated data.

                    </p>

                    <Button

                        variant="danger"

                        onClick={() => setShowDeleteModal(true)}

                    >

                        Delete Account

                    </Button>

                </div>

            </div>

            {/* ==========================
                Delete Confirmation
            ========================== */}

            <Modal

                open={showDeleteModal}

                title="Delete Account"

                onClose={() => setShowDeleteModal(false)}

            >

                <p>

                    This action cannot be undone.

                    Are you sure you want to delete your account?

                </p>

                <div className="modal-buttons">

                    <Button

                        variant="secondary"

                        onClick={() => setShowDeleteModal(false)}

                    >

                        Cancel

                    </Button>

                    <Button

                        variant="danger"

                        onClick={handleDeleteAccount}

                    >

                        Delete

                    </Button>

                </div>

            </Modal>

        </section>

    );

};

export default Account;