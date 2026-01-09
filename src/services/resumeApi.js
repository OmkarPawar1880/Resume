// src/services/resumeApi.js

export const submitResume = async (resume) => {
  // simulate network delay
  await new Promise((res) =>
    setTimeout(res, 1000)
  );

  // fake backend validation
  if (!resume.personal.fullName) {
    throw new Error("Server rejected resume");
  }

  // success response
  return {
    status: "success",
    message: "Resume submitted",
  };
};
