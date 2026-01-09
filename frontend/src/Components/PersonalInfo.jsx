import React, { useEffect, useState } from "react";
import { useResume , } from "../context/useResume";



const PersonalInfoForm = () => {
  const { resume, replaceSection , savePartialResumeToBackend } = useResume();
  const [errors, setErrors] = useState({});


  // 🧠 Local draft state
  const [isEditing, setIsEditing] = useState(true);

  const [draft, setDraft] = useState(resume.personal);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Sync draft when resume changes externally
  useEffect(() => {
    setDraft(resume.personal);
  }, [resume.personal]);

  if (!draft) return null;
// =========================
// PREVIEW MODE (READ ONLY)
// =========================
if (!isEditing) {
  const saved = resume.personal;

  return (
    <section className="header-form">
      <div className="preview-header">
        <h2 className="section-title">Personal Information</h2>

        <button
          type="button"
          className="edit-btn"
          onClick={() => {
            setDraft(saved);     // sync saved → draft
            setIsEditing(true); // switch back to edit
          }}
        >
          Edit ✏️
        </button>
      </div>

      <div className="preview-body">
        <p><strong>Name:</strong> {saved.fullName}</p>
        <p>
          <strong>Location:</strong>{" "}
          {saved.location.city}, {saved.location.state} –{" "}
          {saved.location.pincode}
        </p>
        <p><strong>Phone:</strong> {saved.contact.phone}</p>
        <p><strong>Email:</strong> {saved.contact.email}</p>

        {saved.links.linkedin && (
          <p><strong>LinkedIn:</strong> {saved.links.linkedin}</p>
        )}
        {saved.links.github && (
          <p><strong>GitHub:</strong> {saved.links.github}</p>
        )}
        {saved.links.portfolio && (
          <p><strong>Portfolio:</strong> {saved.links.portfolio}</p>
        )}
      </div>
    </section>
  );
}

  /* =========================
     LOCAL UPDATE HELPERS
  ========================== */
  const updateField = (field, value) => {
    setDraft((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateNestedField = (section, field, value) => {
    setDraft((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const validateForm = () => {
  const newErrors = {};

  if (!draft.fullName?.trim()) {
    newErrors.fullName = "Full name is required";
  }

  if (!draft.contact?.email?.trim()) {
    newErrors.email = "Email is required";
  }

  if (!draft.location?.city?.trim()) {
    newErrors.city = "City is required";
  }

  if (!draft.location?.state?.trim()) {
    newErrors.state = "State is required";
  }

  if (!draft.location?.pincode?.trim()) {
    newErrors.pincode = "Pincode is required";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  /* =========================
     SAVE HANDLER
  ========================== */
  const handleSave = async () => {
    setError("");
    setSuccess("");

    if (!validateForm()) return;


    // 🔍 Simple validation example
   
    try {
      setLoading(true);

      // ⏳ simulate backend save
      await new Promise((res) => setTimeout(res, 800));

      // ✅ Commit to global resume
      await savePartialResumeToBackend({
  personal: draft,
});

replaceSection("personal", draft);

      setSuccess("Personal details saved successfully ✅");
      setIsEditing(false);


    } catch (err) {
      setError(err.message || "Failed to save ");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    
    <section className="header-form">
      <h2 className="section-title">Personal Information</h2>

      <form className="form-grid">
        {/* Full Name */}
        <div className="form-group">
      <label>Full Name</label>
  <input
    value={draft.fullName}
    onChange={(e) => {
      updateField("fullName", e.target.value);
      setErrors((prev) => ({ ...prev, fullName: "" }));
    }}
    placeholder="Name"
  />
  {errors.fullName && (
    <p className="error-text">{errors.fullName}</p>
  )}
</div>




        {/* Location */}
        <div className="form-group">
          <label>City</label>
          <input
            value={draft.location.city}
            onChange={(e) => {
            updateNestedField("location", "city", e.target.value);
             
            }}
            placeholder="City"
          />
          {errors.city && (
           <p className="error-text">{errors.city}</p>
          )}
        </div>


        <div className="form-group">
          <label>State</label>
          <input
            value={draft.location.state}
            
            onChange={(e) => {
            updateNestedField("location", "state", e.target.value);
            setErrors((prev) => ({ ...prev, state: "" }));
            }}

            placeholder="State"
          />
          {errors.state && (
           <p className="error-text">{errors.state}</p>
          )}
        </div>

        <div className="form-group">
          <label>Pincode</label>
          <input
            value={draft.location.pincode}
            
            onChange={(e) => {
            updateNestedField("location", "pincode", e.target.value);
            setErrors((prev) => ({ ...prev, pincode: "" }));
            }}

            placeholder="Pincode"
          />
          {errors.pincode && (
           <p className="error-text">{errors.pincode}</p>
          )}
        </div>

        {/* Contact */}
        <div className="form-group">
      <label>Phone</label>
      <input
        value={draft.contact.phone}
        onChange={(e) => {
        updateNestedField("contact", "phone", e.target.value);
        setErrors((prev) => ({ ...prev, phone: "" }));
         }}
        placeholder="Phone"
        />

  {errors.phone && (
    <p className="error-text">{errors.phone}</p>
  )}
</div>


        <div className="form-group">
          <label>Email</label>
          <input
            value={draft.contact.email}
            onChange={(e) => {
          updateNestedField("contact", "email", e.target.value);
        setErrors((prev) => ({ ...prev, email: "" }));
         }}
            placeholder="Email"
          />
          {errors.email && (
          <p className="error-text">{errors.email}</p>
          )}
        </div>

        {/* Links */}
        <div className="form-group full-width">
          <label>LinkedIn</label>
          <input
            value={draft.links.linkedin}
            
            onChange={(e) => {
          updateNestedField("links", "linkedin", e.target.value);
        setErrors((prev) => ({ ...prev, linkedin: "" }));
         }}
          />
          {errors.linkedin && (
          <p className="error-text">{errors.linkedin}</p>
          )}

        </div>

        <div className="form-group full-width">
          <label>GitHub</label>
          <input
            value={draft.links.github}
            onChange={(e) => {
          updateNestedField("links", "github", e.target.value);
            setErrors((prev) => ({ ...prev, github: "" }));
           }}
          />
          {errors.github && (
          <p className="error-text">{errors.github}</p>
          )}
        </div>

        <div className="form-group full-width">
          <label>Portfolio</label>
          <input
            value={draft.links.portfolio}
            onChange={(e) => {
          updateNestedField("links", "portfolio", e.target.value);
          setErrors((prev) => ({ ...prev, portfolio: "" }));
         }}
          />
          {errors.portfolio && (
          <p className="error-text">{errors.portfolio}</p>
          )}
        </div>
      </form>

      {/* =========================
          SAVE BUTTON
      ========================== */}
      <div className="save-section">
        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}

        <button
          type="button"
          onClick={handleSave}
          disabled={loading}
          className="save-btn"
        >
          {loading ? "Saving..." : "Save "}
        </button>
      </div>
      
    </section>
    
  );
};

export default PersonalInfoForm;
