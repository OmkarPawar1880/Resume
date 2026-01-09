export const initialResume = {
  personal: {
    fullName: "",
    location: { city: "", state: "", pincode: "" },
    contact: { phone: "", email: "" },
    links: {
      linkedin: "",
      github: "",
      portfolio: "",
    },
    
  },

  education: [
    {
      
      institution: "",
      degree: "",
      specialization: "",
      gradeType: "CGPA",
      gradeValue: "",
      startYear: "",
      endYear: "",
      city: "",
      state: "",
    },
  ],

experience: [
  {
    company: "",
    role: "",
    type: "Intern",
    location: "",
    startDate: "",
    endDate: "",
    responsibilities: "",
  },
],
projects: [
  {
    title: "",
    technologies: [],
    projectDate: "",
    description: "",
    github: "",
    live: "",
    featured: false,
  },
],


  skills: [
  {
    title: "Programming Languages",
    skills: [],
  },
  {
    title: "Technologies / Frameworks",
    skills: [],
  },
  {
    title: "Developer Tools",
    skills: [],
  },
],

  
  certifications: [
  {
    name: "",
    organization: "",
    platform: "",
    year: "",
    url: "",
    verified: false,
  },
],

};
