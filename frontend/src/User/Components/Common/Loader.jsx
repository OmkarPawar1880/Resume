import "./common.css";

// ==========================================================
// Reusable Loader Component
// ==========================================================
const Loader = ({
    text = "Loading...",
    fullScreen = false,
    size = "medium"
}) => {

    return (

        <div
            className={
                fullScreen
                    ? "loader-container fullscreen"
                    : "loader-container"
            }
        >

            <div
                className={`spinner spinner-${size}`}
            />

            <p className="loader-text">
                {text}
            </p>

        </div>

    );

};

export default Loader;
