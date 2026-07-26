import "./common.css";

// ==========================================================
// Reusable Alert Component
// ==========================================================
const Alert = ({
    type = "info",
    title,
    message,
    onClose
}) => {

    return (

        <div className={`alert alert-${type}`}>

            <div className="alert-content">

                {title && (
                    <h4 className="alert-title">
                        {title}
                    </h4>
                )}

                {message && (
                    <p className="alert-message">
                        {message}
                    </p>
                )}

            </div>

            {onClose && (
                <button
                    className="alert-close"
                    onClick={onClose}
                >
                    ×
                </button>
            )}

        </div>

    );

};

export default Alert;