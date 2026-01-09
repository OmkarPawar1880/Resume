from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional


class Location(BaseModel):
    city: str
    state: str
    pincode: str


class Contact(BaseModel):
    phone: str
    email: EmailStr


class Links(BaseModel):
    linkedin: Optional[str]
    github: Optional[str]
    portfolio: Optional[str]


class CodingProfiles(BaseModel):
    geeksforgeeks: Optional[str]
    leetcode: Optional[str]
    hackerrank: Optional[str]


class Personal(BaseModel):
    fullName: str = Field(min_length=2)
    location: Location
    contact: Contact
    links: Links
    codingProfiles: CodingProfiles


class Education(BaseModel):
    institution: str = Field(min_length=3)
    degree: str
    specialization: Optional[str]
    gradeType: str
    gradeValue: Optional[str]
    startYear: str
    endYear: str
    city: str
    state: str


class Experience(BaseModel):
    company: str
    role: str
    type: str
    location: str
    startDate: str
    endDate: Optional[str]
    responsibilities: str


class Project(BaseModel):
    title: str
    technologies: List[str]
    projectDate: str
    description: str
    github: Optional[str]
    live: Optional[str]
    featured: bool


class Skill(BaseModel):
    name: str
    level: str


class SkillCategory(BaseModel):
    title: str
    skills: List[Skill]


class Certification(BaseModel):
    name: str
    organization: str
    platform: Optional[str]
    year: str
    url: Optional[str]
    verified: bool


class Resume(BaseModel):
    personal: Personal
    education: List[Education]
    experience: List[Experience]
    projects: List[Project]
    skills: List[SkillCategory]
    certifications: List[Certification]

class PartialResume(BaseModel):
    personal: Optional[Personal] = None
    education: Optional[list[Education]] = None
    experience: Optional[list[Experience]] = None
    projects: Optional[list[Project]] = None
    skills: Optional[list[SkillCategory]] = None
    certifications: Optional[list[Certification]] = None
