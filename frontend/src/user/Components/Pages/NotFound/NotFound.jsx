import { Link } from "react-router-dom";

import Button from "/src/user/Components/common/Button";

import "./NotFound.css";

// ==========================================================
// Not Found Page
// ==========================================================
const NotFound = () => {

    return (

        <section className="not-found-page">

            <div className="not-found-container">

                <h1>

                    404

                </h1>

                <h2>

                    Page Not Found

                </h2>

                <p>

                    Sorry, the page you are looking for does not exist
                    or has been moved.

                </p>

                <div className="not-found-buttons">

                    <Link to="/">

                        <Button>

                            Go to Home

                        </Button>

                    </Link>

                    <Link to="/dashboard">

                        <Button variant="secondary">

                            Dashboard

                        </Button>

                    </Link>

                </div>

            </div>

        </section>

    );

};

export default NotFound;