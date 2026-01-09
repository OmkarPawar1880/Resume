import { useContext } from "react";
import { ResumeContext } from "./ResumeContext";

export const useResume = () => {
  const context = useContext(ResumeContext);

  if (!context) {
    throw new Error(
      "useResume must be used inside ResumeProvider"
    );
  }

  const { resume, setResume } = context;

  /* ===============================
     ARRAY FIELD UPDATE (generic)
  =============================== */
  const updateArrayField = (
    section,
    index,
    field,
    value
  ) => {
    setResume((prev) => {
      const updated = [...prev[section]];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return {
        ...prev,
        [section]: updated,
      };
    });
  };

  /* ===============================
     SKILLS HELPERS
  =============================== */
  

  const removeSkillFromCategory = (
    catIndex,
    skillIndex
  ) => {
    setResume((prev) => {
      const updated = [...prev.skills];
      updated[catIndex] = {
        ...updated[catIndex],
        skills: updated[catIndex].skills.filter(
          (_, i) => i !== skillIndex
        ),
      };
      return { ...prev, skills: updated };
    });
  };

const addArrayItem = (section, item) => {
  setResume((prev) => ({
    ...prev,
    [section]: [...prev[section], item],
  }));
};

const removeArrayItem = (section, index) => {
    setResume((prev) => ({
      ...prev,
      [section]: prev[section].filter(
        (_, i) => i !== index
      ),
    }));
  };

  const replaceSection = (section, data) => {
  setResume((prev) => ({
    ...prev,
    [section]: data,
  }));
};

const saveResumeToBackend = async () => {
  const res = await fetch("http://localhost:8000/resume", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resume),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Failed to save resume");
  }

  return res.json();
};

const savePartialResumeToBackend = async (partialData) => {
  const res = await fetch("http://localhost:8000/resume/partial", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(partialData),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Failed to save section");
  }

  return res.json();
};


  return {
    resume,
    setResume,
    replaceSection,
    addArrayItem,
    removeArrayItem,
    updateArrayField,
    
    removeSkillFromCategory,
    context,
    saveResumeToBackend,
    savePartialResumeToBackend,

  };
};
