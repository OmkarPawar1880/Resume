from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from app.utils.validators import validate_pincode
from pydantic import BaseModel, validator
from pydantic import BaseModel, EmailStr, validator
from app.utils.validators import validate_phone
from pydantic import BaseModel, validator
from typing import Optional
from app.utils.validators import validate_url
from pydantic import BaseModel, Field, validator
from app.utils.validators import validate_full_name
from pydantic import BaseModel, Field, validator
from typing import Optional
from app.utils.validators import validate_year, validate_grade
from pydantic import BaseModel, validator
from typing import Optional
from app.utils.validators import (
    validate_date,
    validate_experience_type,
    validate_responsibilities,
)
from pydantic import BaseModel, validator
from typing import List, Optional
from app.utils.validators import (
    validate_project_date,
    validate_description,
    validate_url,
)
from datetime import datetime
from pydantic import BaseModel, validator
from app.utils.validators import validate_skill_name, validate_skill_level
from pydantic import BaseModel, validator
from typing import List
from app.utils.validators import validate_skill_category_title
from pydantic import BaseModel, validator
from typing import Optional
from app.utils.validators import (
    validate_cert_name,
    validate_organization,
    validate_cert_year,
    validate_url,
)




class Location(BaseModel):
    city: str
    state: str
    pincode: str

    @validator("pincode")
    def check_pincode(cls, value):
        return validate_pincode(value)


class Contact(BaseModel):
    phone: str
    email: EmailStr

    @validator("phone")
    def check_phone(cls, value):
        return validate_phone(value)


class Links(BaseModel):
    linkedin: Optional[str]
    github: Optional[str]
    portfolio: Optional[str]

    @validator("*")
    def check_urls(cls, value):
        if value:
            return validate_url(value)
        return value




class Personal(BaseModel):
    fullName: str = Field(min_length=2)
    location: Location
    contact: Contact
    links: Links

    @validator("fullName")
    def check_full_name(cls, value):
        return validate_full_name(value)
    


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

    @validator("startYear", "endYear")
    def check_year_format(cls, value):
        return validate_year(value)

    @validator("endYear")
    def check_year_order(cls, value, values):
        if "startYear" in values and int(value) < int(values["startYear"]):
            raise ValueError("End year cannot be before start year")
        return value

    @validator("gradeValue")
    def check_grade(cls, value, values):
        grade_type = values.get("gradeType")
        return validate_grade(grade_type, value)



class Experience(BaseModel):
    company: str
    role: str
    type: str
    location: str
    startDate: str
    endDate: Optional[str]
    responsibilities: str

    @validator("type")
    def check_type(cls, value):
        return validate_experience_type(value)

    @validator("startDate", "endDate")
    def check_dates_format(cls, value):
        if value:
            return validate_date(value)
        return value

    @validator("endDate")
    def check_date_order(cls, value, values):
        if value and "startDate" in values:
            start = datetime.strptime(values["startDate"], "%Y-%m")
            end = datetime.strptime(value, "%Y-%m")
            if end < start:
                raise ValueError("End date cannot be before start date")
        return value

    @validator("responsibilities")
    def check_responsibilities(cls, value):
        return validate_responsibilities(value)


class Project(BaseModel):
    title: str
    technologies: List[str]
    projectDate: str
    description: str
    github: Optional[str]
    live: Optional[str]
    featured: bool

    @validator("projectDate")
    def check_project_date(cls, value):
        return validate_project_date(value)

    @validator("description")
    def check_description(cls, value):
        return validate_description(value)

    @validator("github", "live")
    def check_urls(cls, value):
        if value:
            return validate_url(value)
        return value

    @validator("technologies")
    def check_technologies(cls, value):
        if not value or len(value) == 0:
            raise ValueError("At least one technology is required")
        return value



class Skill(BaseModel):
    name: str
    level: str

    @validator("name")
    def check_name(cls, value):
        return validate_skill_name(value)

    @validator("level")
    def check_level(cls, value):
        return validate_skill_level(value)



class SkillCategory(BaseModel):
    title: str
    skills: List[Skill]

    @validator("title")
    def check_title(cls, value):
        return validate_skill_category_title(value)

    @validator("skills")
    def check_skills_not_empty(cls, value):
        if not value or len(value) == 0:
            raise ValueError("Each skill category must contain at least one skill")
        return value


class Certification(BaseModel):
    name: str
    organization: str
    platform: Optional[str]
    year: str
    url: Optional[str]
    verified: bool

    @validator("name")
    def check_name(cls, value):
        return validate_cert_name(value)

    @validator("organization")
    def check_organization(cls, value):
        return validate_organization(value)

    @validator("year")
    def check_year(cls, value):
        return validate_cert_year(value)

    @validator("url")
    def check_url(cls, value):
        if value:
            return validate_url(value)
        return value



class Resume(BaseModel):
    personal: Personal
    education: List[Education] = Field(..., min_items=1, max_items=5)
    experience: List[Experience] = Field(default_factory=list, max_items=5)
    projects: List[Project] = Field(default_factory=list, max_items=5)
    skills: List[SkillCategory] = Field(..., min_items=1, max_items=5)
    certifications: List[Certification] = Field(default_factory=list, max_items=10)

    @validator("education")
    def check_education_not_empty(cls, v):
        if not v:
            raise ValueError("At least one education entry is required")
        return v
    
class PartialResume(BaseModel):
    personal: Optional[Personal] = None
    education: Optional[list[Education]] = None
    experience: Optional[list[Experience]] = None
    projects: Optional[list[Project]] = None
    skills: Optional[list[SkillCategory]] = None
    certifications: Optional[list[Certification]] = None
