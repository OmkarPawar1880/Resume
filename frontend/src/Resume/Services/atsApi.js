import { API_URL } from "/src/config.js";

const ATS_ENDPOINT = `${API_URL}/api/ats/analyze`;

export async function analyzeATS(resumeFile, jobDescription) {
  const formData = new FormData();
  formData.append("resume", resumeFile);
  formData.append("job_description", jobDescription);

  const response = await fetch(ATS_ENDPOINT, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("ATS analysis failed");
  }

  return response.json();
}