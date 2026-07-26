import { Outlet } from "react-router-dom";

import PublicNavbar from "../components/navbar/PublicNavbar";
import Footer from "../components/footer/Footer";

// ==========================================================
// Public Layout
// Used for all public pages
// ==========================================================
const PublicLayout = () => {

    return (

        <>

            {/* ==========================
                Navigation Bar
            ========================== */}
            <PublicNavbar />

            {/* ==========================
                Page Content
            ========================== */}
            <main>

                <Outlet />

            </main>

            {/* ==========================
                Footer
            ========================== */}
            <Footer />

        </>

    );

};

export default PublicLayout;