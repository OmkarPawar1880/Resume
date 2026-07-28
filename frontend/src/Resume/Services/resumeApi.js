// src/services/resumeApi.js
import { API_URL } from "/src/config.js"; // adjust path depth (../ or ../../) based on file location
const ATS_ENDPOINT = "${API_URL}/api/ats/analyze";


export async function analyzeATS(resumeFile, jobDescription) {
  const formData = new FormData();
  formData.append("resume", resumeFile);
  formData.append("job_description", jobDescription);

  const response = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("ATS analysis failed");
  }

  return response.json();
}

const API_BASE_URL = "${API_URL}/api/resume";

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
