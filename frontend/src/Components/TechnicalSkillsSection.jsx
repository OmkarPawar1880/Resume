import React, { useEffect, useState } from "react";
import { useResume } from "../context/useResume";

const SKILL_LEVELS = [
  "BEGINNER",
  "INTERMEDIATE",
  "ADVANCED",
  "EXPERT",
];

const TechnicalSkillsSection = () => {
  const { resume, replaceSection ,savePartialResumeToBackend } = useResume();
  const [isEditing, setIsEditing] = useState(true);
  const [errors, setErrors] = useState([]);
  

  // 🧠 local draft
  const [draft, setDraft] = useState(resume.skills);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setDraft(resume.skills);
  }, [resume.skills]);

  if (!draft) return null;
  // =========================
// PREVIEW MODE (READ ONLY)
// =========================
if (!isEditing) {
  const saved = resume.skills;

  return (
    <section className="skills-section">
      <div className="preview-header">
        <h2 className="section-title">Technical Skills</h2>

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

      {saved.map((category, catIndex) => (
        <div key={catIndex} className="skill-category-preview">
          <h3 className="category-title">{category.title}</h3>

          <div className="skills-tags">
            {category.skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill.name}
                <small
                  className={`level ${skill.level.toLowerCase()}`}
                >
                  {skill.level}
                </small>
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}


  /* =========================
     HELPERS
  ========================== */
  const addSkill = (catIndex, skill) => {
    setDraft((prev) => {
      const updated = [...prev];
      updated[catIndex] = {
        ...updated[catIndex],
        skills: [...updated[catIndex].skills, skill],
      };
      return updated;
    });
  };

  const removeSkill = (catIndex, skillIndex) => {
    setDraft((prev) => {
      const updated = [...prev];
      updated[catIndex] = {
        ...updated[catIndex],
        skills: updated[catIndex].skills.filter(
          (_, i) => i !== skillIndex
        ),
      };
      return updated;
    });
  };

  /* =========================
     VALIDATION
  ========================== */
  
const validateSkills = () => {
  const newErrors = draft.map((category) => {
    const e = {};

    // =====================
    // Category title
    // =====================
    if (!category.title?.trim()) {
      e.title = "Skill category title is required";
    } else if (category.title.trim().length < 2) {
      e.title = "Category title must be at least 2 characters";
    }

    // =====================
    // Skills list
    // =====================
    if (!category.skills || category.skills.length === 0) {
      e.skills = "Add at least one skill";
    } else {
      const skillErrors = category.skills.map((skill) => {
        const se = {};

        if (!skill.name?.trim()) {
          se.name = "Skill name is required";
        } else if (skill.name.trim().length < 2) {
          se.name = "Skill name must be at least 2 characters";
        }

        const allowedLevels = [
          "BEGINNER",
          "INTERMEDIATE",
          "ADVANCED",
          "EXPERT",
        ];

        if (!allowedLevels.includes(skill.level?.toUpperCase())) {
          se.level = "Invalid skill level";
        }

        return se;
      });

      if (skillErrors.some((s) => Object.keys(s).length > 0)) {
        e.skillErrors = skillErrors;
      }
    }

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
  if (!validateSkills()) return;

  setError("");
  setSuccess("");

  try {
    setSaving(true);

    await new Promise((res) => setTimeout(res, 800));

    replaceSection("skills", draft);
    await savePartialResumeToBackend({
      skills: draft,
    });

    setSuccess("Skills saved successfully ✅");
    setIsEditing(false);
  } catch {
    setError("Failed to save skills");
  } finally {
    setSaving(false);
  }
};

  return (
    <section className="skills-section">
      <h2 className="section-title">Technical Skills</h2>

      {draft.map((category, catIndex) => (
  <div key={catIndex}>
    <SkillCategory
      category={category}
      onAddSkill={(skill) =>
        addSkill(catIndex, skill)
      }
      onRemoveSkill={(skillIndex) =>
        removeSkill(catIndex, skillIndex)
      }
    />

    {errors[catIndex] && (
      <p className="error-text">
        {errors[catIndex]}
      </p>
    )}
  </div>
))}


      

      {/* SAVE */}
      <div className="save-section">
        {error && <p className="error-text">{error}</p>}
        {success && (
          <p className="success-text">{success}</p>
        )}

        <button
          className="save-btn"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save "}
        </button>
      </div>
    </section>
  );
};

/* =========================
   SKILL CATEGORY
========================= */
const SkillCategory = ({ category, onAddSkill, onRemoveSkill }) => {
  const [skillName, setSkillName] = useState("");
  const [level, setLevel] = useState("INTERMEDIATE");

  const submitSkill = (e) => {
    e.preventDefault();
    if (!skillName.trim()) return;

    onAddSkill({
      name: skillName.trim(),
      level,
    });

    setSkillName("");
    setLevel("INTERMEDIATE");
  };

  return (
    <div className="skill-category">
      <h3 className="category-title">{category.title}</h3>

      <form className="skill-input-row" onSubmit={submitSkill}>
        <input
          placeholder="Add skill"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)
            
            
          }
          
        />

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          {SKILL_LEVELS.map((lvl) => (
            <option key={lvl}>{lvl}</option>
          ))}
        </select>

        <button type="submit">Add</button>
      </form>

      <div className="skills-tags">
        {category.skills.map((skill, index) => (
          <span key={index} className="skill-tag">
            {skill.name}
            <small className={`level ${skill.level.toLowerCase()}`}>
              {skill.level}
            </small>
            <button
              className="remove-btn"
              onClick={() => onRemoveSkill(index)}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TechnicalSkillsSection;
