import { useState, useEffect } from "react";
import { ResumeContext } from "./ResumeContext";
import { initialResume } from "../Schema/resume";
import useAuth from "/src/User/Hooks/useAuth";

const ResumeProvider = ({ children }) => {

  const { user } = useAuth();

 const [resume, setResume] = useState(() => {

    // Get logged-in user
    const currentUser = JSON.parse(
        localStorage.getItem("current_user")
    );

    // If nobody is logged in, return empty resume
    if (!currentUser) {
        return initialResume;
    }

    // Create user-specific key
    const resumeKey = `resume_${currentUser.id}`;

    const savedResume = localStorage.getItem(resumeKey);

    return savedResume
        ? JSON.parse(savedResume)
        : initialResume;

});
  
useEffect(() => {

    if (!user) return;

    const key = `resume_${user.id}`;

    localStorage.setItem(
        key,
        JSON.stringify(resume)
    );

}, [resume, user]);
  
  /* =========================
     ARRAY FIELD UPDATE
  ========================== */
  const updateArrayField = (section, index, field, value) => {
    setResume((prev) => {
      const updated = [...prev[section]];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return { ...prev, [section]: updated };
    });
  };

  /* =========================
     OBJECT HELPERS
  ========================== */
  const updateObjectField = (section, field, value) => {
    setResume((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const updateNestedObjectField = (
    section,
    nestedKey,
    field,
    value
  ) => {
    setResume((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [nestedKey]: {
          ...prev[section][nestedKey],
          [field]: value,
        },
      },
    }));
  };

  /* =========================
     GENERIC ARRAY HELPERS ✅
  ========================== */
  const addArrayItem = (section, item) => {
  setResume((prev) => ({
    ...prev,
    [section]: [...prev[section], item],
  }));
};

  const removeArrayItem = (section, index) => {
  setResume((prev) => ({
    ...prev,
    [section]: prev[section].filter((_, i) => i !== index),
  }));
};

  /* =========================
     SKILLS HELPERS
  ========================== */
  const addSkillToCategory = (catIndex, skill) => {
    setResume((prev) => {
      const updated = [...prev.skills];
      updated[catIndex] = {
        ...updated[catIndex],
        skills: [...updated[catIndex].skills, skill],
      };
      return { ...prev, skills: updated };
    });
  };

  const removeSkillFromCategory = (catIndex, skillIndex) => {
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
  
  const replaceSection = (sectionName, data) => {
    setResume((prev) => ({
      ...prev,
      [sectionName]: data,
    }));
  };
  

  return (
    <ResumeContext.Provider
      value={{
        resume,
        setResume,
        replaceSection,
        updateArrayField,
        updateObjectField,
        updateNestedObjectField,
        addArrayItem,      // ✅ REQUIRED
      removeArrayItem,   // ✅ REQUIRED
        addSkillToCategory,
        removeSkillFromCategory,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export default ResumeProvider;
