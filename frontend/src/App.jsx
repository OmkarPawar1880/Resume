import "./App.css";

import AppRoutes from "/src/User/Routes/AppRoutes";
import { Analytics } from '@vercel/analytics/react';

const App = () => {

    return (
        <>
            <AppRoutes />
            <Analytics />
        </>
    );

};

export default App;