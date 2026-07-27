import "./common.css";

// ==========================================================
// Reusable Button Component
// ==========================================================
const Button = ({
    children,
    type = "button",
    variant = "primary",
    size = "medium",
    disabled = false,
    onClick,
    className = "",
}) => {

    return (

        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`btn btn-${variant} btn-${size} ${className}`}
        >
            {children}
        </button>

    );

};

export default Button;
