import { Link } from "react-router-dom";

import "./Footer.css";

// ==========================================================
// Footer
// ==========================================================
const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (

        <footer className="footer">

            <div className="footer-container">

                {/* ==========================
                    Brand
                ========================== */}

                <div className="footer-brand">

                    <h2>ResumeBuilder</h2>

                    <p>
                        Build professional ATS-friendly resumes
                        with ease.
                    </p>

                </div>

                {/* ==========================
                    Quick Links
                ========================== */}

                <div className="footer-links">

                    <h3>Quick Links</h3>

                    <Link to="/">Home</Link>

                    <Link to="/login">Login</Link>

                    <Link to="/register">Register</Link>

                </div>

                {/* ==========================
                    Resources
                ========================== */}

                <div className="footer-links">

                    <h3>Resources</h3>

                    <a href="#features">Features</a>

                    <a href="#templates">Templates</a>

                    <a href="#contact">Contact</a>

                </div>

                {/* ==========================
                    Contact
                ========================== */}

                <div className="footer-links">

                    <h3>Contact</h3>

                    <p>support@resumebuilder.com</p>

                    <p>+91 9876543210</p>

                    <p>India</p>

                </div>

            </div>

            {/* ==========================
                Copyright
            ========================== */}

            <div className="footer-bottom">

                © {currentYear} ResumeBuilder.
                All Rights Reserved.

            </div>

        </footer>

    );

};

export default Footer;
