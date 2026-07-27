// src/services/resumeApi.js

const API_BASE_URL = "http://localhost:8000/api/resume";

/**
 * Generate resume PDF (JSON → LaTeX → PDF)
 * @param {Object} resumeData
 * @returns {Promise<Object>}
 */
export async function generateResume(resumeData) {
  const response = await fetch(`${API_BASE_URL}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resumeData),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Failed to generate resume");
  }

  return response.json();
}

/**
 * Submit resume data (save / validate / versioning later)
 * @param {Object} resume
 * @returns {Promise<Object>}
 */
export async function submitResume(resume) {
  const response = await fetch(`${API_BASE_URL}/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resume),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Failed to submit resume");
  }

  return response.json();
}
