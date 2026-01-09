import { useResume } from "../context/useResume";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaGlobe,
} from "react-icons/fa";

const ResumePreview = () => {
  const { resume } = useResume();

  // 🔐 SAFE NORMALIZATION
  const personal = resume.personal || {
    fullName: "",
    location: { city: "", state: "", pincode: "" },
    contact: { phone: "", email: "" },
    links: { linkedin: "", github: "", portfolio: "" },
  };

  const education = resume.education || [];
  const experience = resume.experience || [];
  const projects = resume.projects || [];
  const skills = resume.skills || [];
  const certifications = resume.certifications || [];

  return (
    <div className="resume-page">
      {/* HEADER */}
      <header className="resume-header">
        <h1 className="resume-name">{personal.fullName}</h1>

        <div className="resume-location">
          {personal.location.city} – {personal.location.state}{" "}
          {personal.location.pincode}
        </div>

        <div className="resume-contacts">
          {personal.contact.phone && (
            <span>
              <FaPhoneAlt /> {personal.contact.phone}
            </span>
          )}
          {personal.contact.email && (
            <span>
              <FaEnvelope /> {personal.contact.email}
            </span>
          )}
          {personal.links.linkedin && (
            <span>
              <FaLinkedin /> LinkedIn
            </span>
          )}
          {personal.links.github && (
            <span>
              <FaGithub /> GitHub
            </span>
          )}
          {personal.links.portfolio && (
            <span>
              <FaGlobe /> Portfolio
            </span>
          )}
        </div>
      </header>

      {/* EDUCATION */}
      {education.length > 0 && (
        <section>
          <h2>Education</h2>
          {education.map((edu, i) => (
            <div key={i} className="row">
              <div>
                <strong>{edu.institution}</strong>
                <div>
                  {edu.degree}
                  {edu.specialization && ` – ${edu.specialization}`}
                </div>
              </div>
              <div className="right">
                {edu.startYear} – {edu.endYear}
                <br />
                {edu.city}, {edu.state}
                {edu.gradeValue && (
                  <div>
                    {edu.gradeType}: {edu.gradeValue}
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <section>
          <h2>Experience</h2>
          {experience.map((exp, i) => (
            <div key={i} className="block">
              <div className="row">
                <strong>{exp.company}</strong>
                <span className="right">
                  {exp.startDate} – {exp.endDate}
                </span>
              </div>
              <em>
                {exp.role} ({exp.type})
              </em>
              <ul>
                {exp.responsibilities
                  ?.split("\n")
                  .filter(Boolean)
                  .map((r, idx) => (
                    <li key={idx}>{r.replace("•", "").trim()}</li>
                  ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* PROJECTS */}
      {projects.length > 0 && (
        <section>
          <h2>Projects</h2>
          {projects.map((p, i) => (
            <div key={i} className="block">
              <div className="row">
                <strong>{p.title}</strong>
                <span className="right">{p.projectDate}</span>
              </div>
              <ul>
                {p.description
                  ?.split("\n")
                  .filter(Boolean)
                  .map((d, idx) => (
                    <li key={idx}>{d.replace("•", "").trim()}</li>
                  ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* SKILLS */}
      {skills.length > 0 && (
        <section>
          <h2>Technical Skills</h2>
          {skills.map((cat, i) => (
            <p key={i}>
              <strong>{cat.title}:</strong>{" "}
              {cat.skills.map((s) => s.name).join(", ")}
            </p>
          ))}
        </section>
      )}

      {/* CERTIFICATIONS */}
      {certifications.length > 0 && (
        <section>
          <h2>Certifications</h2>
          <ul>
            {certifications.map((c, i) => (
              <li key={i}>
                {c.name} – {c.organization} {c.year}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default ResumePreview;
