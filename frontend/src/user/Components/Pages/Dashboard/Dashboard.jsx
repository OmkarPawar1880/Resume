import { Link } from "react-router-dom";

import Button from "/src/user/Components/common/Button";
import Card from "/src/user/Components/common/Card";

import useAuth from "/src/user/hooks/useAuth";
import Header from "../../../../shared/Components/Header";

import "./Dashboard.css";

// ==========================================================
// Dashboard
// ==========================================================
const Dashboard = () => {

    const { user } = useAuth();

    return (
<>
 <Header />
        <section className="dashboard">

            {/* ==========================
                Welcome Section
            ========================== */}

            <div className="dashboard-header">

                <div>

                    <h1>

                        Welcome,

                        {" "}

                        {user?.first_name || "User"}

                        👋

                    </h1>

                    <p>

                        Manage your resumes, templates,
                        and profile from one place.

                    </p>

                </div>

                <Link to="/resume-builder">
                    <Button size="large">
                    + Create Resume
                </Button>
            </Link>

            </div>

            {/* ==========================
                Statistics
            ========================== */}

            <div className="dashboard-stats">

                <Card
                    title="0"
                    subtitle="Total Resumes"
                />

                <Card
                    title="0"
                    subtitle="Downloaded"
                />

                <Card
                    title="3"
                    subtitle="Templates"
                />

                <Card
                    title="Free"
                    subtitle="Current Plan"
                />

            </div>

            {/* ==========================
                Recent Resumes
            ========================== */}

            <div className="dashboard-section">

                <h2>

                    Recent Resumes

                </h2>

                <Card>

                    <p>

                        You haven't created any resumes yet.

                    </p>

                    <Link to="/resume-builder">
                        <Button>
                            Create Your First Resume
                        </Button>
                    </Link>
                    

                </Card>

            </div>

            {/* ==========================
                Quick Actions
            ========================== */}

            <div className="dashboard-section">

                <h2>

                    Quick Actions

                </h2>

                <div className="quick-actions">

                    <Link to="/resume-builder">
                        <Button>
                            Resume Builder
                        </Button>
                    </Link>

                    <Link to="/profile">

                        <Button variant="secondary">

                            Edit Profile

                        </Button>

                    </Link>

                    <Link to="/settings">

                        <Button variant="secondary">

                            Settings

                        </Button>

                    </Link>

                </div>

            </div>

        </section>

        </>

    );

};

export default Dashboard;