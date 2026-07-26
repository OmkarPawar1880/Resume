import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "/src/user/hooks/useAuth";

const ProfileMenu = () => {

    const {  logout } = useAuth();

    const [open, setOpen] = useState(false);

    const menuRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setOpen(false);
            }

        };

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

    }, []);

    const handleLogout = () => {
    logout();

    navigate("/", {
        replace: true,
    });
};

    

    return (

        <div
            className="profile-menu"
            ref={menuRef}
        >

            <button
                className="profile-btn"
                onClick={() => setOpen(!open)}
            >
                👤
            </button>

            {
                open && (

                    <div className="dropdown">

                        <Link
                            to="/profile"
                            onClick={() => setOpen(false)}
                        >
                            Profile
                        </Link>

                        <Link
                            to="/settings"
                            onClick={() => setOpen(false)}
                        >
                            Settings
                        </Link>

                        <button
                            className="logout-btn"
                            onClick={handleLogout}
                        >
                            Sign Out
                        </button>

                    </div>

                )
            }

        </div>

    );

};

export default ProfileMenu;