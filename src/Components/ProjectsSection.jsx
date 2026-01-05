import React, { useEffect, useState } from "react";
import { useResume } from "../context/useResume";

const createEmptyProject = () => ({
  title: "",
  technologies: [],
  projectDate: "",
  description: "",
  github: "",
  live: "",
  featured: false,
});

const ProjectsSection = () => {
  const { resume, replaceSection } = useResume();
  const [isEditing, setIsEditing] = useState(true);


  // 🧠 local draft
  const [draft, setDraft] = useState(resume.projects);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setDraft(resume.projects);
  }, [resume.projects]);

  if (!draft) return null;
  // =========================
// PREVIEW MODE (READ ONLY)
// =========================
if (!isEditing) {
  const saved = resume.projects;

  return (
    <section className="projects-section">
      <div className="preview-header">
        <h2 className="section-title">Projects</h2>

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

      {saved.map((proj, index) => (
        <div
          key={index}
          className={`project-preview-card ${
            proj.featured ? "featured" : ""
          }`}
        >
          <h3>{proj.title}</h3>

          {proj.projectDate && (
            <p>{proj.projectDate}</p>
          )}

          {proj.description && (
            <ul>
              {proj.description
                .split("\n")
                .filter(Boolean)
                .map((line, i) => (
                  <li key={i}>
                    {line.replace("• ", "")}
                  </li>
                ))}
            </ul>
          )}

          {proj.github && (
            <p>
              <strong>GitHub:</strong>{" "}
              {proj.github}
            </p>
          )}

          {proj.live && (
            <p>
              <strong>Live:</strong>{" "}
              {proj.live}
            </p>
          )}
        </div>
      ))}

      {/* 👇 ADD PROJECT BUTTON IN PREVIEW */}
      <button
        className="add-btn"
        onClick={() => {
          setDraft([
            ...saved,
            createEmptyProject(),
          ]);
          setIsEditing(true);
        }}
      >
        + Add Project
      </button>
    </section>
  );
}


  /* =========================
     HELPERS
  ========================== */
  const updateField = (index, field, value) => {
    setDraft((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addProject = () =>
    setDraft((prev) => [...prev, createEmptyProject()]);

  const removeProject = (index) =>
    setDraft((prev) => prev.filter((_, i) => i !== index));

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
    if (draft.some((p) => !p.title.trim())) {
      return "Project title is required";
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
      setLoading(true);
      await new Promise((res) => setTimeout(res, 800));

      replaceSection("projects", draft);
      setSuccess("Projects saved successfully ✅");
      setIsEditing(false);

    } catch {
      setError("Failed to save projects");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="projects-section">
      <h2 className="section-title">Projects</h2>

      {draft.map((proj, index) => (
        <div
          key={index}
          className={`project-card ${
            proj.featured ? "featured" : ""
          }`}
        >
          <input
            placeholder="Project Title"
            value={proj.title}
            onChange={(e) =>
              updateField(index, "title", e.target.value)
            }
          />

          <input
            type="month"
            value={proj.projectDate}
            onChange={(e) =>
              updateField(
                index,
                "projectDate",
                e.target.value
              )
            }
          />

          <input
            placeholder="GitHub Repository"
            value={proj.github}
            onChange={(e) =>
              updateField(index, "github", e.target.value)
            }
          />

          <textarea
            rows="4"
            placeholder={`Description
            • What the project does
            • Key features`}
            value={proj.description}
            onChange={(e) =>
              updateField(
                index,
                "description",
                formatBullets(e.target.value)
              )
            }
          />

          {draft.length > 1 && (
            <button
              className="remove-btn"
              onClick={() => removeProject(index)}
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <button className="add-btn" onClick={addProject}>
        + Add Project
      </button>

      {/* SAVE */}
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

export default ProjectsSection;
