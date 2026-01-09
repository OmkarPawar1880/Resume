// src/components/SubmitResumeButton.jsx

import { useState } from "react";
import { useResume } from "../context/useResume";
import { validateResume } from "../utils/validateResume";
import { submitResume } from "../services/resumeApi";

const SubmitResumeButton = () => {
  const { resume, saveResumeToBackend } = useResume();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  /* =========================
     SAVE RESUME (FULL SAVE)
  ========================== */
  const handleSaveResume = async () => {
    setErrors({});
    setSuccess("");

    const validationErrors = validateResume(resume);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      await saveResumeToBackend();
      setSuccess("Resume saved successfully ✅");
    } catch (err) {
      setErrors({
        api: err.message || "Failed to save resume",
      });
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     SUBMIT RESUME (FINAL)
  ========================== */
  const handleSubmitResume = async () => {
    setErrors({});
    setSuccess("");

    const validationErrors = validateResume(resume);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      await submitResume(resume);
      setSuccess("Resume submitted successfully 🎉");
    } catch (err) {
      setErrors({
        api: err.message || "Failed to submit resume",
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

      <div className="submit-actions">
        <button
          className="save-btn"
          onClick={handleSaveResume}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Resume"}
        </button>

        <button
          className="submit-btn"
          onClick={handleSubmitResume}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Resume"}
        </button>
      </div>

      {Object.values(errors).map((msg, i) => (
        <p key={i} className="error-text">
          {msg}
        </p>
      ))}
    </div>
  );
};

export default SubmitResumeButton;
