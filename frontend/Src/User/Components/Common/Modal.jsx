import "./common.css";

// ==========================================================
// Reusable Modal Component
// ==========================================================
const Modal = ({
    isOpen,
    title = "Modal",
    children,
    onClose,
    onConfirm,
    confirmText = "Confirm",
    cancelText = "Cancel",
    showFooter = true
}) => {

    if (!isOpen) return null;

    return (

        <div
            className="modal-overlay"
            onClick={onClose}
        >

            <div
                className="modal-container"
                onClick={(e) => e.stopPropagation()}
            >

                {/* ==========================
                    Header
                ========================== */}

                <div className="modal-header">

                    <h2>{title}</h2>

                    <button
                        className="modal-close"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>

                {/* ==========================
                    Body
                ========================== */}

                <div className="modal-body">

                    {children}

                </div>

                {/* ==========================
                    Footer
                ========================== */}

                {showFooter && (

                    <div className="modal-footer">

                        <button
                            className="btn-cancel"
                            onClick={onClose}
                        >
                            {cancelText}
                        </button>

                        <button
                            className="btn-confirm"
                            onClick={onConfirm}
                        >
                            {confirmText}
                        </button>

                    </div>

                )}

            </div>

        </div>

    );

};

export default Modal;
