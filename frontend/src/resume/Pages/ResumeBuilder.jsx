import PersonalInfoForm from "../Components/PersonalInfo";
import EducationSection from "../Components/EducationInfo";
import ExperienceSection from "../Components/ExperienceSection";
import ProjectsSection from "../Components/ProjectsSection";
import TechnicalSkillsSection from "../Components/TechnicalSkillsSection";
import CertificationsSection from "../Components/CertificationsSection";
import SubmitResumeButton from "../Components/SubmitResumeButton";
import ResumePreview from "../Preview/ResumePreview";
import DownloadButton from "../Components/DownloadButton";

import Header from "../../shared/Components/Header";




const ResumeBuilder = () => {
  return (
    <>
    <Header />
    <div className="resume-builder-page">

      <header className="Header-ResumeBuilder">
        <h1>Resume Builder</h1>
      </header>

      <div className="builder-layout">

        <div className="form-panel">
          <PersonalInfoForm />
          <EducationSection />
          <ExperienceSection />
          <ProjectsSection />
          <TechnicalSkillsSection />
          <CertificationsSection />
          <SubmitResumeButton />
        </div>

        <div className="preview-panel">
          <ResumePreview />
        </div>

      </div>

    </div>
    </>
  );
};

export default ResumeBuilder;