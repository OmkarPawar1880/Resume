import PersonalInfoForm from "../Components/PersonalInfo";
import EducationSection from "../Components/EducationInfo";
import ExperienceSection from "../Components/ExperienceSection";
import ProjectsSection from "../Components/ProjectsSection";
import TechnicalSkillsSection from "../Components/TechnicalSkillsSection";
import CertificationsSection from "../Components/CertificationsSection";
import SubmitResumeButton from "../Components/SubmitResumeButton";

const ResumeBuilder = () => {
  return (
    <>
      <PersonalInfoForm />
      <EducationSection />
      <ExperienceSection />
      <ProjectsSection />
      <TechnicalSkillsSection />
      <CertificationsSection />
      <SubmitResumeButton />
    </>
  );
};

export default ResumeBuilder;
