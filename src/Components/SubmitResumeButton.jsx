// src/components/SubmitResumeButton.jsx

import { useState } from "react";
import { useResume } from "../context/useResume";
import { validateResume } from "../utils/validateResume";
import { submitResume } from "../services/resumeApi";

const SubmitResumeButton = () => {
  const { resume } = useResume();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    setErrors({});
    setSuccess("");

    /* 1️⃣ Validate */
    const validationErrors =
      validateResume(resume);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    /* 2️⃣ Submit */
    try {
      setLoading(true);
      await submitResume(resume);
      setSuccess(
        "Resume submitted successfully 🎉"
      );
    } catch (err) {
      setErrors({
        api:
          err.message ||
          "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submit-section">
      {errors.api && (
        <p className="error-text">{errors.api}</p>
      )}

      {success && (
        <p className="success-text">{success}</p>
      )}

      <button
        className="submit-btn"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading
          ? "Submitting..."
          : "Submit Resume"}
      </button>

      {/* Optional error preview */}
      {Object.values(errors).map(
        (msg, i) => (
          <p key={i} className="error-text">
            {msg}
          </p>
        )
      )}
    </div>
  );
};

export default SubmitResumeButton;
