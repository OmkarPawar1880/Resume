import PersonalInfoForm from "../Components/PersonalInfo";
import EducationSection from "../Components/EducationInfo";
import ExperienceSection from "../Components/ExperienceSection";
import ProjectsSection from "../Components/ProjectsSection";
import TechnicalSkillsSection from "../Components/TechnicalSkillsSection";
import CertificationsSection from "../Components/CertificationsSection";
import SubmitResumeButton from "../Components/SubmitResumeButton";
import ResumePreview from "../Preview/ResumePreview";

const ResumeBuilder = () => {
  return (
    <div className="builder-layout">
      {/* LEFT: FORMS */}
      <div className="form-panel">
        <PersonalInfoForm />
        <EducationSection />
        <ExperienceSection />
        <ProjectsSection />
        <TechnicalSkillsSection />
        <CertificationsSection />
        <SubmitResumeButton />
      </div>

      {/* RIGHT: A4 PREVIEW */}
      <div className="preview-panel">
        <ResumePreview />
      </div>
    </div>
  );
};

export default ResumeBuilder;
