// src/utils/validateResume.js

export const validateResume = (resume) => {
  const errors = {};

  /* PERSONAL */
  if (!resume.personal.fullName.trim()) {
    errors.fullName = "Full name is required";
  }

  if (!resume.personal.contact.email.trim()) {
    errors.email = "Email is required";
  }

  /* EDUCATION */
  if (
    resume.education.some(
      (edu) => !edu.institution.trim()
    )
  ) {
    errors.education =
      "All education entries must have institution name";
  }

  /* EXPERIENCE */
  if (
    resume.experience.some(
      (exp) => !exp.company.trim()
    )
  ) {
    errors.experience =
      "All experience entries must have company name";
  }

  /* SKILLS */
  if (
    resume.skills.some(
      (cat) => cat.skills.length === 0
    )
  ) {
    errors.skills =
      "Each skill category must have at least one skill";
  }

  /* PROJECTS */
  if (
    resume.projects.some(
      (proj) => !proj.title.trim()
    )
  ) {
    errors.projects =
      "All projects must have a title";
  }

  return errors;
};
