import React, { useEffect, useState } from "react";
import { useResume } from "../context/useResume";

const createEmptyExperience = () => ({
  company: "",
  role: "",
  type: "Intern",
  location: "",
  startDate: "",
  endDate: "",
  responsibilities: "",
});

const ExperienceSection = () => {
  const { resume, replaceSection, savePartialResumeToBackend } = useResume();
  const [isEditing, setIsEditing] = useState(true);
const [errors, setErrors] = useState([]);


  // 🧠 Local draft
  const [draft, setDraft] = useState(resume.experience);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Sync if resume updates externally
  useEffect(() => {
    setDraft(resume.experience);
  }, [resume.experience]);

  if (!draft) return null;
  // =========================
// PREVIEW MODE (READ ONLY)
// =========================
if (!isEditing) {
  const saved = resume.experience;

  return (
    <section className="experience-section">
      <div className="preview-header">
        <h2 className="section-title">Experience</h2>

        <button
          type="button"
          className="edit-btn"
          onClick={() => {
            setDraft(saved);     // sync saved → draft
            setIsEditing(true); // back to edit mode
          }}
        >
          Edit ✏️
        </button>
      </div>

      {saved.map((exp, index) => (
        <div className="experience-preview-card" key={index}>
          <h3>
            {exp.role} – {exp.company}
          </h3>

          <p>
            {exp.type} | {exp.location}
          </p>

          <p>
            {exp.startDate} – {exp.endDate || "Present"}
          </p>

          {exp.responsibilities && (
            <ul>
              {exp.responsibilities
                .split("\n")
                .filter(Boolean)
                .map((line, i) => (
                  <li key={i}>{line.replace("• ", "")}</li>
                ))}
            </ul>
          )}
        </div>
      ))}

      {/* 👇 ADD EXPERIENCE BUTTON IN PREVIEW */}
      <button
        className="add-btn"
        onClick={() => {
          setDraft([
            ...saved,
            createEmptyExperience(),
          ]);
          setIsEditing(true);
        }}
      >
        + Add Experience
      </button>
    </section>
  );
}


  /* =========================
     LOCAL UPDATE HELPERS
  ========================== */
  const updateField = (index, field, value) => {
    setDraft((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return updated;
    });
  };

  const addExperience = () => {
    setDraft((prev) => [
      ...prev,
      createEmptyExperience(),
    ]);
  };

  const removeExperience = (index) => {
    setDraft((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const formatBullets = (text) =>
    text
      .split("\n")
      .map((line) =>
        line.startsWith("•")
          ? line
          : line.trim()
          ? `• ${line}`
          : ""
      )
      .join("\n");

  /* =========================
     VALIDATION
  ========================== */
  const validate = () => {
    if (
      draft.some(
        (exp) => !exp.company.trim()
      )
    ) {
      return "Company name is required";
    }
    return null;
  };
  const validateExperience = () => {
  const newErrors = draft.map((exp) => {
    const e = {};

    if (!exp.company.trim()) e.company = "Company required";
    if (!exp.role.trim()) e.role = "Role required";
    if (!exp.startDate) e.startDate = "Start date required";

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
  const handleSave = async () => {
    if (!validateExperience()) return;

    setError("");
    setSuccess("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      // ⏳ simulate backend save
      await new Promise((res) => setTimeout(res, 800));

      // ✅ Commit once
      replaceSection("experience", draft);
      await savePartialResumeToBackend({
      experience: draft,
});


      setSuccess("Experience saved successfully ✅");
      setIsEditing(false);

    } catch {
      setError("Failed to save experience");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="experience-section">
      <h2 className="section-title">Experience</h2>

      {draft.map((exp, index) => (
        <div className="experience-card" key={index}>
          <div className="grid">
            <input
              placeholder="Company Name"
              value={exp.company}
              onChange={(e) => {
              updateField(index, "company", e.target.value);
              
              setErrors((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], company: "" };
      return copy;
    });
  }}
            />

            {errors[index]?.company && (
  <p className="error-text">{errors[index].company}</p>
)}

            <input
              placeholder="Role / Designation"
              value={exp.role}
              onChange={(e) => {
    updateField(index, "role", e.target.value);
    setErrors((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], role: "" };
      return copy;
    });
  }}
            />

            {errors[index]?.role && (
  <p className="error-text">{errors[index].role}</p>
)}

            <select
              value={exp.type}
              onChange={(e) => {
    updateField(index, "type", e.target.value);
    setErrors((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], startDate: "" };
      return copy;
    });
  }}
            >
              <option>Intern</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Remote</option>
              <option>Contract</option>
            </select>

            {errors[index]?.type && (
  <p className="error-text">{errors[index].type}</p>
)}


            <input
              placeholder="Location"
              value={exp.location}
              onChange={(e) => {
    updateField(index, "location", e.target.value);
    setErrors((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], location: "" };
      return copy;
    });
  }}
            />

            <input
              type="month"
              value={exp.startDate}
              onChange={(e) => {
    updateField(index, "startDate", e.target.value);
    setErrors((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], startDate: "" };
      return copy;
    });
  }}
            />
            {errors[index]?.startDate && (
  <p className="error-text">{errors[index].startDate}</p>
)}


            <input
              type="month"
              value={exp.endDate}
              onChange={(e) => {
    updateField(index, "endDate", e.target.value);
    setErrors((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], endDate: "" };
      return copy;
    });
  }}
            />
          </div>

          <textarea
            rows="5"
            placeholder={`Responsibilities / Achievements
• Use action verbs
• Focus on impact`}
            value={exp.responsibilities}
            onChange={(e) => {
    updateField(index, "responsibilities", e.target.value);
    formatBullets(e.target.value);
    setErrors((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], responsibilities: "" };
      return copy;
    });
  }}
          />
          {errors[index]?.responsibilities && (
  <p className="error-text">{errors[index].responsibilities}</p>
)}


          {draft.length > 1 && (
            <button
              className="remove-btn"
              onClick={() =>
                removeExperience(index)
              }
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <button
        className="add-btn"
        onClick={addExperience}
      >
        + Add Experience
      </button>

      {/* SAVE SECTION */}
      <div className="save-section">
        {error && <p className="error-text">{error}</p>}
        {success && (
          <p className="success-text">{success}</p>
        )}

        <button
          className="save-btn"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save "}
        </button>
      </div>
    </section>
  );
};

export default ExperienceSection;
