import { Outlet } from "react-router-dom";

import DashboardNavbar from "../components/navbar/DashboardNavbar";
import Footer from "../components/footer/Footer";

// ==========================================================
// Dashboard Layout
// Used for all authenticated pages
// ==========================================================
const DashboardLayout = () => {

    return (

        <div className="dashboard-layout">

            {/* ==========================
                Dashboard Navbar
            ========================== */}
            <DashboardNavbar />

            {/* ==========================
                Main Content
            ========================== */}
            <main className="dashboard-content">

                <Outlet />

            </main>

            {/* ==========================
                Footer (Optional)
            ========================== */}
            <Footer />

        </div>

    );

};

export default DashboardLayout;