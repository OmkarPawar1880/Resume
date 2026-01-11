import { useState } from "react";
import { generateResume } from "../services/resumeApi";


const DownloadButton = ({ resumeData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownload = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await generateResume(resumeData);

      if (!res || !res.downloadUrl) {
        throw new Error("Invalid response from server");
      }

      window.open(`http://localhost:8000${res.downloadUrl}`, "_blank");
    } catch (err) {
      console.error(err);
      setError("Failed to generate resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button className="download-btn" onClick={handleDownload} disabled={loading}>
        {loading ? "Generating..." : "Download Resume"}
      </button>
      {error && <p style={{ color: "red", marginTop: "8px" }}>{error}</p>}
    </div>
  );
};

export default DownloadButton;
