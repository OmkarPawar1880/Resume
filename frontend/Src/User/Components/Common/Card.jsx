import "./common.css";

// ==========================================================
// Reusable Card Component
// ==========================================================
const Card = ({
    title,
    subtitle,
    children,
    footer,
    className = "",
    onClick
}) => {

    return (

        <div
            className={`card ${className}`}
            onClick={onClick}
        >

            {/* ==========================
                Header
            ========================== */}

            {(title || subtitle) && (

                <div className="card-header">

                    {title && (
                        <h3 className="card-title">
                            {title}
                        </h3>
                    )}

                    {subtitle && (
                        <p className="card-subtitle">
                            {subtitle}
                        </p>
                    )}

                </div>

            )}

            {/* ==========================
                Body
            ========================== */}

            <div className="card-body">

                {children}

            </div>

            {/* ==========================
                Footer
            ========================== */}

            {footer && (

                <div className="card-footer">

                    {footer}

                </div>

            )}

        </div>

    );

};

export default Card;
