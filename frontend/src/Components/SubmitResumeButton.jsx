import { useState } from "react";
import { generateResume } from "../services/resumeApi";
import { useResume } from "../context/useResume";
import { validateResume } from "../utils/validateResume";

const ResumeActions = ({ resumeData }) => {
  const { resume, saveResumeToBackend } = useResume();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState("");

  /* =========================
     DOWNLOAD RESUME (PDF)
  ========================== */
  const handleDownload = async () => {
    setError({});
    setSuccess("");

    try {
      setLoading(true);
      const res = await generateResume(resumeData || resume);

      if (!res || !res.downloadUrl) {
        throw new Error("Invalid response from server");
      }

      window.open(`http://localhost:8000${res.downloadUrl}`, "_blank");
    } catch (err) {
      console.error(err.message);
      setError({ api: "Failed to generate resume. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     SAVE RESUME (DRAFT)
  ========================== */
  
  /* =========================
     SUBMIT RESUME (FINAL)
  ========================== */
  const handleSubmitResume = async () => {
    setError({});
    setSuccess("");

    const validationErrors = validateResume(resume);
    if (Object.keys(validationErrors).length) {
      setError(validationErrors);
      return;
    }

    try {
      setLoading(true);
      await saveResumeToBackend();
      setSuccess("Resume submitted successfully 🎉");
    } catch (err) {
      setError({
        api: err.message || "Failed to submit resume",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submit-section">
      {/* API / validation errors */}
      {error.api && <p className="error-text">{error.api}</p>}

      {/* Success message */}
      {success && <p className="success-text">{success}</p>}

      <div className="submit-actions">
        
        <button
          className="submit-btn"
          onClick={handleSubmitResume}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Resume"}
        </button>

        <button
          className="download-btn"
          onClick={handleDownload}
          disabled={loading}
        >
          {loading ? "Generating..." : "Download Resume"}
        </button>
      </div>

      {/* Field-level errors */}
      {Object.values(error).map((msg, i) => (
        <p key={i} className="error-text">
          {msg}
        </p>
      ))}
    </div>
  );
};

export default ResumeActions;
