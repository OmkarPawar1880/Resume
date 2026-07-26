import "./common.css";

// ==========================================================
// Reusable Input Component
// ==========================================================
const Input = ({
    label,
    type = "text",
    name,
    value,
    placeholder = "",
    onChange,
    onBlur,
    error = "",
    required = false,
    disabled = false,
    autoComplete = "off",
    className = "",
}) => {

    return (

        <div className="input-group">

            {/* ==========================
                Label
            ========================== */}

            {label && (
                <label
                    htmlFor={name}
                    className="input-label"
                >
                    {label}

                    {required && (
                        <span className="required">
                            *
                        </span>
                    )}
                </label>
            )}

            {/* ==========================
                Input
            ========================== */}

            <input
                id={name}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
                autoComplete={autoComplete}
                className={`input-field ${
                    error ? "input-error" : ""
                } ${className}`}
            />

            {/* ==========================
                Validation Error
            ========================== */}

            {error && (

                <p className="error-text">

                    {error}

                </p>

            )}

        </div>

    );

};

export default Input;