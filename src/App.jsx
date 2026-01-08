import React from 'react'
import './App.css'
import Hero from './Components/Hero'
import PersonalInfoForm from './Components/PersonalInfo'
import EducationInfo from './Components/EducationInfo'
import ExperienceSection from './Components/ExperienceSection'
import ProjectsSection from './Components/ProjectsSection'
import TechnicalSkillsSection from './Components/TechnicalSkillsSection'
import CertificationsSection from './Components/CertificationsSection'
import ResumeBuilder from './Pages/ResumeBuilder'



const App = () => {
  return (
    <>
      {/* <Header /> */}
      <Hero />
      
      <ResumeBuilder />
      
      
      
      

    </>
  )
}

export default App