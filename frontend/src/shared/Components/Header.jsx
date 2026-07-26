import { Link } from "react-router-dom";
import "./Header.css";
import ProfileMenu from "./ProfileMenu";

const Header = () => {
    return (
        <header className="app-header">

            <div className="logo">
                <Link to="/dashboard">
                    CreateResume
                </Link>
            </div>

            <nav className="header-nav">

                <Link to="/dashboard">
                    Dashboard
                </Link>

                <Link to="/resume-builder">
                    Resume Builder
                </Link>

            </nav>

            <ProfileMenu />

        </header>
    );
};

export default Header;