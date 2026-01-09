import React, { useEffect, useState } from "react";
import { useResume } from "../context/useResume";

const SKILL_LEVELS = ["Basic", "Intermediate", "Advanced"];

const TechnicalSkillsSection = () => {
  const { resume, replaceSection } = useResume();
  const [isEditing, setIsEditing] = useState(true);


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
  const validate = () => {
    if (draft.some((cat) => cat.skills.length === 0)) {
      return "Each skill category must have at least one skill";
    }
    return null;
  };

  /* =========================
     SAVE HANDLER
  ========================== */
  const handleSave = async () => {
    setError("");
    setSuccess("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSaving(true);
      await new Promise((res) => setTimeout(res, 800));

      replaceSection("skills", draft);
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
        <SkillCategory
          key={catIndex}
          category={category}
          onAddSkill={(skill) =>
            addSkill(catIndex, skill)
          }
          onRemoveSkill={(skillIndex) =>
            removeSkill(catIndex, skillIndex)
          }
        />
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
  const [level, setLevel] = useState("Intermediate");

  const submitSkill = (e) => {
    e.preventDefault();
    if (!skillName.trim()) return;

    onAddSkill({
      name: skillName.trim(),
      level,
    });

    setSkillName("");
    setLevel("Intermediate");
  };

  return (
    <div className="skill-category">
      <h3 className="category-title">{category.title}</h3>

      <form className="skill-input-row" onSubmit={submitSkill}>
        <input
          placeholder="Add skill"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
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
