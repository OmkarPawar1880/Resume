import React, { useEffect, useState } from "react";
import { useResume } from "../context/useResume";

const createEmptyEducation = () => ({
  institution: "",
  degree: "",
  specialization: "",
  gradeType: "CGPA",
  gradeValue: "",
  startYear: "",
  endYear: "",
  city: "",
  state: "",
});

const EducationInfo = () => {
  
  const [errors, setErrors] = useState([]);
  const { resume, replaceSection , savePartialResumeToBackend} = useResume();
  const [isEditing, setIsEditing] = useState(true);


  // 🧠 Local draft (same idea as PersonalInfo)
  const [draft, setDraft] = useState(resume.education);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Sync when resume changes externally
  useEffect(() => {
    setDraft(resume.education);
  }, [resume.education]);

  if (!draft) return null;
  // =========================
// PREVIEW MODE (READ ONLY)
// =========================
if (!isEditing) {
  const saved = resume.education;

  return (
    <section className="education-section">
      <div className="preview-header">
        <h2 className="section-title">Education</h2>

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

      {saved.map((edu, index) => (
        <div className="education-preview-card" key={index}>
          <h3>
            {edu.degree}
            {edu.specialization && ` – ${edu.specialization}`}
          </h3>

          <p>
            <strong>{edu.institution}</strong>
          </p>

          <p>
            {edu.startYear} – {edu.endYear}
          </p>

          <p>
            {edu.city}, {edu.state}
          </p>

          {edu.gradeValue && (
            <p>
              {edu.gradeType}: {edu.gradeValue}
            </p>
          )}
        </div>
      ))}

      <button
  className="add-btn"
  onClick={() => {
    setDraft([...saved, createEmptyEducation()]);
    setIsEditing(true);
  }}
>
  + Add Education
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

  const addEducation = () => {
    setDraft((prev) => [...prev, createEmptyEducation()]);
  };

  const removeEducation = (index) => {
    setDraft((prev) => prev.filter((_, i) => i !== index));
  };

  /* =========================
     VALIDATION
  ========================== */
  

  
const validateEducation = () => {
  const newErrors = draft.map((edu) => {
    const e = {};

    if (!edu.institution.trim()) e.institution = "Institution required";
    if (!edu.degree.trim()) e.degree = "Degree required";
    if (!edu.startYear.trim()) e.startYear = "Start year required";
    if (!edu.endYear.trim()) e.endYear = "End year required";
    if (!edu.city.trim()) e.city = "City required";
    if (!edu.state.trim()) e.state = "State required";

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

    if (!validateEducation()) return;

    setError("");
    setSuccess("");

    

    try {
      setLoading(true);

      // ⏳ simulate backend save
      await new Promise((res) => setTimeout(res, 800));

      // ✅ Commit once
      replaceSection("education", draft);
      await savePartialResumeToBackend({
    education: draft,
    });


      setSuccess("Education saved successfully ✅");
      setIsEditing(false);

    } catch {
      setError("Failed to save education");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="education-section">
      <h2 className="section-title">Education</h2>

      {draft.map((edu, index) => (
        <div className="education-card" key={index}>
          <div className="card-header">
            <button
              className="remove-btn"
              disabled={draft.length === 1}
              onClick={() => removeEducation(index)}
            >
              Remove
            </button>
          </div>

          <div className="grid">
            <input
            placeholder="Institution / University"
            value={edu.institution}
            onChange={(e) => {
            updateField(index, "institution", e.target.value);
            setErrors((prev) => {
             const copy = [...prev];
            copy[index] = { ...copy[index], institution: "" };
            return copy;
            });
             }}
          />

        {errors[index]?.institution && (
        <p className="error-text">
        {errors[index].institution}
        </p>
        )}

           
            <input
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => {
            updateField(index, "degree", e.target.value);
            setErrors((prev) => {
             const copy = [...prev];
            copy[index] = { ...copy[index], degree: "" };
            return copy;
            });
             }}
            />
            {errors[index]?.degree && (
        <p className="error-text">
        {errors[index].degree}
        </p>
        )}

            <input
              placeholder="Specialization"
              value={edu.specialization}
              onChange={(e) => {
              updateField(index, "specialization", e.target.value);
              setErrors((prev) => {
             const copy = [...prev];
              copy[index] = { ...copy[index], specialization: "" };
              return copy;
              });
             }}
            />
            {errors[index]?.specialization && (
            <p className="error-text">
            {errors[index].specialization}
            </p>
             )}

            <select
              value={edu.gradeType}
              onChange={(e) => {
              updateField(index, "gradeType", e.target.value);
              setErrors((prev) => {
             const copy = [...prev];
              copy[index] = { ...copy[index], specialization: "" };
              return copy;
              });
             }}
            >
            {errors[index]?.gradeType && (
  <p className="error-text">{errors[index].gradeType}</p>
)}
              <option value="CGPA">CGPA</option>
              <option value="%">Percentage</option>
            </select>

            <input
              placeholder={
                edu.gradeType === "CGPA"
                  ? "CGPA"
                  : "%"
              }
              value={edu.gradeValue}
             onChange={(e) => {
    updateField(index, "gradeValue", e.target.value);
    setErrors((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], institution: "" };
      return copy;
    });
  }}
            />

            {errors[index]?.gradeValue && (
  <p className="error-text">{errors[index].gradeValue}</p>
)}

            <input
              placeholder="Start Year"
              value={edu.startYear}
              onChange={(e) => {
    + updateField(index, "startYear", e.target.value);
    setErrors((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], institution: "" };
      return copy;
    });
  }}
        />

{errors[index]?.startYear && (
  <p className="error-text">{errors[index].startYear}</p>
)}

            <input
              placeholder="End Year"
              value={edu.endYear}
              onChange={(e) => {
              + updateField(index, "endYear", e.target.value);
              setErrors((prev) => {
              const copy = [...prev];
               copy[index] = { ...copy[index], institution: "" };
              return copy;
            });
           }}
            />

            {errors[index]?.endYear && (
  <p className="error-text">{errors[index].endYear}</p>
)}


            <input
              placeholder="City"
              value={edu.city}
              onChange={(e) => {
              + updateField(index, "city", e.target.value);
              setErrors((prev) => {
              const copy = [...prev];
               copy[index] = { ...copy[index], institution: "" };
              return copy;
            });
           }}
            />

{errors[index]?.city && (
  <p className="error-text">{errors[index].city}</p>
)}

            <input
              placeholder="State"
              value={edu.state}
              onChange={(e) => {
              + updateField(index, "state", e.target.value);
              setErrors((prev) => {
              const copy = [...prev];
               copy[index] = { ...copy[index], institution: "" };
              return copy;
            });
           }}
            />
            {errors[index]?.state && (
  <p className="error-text">{errors[index].state}</p>
)}
          </div>
        </div>
      ))}

      <button
        className="add-btn"
        onClick={addEducation}
      >
        + Add Education
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

export default EducationInfo;
