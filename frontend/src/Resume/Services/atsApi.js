const API_URL = "https://createresume.onrender.com/api/ats/analyze";

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
