import React from "react";
import { useResume } from "../context/useResume";

const createEmptyCertification = () => ({
  name: "",
  organization: "",
  platform: "",
  year: "",
  url: "",
  verified: false,
});

const CertificationsSection = () => {
  const {
    resume,
    updateArrayField,
    addArrayItem,
    removeArrayItem,
    savePartialResumeToBackend,
  } = useResume();

  const [isEditing, setIsEditing] = React.useState(true);
  const [errors, setErrors] = React.useState([]);


  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [dirty, setDirty] = React.useState(false);

  if (!resume?.certifications) return null;

// =========================
// PREVIEW MODE (READ ONLY)
// =========================
if (!isEditing) {
  const saved = resume.certifications;

  return (
    <section className="certifications">
      <div className="preview-header">
        <h2 className="section-title">Certifications</h2>

        <button
          type="button"
          className="edit-btn"
          onClick={() => setIsEditing(true)}
        >
          Edit ✏️
        </button>
      </div>

      {saved.map((cert, index) => (
        <div key={index} className="cert-preview-card">
          <h3>{cert.name}</h3>

          <p>
            {cert.organization}
            {cert.platform && ` • ${cert.platform}`}
          </p>

          {cert.year && <p>Year: {cert.year}</p>}

          {cert.verified && (
            <span className="verified-badge">
              ✔ Verified
            </span>
          )}

          {cert.url && (
            <p>
              <a
                href={cert.url}
                target="_blank"
                rel="noreferrer"
              >
                View Certificate
              </a>
            </p>
          )}
        </div>
      ))}

      {/* 👇 ADD CERTIFICATION BUTTON IN PREVIEW */}
      <button
        className="add-btn"
        onClick={() => {
          addArrayItem(
            "certifications",
            createEmptyCertification()
          );
          setDirty(true);
          setIsEditing(true);
        }}
      >
        + Add Certification
      </button>
    </section>
  );
}

const validateCertifications = () => {
  const newErrors = resume.certifications.map((cert) => {
    const e = {};

    if (!cert.name.trim()) e.name = "Certification name required";
    if (!cert.organization.trim())
      e.organization = "Organization required";
    if (!cert.year.trim())
      e.year = "Year required";

    return e;
  });

  setErrors(newErrors);
  return newErrors.every(
    (row) => Object.keys(row).length === 0
  );
};



  /* =========================
     SAVE HANDLER
  ========================== */
  const handleSaveCertifications = async () => {

    if (!validateCertifications()) return;


    setError("");
    setSuccess("");

    // 🔍 Basic validation
    if (
      resume.certifications.some(
        (cert) => !cert.name.trim()
      )
    ) {
      setError("Certification name is required");
      return;
    }

    try {
      setSaving(true);

      // ⏳ simulate backend save
      await new Promise((res) => setTimeout(res, 800));

await savePartialResumeToBackend({
  certifications: resume.certifications,
});




      setSuccess("Certifications saved successfully ✅");
      setDirty(false);
      setIsEditing(false);

    } catch {
      setError("Failed to save certifications");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="certifications">
      <h2 className="section-title">Certifications</h2>

      {resume.certifications.map((cert, index) => (
        <div key={index} className="cert-card">
          <div className="cert-grid">
            {/* Certification Name */}
            <input
            placeholder="Certificate Name"
  value={cert.name}
  onChange={(e) => {
    updateArrayField(
      "certifications",
      index,
      "name",
      e.target.value
    );
    setErrors((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], name: "" };
      return copy;
    });
    setDirty(true);
  }}
/>

{errors[index]?.name && (
  <p className="error-text">
    {errors[index].name}
  </p>
)}


            {/* Organization */}
            <input
              placeholder="Organization"
  value={cert.organization}
  onChange={(e) => {
    updateArrayField(
      "certifications",
      index,
      "organization",
      e.target.value
    );
    setErrors((prev) => {
      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        organization: "",
      };
      return copy;
    });
    setDirty(true);
  }}
/>

{errors[index]?.organization && (
  <p className="error-text">
    {errors[index].organization}
  </p>
)}


            {/* Platform */}
            <input
              placeholder="Platform (Coursera, Udemy, etc.)"
              value={cert.platform}
              onChange={(e) => {
                updateArrayField(
                  "certifications",
                  index,
                  "platform",
                  e.target.value
                );
                setDirty(true);
              }}
            />

            {/* Year */}
            <input
            placeholder="Year Issued"
  value={cert.year}
  onChange={(e) => {
    updateArrayField(
      "certifications",
      index,
      "year",
      e.target.value
    );
    setErrors((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], year: "" };
      return copy;
    });
    setDirty(true);
  }}
/>

{errors[index]?.year && (
  <p className="error-text">
    {errors[index].year}
  </p>
)}


            {/* URL */}
            <input
              type="url"
              placeholder="Certificate URL (optional)"
              value={cert.url}
              onChange={(e) => {
                updateArrayField(
                  "certifications",
                  index,
                  "url",
                  e.target.value
                );
                setDirty(true);
              }}
            />
          </div>

          <div className="cert-actions">
            {/* Verified */}
            <label className="verified">
              <input
                type="checkbox"
                checked={cert.verified}
                onChange={(e) => {
                  updateArrayField(
                    "certifications",
                    index,
                    "verified",
                    e.target.checked
                  );
                  setDirty(true);
                }}
              />
              Verified
            </label>

            {/* Remove */}
            {resume.certifications.length > 1 && (
              <button
                className="remove-btn"
                onClick={() => {
                  removeArrayItem(
                    "certifications",
                    index
                  );
                  setErrors((prev) =>
  prev.filter((_, i) => i !== index)
);
                  setDirty(true);
                }}
              >
                Remove
              </button>
            )}
          </div>
        </div>
      ))}

      {/* Add Certification */}
      <button
        className="add-btn"
        onClick={() => {
          addArrayItem(
            "certifications",
            createEmptyCertification()
          );
          setErrors((prev) => [...prev, {}]);
          setDirty(true);
        }}
      >
        + Add Certification
      </button>

      {/* Save Changes */}
      {dirty && (
        <div className="save-section">
          {error && (
            <p className="error-text">{error}</p>
          )}
          {success && (
            <p className="success-text">{success}</p>
          )}

          <button
            className="save-btn"
            onClick={handleSaveCertifications}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save "}
          </button>
        </div>
      )}
    </section>
  );
};

export default CertificationsSection;
