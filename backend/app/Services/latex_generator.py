from pathlib import Path

# -------------------------------
# Load LaTeX template
# -------------------------------
TEMPLATE_PATH = Path("app/templates/resume_template.tex")

# -------------------------------
# LaTeX escape helper (MANDATORY)
def escape_latex(text: str = "") -> str:
    return (
        str(text)
        .replace("\\", "\\textbackslash{}")
        .replace("%", "\\%")
        .replace("&", "\\&")
        .replace("_", "\\_")
        .replace("#", "\\#")
        .replace("$", "\\$")
        .replace("{", "\\{")
        .replace("}", "\\}")
    )

# -------------------------------
# Safe section helper
# -------------------------------


# -------------------------------
# Education Section
# -------------------------------
def generate_education_section(education: list) -> str:
    section = ""
    for e in education:
        section += (
            "\\resumeSubheading"
            f"{{{escape_latex(e.get('institution',''))}}}"
            f"{{{escape_latex(e.get('years',''))}}}"
            f"{{{escape_latex(e.get('degree',''))} - {escape_latex(e.get('grade',''))}}}"
            f"{{{escape_latex(e.get('location',''))}}}\n"
        )
    return section

# -------------------------------
# Experience Section
# -------------------------------
def generate_experience_section(experience: list) -> str:
    section = ""
    for exp in experience:
        section += (
            "\\resumeSubheading"
            f"{{{escape_latex(exp.get('company',''))}}}"
            f"{{{escape_latex(exp.get('duration',''))}}}"
            f"{{{escape_latex(exp.get('role',''))} ({escape_latex(exp.get('mode',''))})}}"
            f"{{{escape_latex(exp.get('location',''))}}}\n"
            "\\resumeItemListStart\n"
        )

        for point in exp.get("points", []):
            section += f"\\resumeItem{{{escape_latex(point)}}}\n"

        section += "\\resumeItemListEnd\n"
    return section


# -------------------------------
# Projects Section
# -------------------------------
def generate_projects_section(projects: list) -> str:
    section = ""

    for p in projects:
        title = escape_latex(p.get("title", ""))
        tech = escape_latex(", ".join(p.get("technologies", [])))
        date = escape_latex(p.get("projectDate", ""))
        github = p.get("github")

        # 🔗 external link icon (only if github exists)
        link_tex = ""
        if github:
            link_tex = (
                f"~\\href{{{github}}}{{\\faExternalLink*}}"
            )

        section += (
            "\\resumeProjectHeading"
            f"{{\\textbf{{{title}}} $|$ "
            f"\\emph{{{tech}}}{link_tex}}}"
            f"{{{date}}}\n"
            "\\resumeItemListStart\n"
        )

        # description → bullet points
        for line in p.get("description", "").split(". "):
            section += f"\\resumeItem{{{escape_latex(line)}}}\n"

        section += "\\resumeItemListEnd\n"

    return section

    
# -------------------------------
# Skills Section
# -------------------------------
def generate_skills_section(skills: dict) -> str:
    section = "\\small{\\item{\n"
    for k, v in skills.items():
        section += f"\\textbf{{{escape_latex(k)}}}: {escape_latex(', '.join(v))} \\\\\n"
    section += "}}\n"
    return section



# -------------------------------
# Certifications Section
# -------------------------------
def generate_certifications_section(certifications: list) -> str:
    section = "\\small{\\item{\n"
    for cert in certifications:
        section += f"\\textbf{{•}} {escape_latex(cert)} \\\\\n"
    section += "}}\n"
    return section

    

# -------------------------------
# MAIN JSON → LaTeX GENERATOR
# -------------------------------
def generate_latex(resume: dict) -> str:
    template = TEMPLATE_PATH.read_text(encoding="utf-8")
    personal = resume.get("personal", {})

    latex = (
        template
        # escape only text
        .replace("{{{name}}}", escape_latex(personal.get("name", "")))
        .replace("{{{location}}}", escape_latex(personal.get("location", "")))
        .replace("{{{phone}}}", escape_latex(personal.get("phone", "")))
        .replace("{{{email}}}", escape_latex(personal.get("email", "")))

        # NEVER escape URLs
        .replace("{{{linkedin}}}", personal.get("linkedin", ""))
        .replace("{{{github}}}", personal.get("github", ""))
        .replace("{{{portfolio}}}", personal.get("portfolio", ""))

        .replace("{{{education_section}}}", generate_education_section(resume.get("education", [])))
        .replace("{{{experience_section}}}", generate_experience_section(resume.get("experience", [])))
        .replace("{{{projects_section}}}", generate_projects_section(resume.get("projects", [])))
        .replace("{{{skills_section}}}", generate_skills_section(resume.get("skills", {})))
        .replace("{{{certifications_section}}}", generate_certifications_section(resume.get("certifications", [])))
    )

    return latex

