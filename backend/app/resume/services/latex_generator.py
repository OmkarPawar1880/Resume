import re
from pathlib import Path

# -------------------------------
# Load LaTeX template
# -------------------------------

# backend/app/resume
BASE_DIR = Path(__file__).resolve().parent.parent

# backend/app/resume/templates/resume_template.tex
TEMPLATE_PATH = BASE_DIR / "templates" / "resume_template.tex"

if not TEMPLATE_PATH.exists():
    raise FileNotFoundError(
        f"LaTeX template not found: {TEMPLATE_PATH}"
    )


# -------------------------------
# LaTeX escape helper (MANDATORY)
# -------------------------------
def escape_latex(text: str = "") -> str:
    if text is None:
        return ""

    return (
        str(text)
        .replace("\\", "\\textbackslash{}")
        .replace("&", "\\&")
        .replace("%", "\\%")
        .replace("$", "\\$")
        .replace("#", "\\#")
        .replace("_", "\\_")
        .replace("{", "\\{")
        .replace("}", "\\}")
        .replace("~", "\\textasciitilde{}")
        .replace("^", "\\textasciicircum{}")
    )


# -------------------------------
# Shared helpers
# -------------------------------
MONTHS = {
    "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr",
    "05": "May", "06": "Jun", "07": "Jul", "08": "Aug",
    "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec",
}


def split_into_sentences(text: str) -> list:
    """
    Splits a block of text into individual sentences so each one becomes
    its own bullet point, instead of several sentences being crammed into
    one paragraph-style bullet.

    Handles text that already has manual line breaks or bullet/dash
    prefixes too -- those are normalized away first, then the whole block
    is re-split purely on sentence boundaries ('.', '!', '?').
    """
    if not text:
        return []

    # Collapse any existing manual line breaks into plain spaces first,
    # so we split consistently on sentence punctuation only.
    text = text.replace("\n", " ")

    # Split on '.', '!' or '?' followed by whitespace (or end of string).
    # The (?<=[.!?]) keeps the punctuation attached to the sentence before it.
    raw_sentences = re.split(r'(?<=[.!?])\s+', text.strip())

    sentences = []
    for sentence in raw_sentences:
        sentence = sentence.strip().lstrip("•").lstrip("-").strip()
        if sentence:
            sentences.append(sentence)

    return sentences


def format_month_year(date: str, default: str = "") -> str:
    """
    Converts 'YYYY-MM' -> 'Mon YYYY'.
    Returns `default` if date is falsy (e.g. "Present" for an ongoing
    experience end date, or "" for an optional project date).
    """
    if not date:
        return default

    try:
        year, month = date.split("-")
        return f"{MONTHS.get(month, month)} {year}"
    except Exception:
        return date


# -------------------------------
# Education Section
# -------------------------------
def generate_education_section(education: list) -> str:
    section = ""

    for edu in education:
        institution = escape_latex(edu.get("institution", ""))

        if not institution:
            continue

        degree = escape_latex(edu.get("degree", ""))
        location = escape_latex(edu.get("location", ""))
        grade = escape_latex(edu.get("grade", ""))

        start_year = edu.get("startYear", "")
        end_year = edu.get("endYear", "")

        years = (
            f"{start_year} -- {end_year}"
            if start_year and end_year
            else start_year or end_year
        )

        section += (
            "\\resumeSubheading"
            f"{{{institution}}}"
            f"{{{escape_latex(years)}}}"
            f"{{{degree} - {grade}}}"
            f"{{{location}}}\n"
        )

    return section


# -------------------------------
# Experience Section
# -------------------------------
def generate_experience_section(experience: list) -> str:
    section = ""

    for exp in experience:
        company = escape_latex(exp.get("company", ""))

        if not company:
            continue

        role = escape_latex(exp.get("role", ""))
        exp_type = escape_latex(exp.get("type", ""))
        location = escape_latex(exp.get("location", ""))

        start = format_month_year(exp.get("startDate", ""))
        end = format_month_year(exp.get("endDate", ""), default="Present")

        duration = f"{start} -- {end}"
        title = f"{role} ({exp_type})" if exp_type else role

        section += (
            "\\resumeSubheading"
            f"{{{company}}}"
            f"{{{escape_latex(duration)}}}"
            f"{{{title}}}"
            f"{{{location}}}\n"
            "\\resumeItemListStart\n"
        )

        responsibilities = exp.get("responsibilities", "")

        for point in split_into_sentences(responsibilities):
            section += f"\\resumeItem{{{escape_latex(point)}}}\n"

        section += "\\resumeItemListEnd\n"

    return section


# -------------------------------
# Projects Section
# -------------------------------
def generate_projects_section(projects: list) -> str:
    section = ""

    for project in projects:
        title = escape_latex(project.get("title", ""))

        if not title:
            continue

        date = escape_latex(
            format_month_year(project.get("projectDate", ""))
        )

        github = project.get("github", "").strip()

        # External GitHub link
        link = ""
        if github:
            link = f"~\\href{{{github}}}{{\\faExternalLink*}}"

        section += (
            "\\resumeProjectHeading"
            f"{{\\textbf{{{title}}}{link}}}"
            f"{{{date}}}\n"
            "\\resumeItemListStart\n"
        )

        description = project.get("description", "")

        for line in split_into_sentences(description):
            section += f"\\resumeItem{{{escape_latex(line)}}}\n"

        section += "\\resumeItemListEnd\n"

    return section


# -------------------------------
# Skills Section
# -------------------------------
def generate_skills_section(skills: list) -> str:
    section = "\\small{\\item{\n"

    for category in skills:
        title = escape_latex(category.get("title", ""))

        if not title:
            continue

        skill_names = ", ".join(
            escape_latex(skill.get("name", ""))
            for skill in category.get("skills", [])
        )

        if title and skill_names:
            section += f"\\textbf{{{title}}}: {skill_names} \\\\\n"

    section += "}}\n"

    return section


# -------------------------------
# Certifications Section
# -------------------------------
def generate_certifications_section(certifications: list) -> str:
    section = "\\small{\\item{\n"

    for cert in certifications:
        name = escape_latex(cert.get("name", ""))

        if not name:
            continue

        organization = escape_latex(cert.get("organization", ""))
        year = escape_latex(str(cert.get("year", "")))

        line = f"\\textbf{{•}} {name}"

        if organization:
            line += f" - {organization}"
        if year:
            line += f" ({year})"

        section += line + " \\\\\n"

    section += "}}\n"

    return section


# -------------------------------
# MAIN JSON -> LaTeX GENERATOR
# -------------------------------
def generate_latex(resume: dict) -> str:
    if not resume:
        raise ValueError("Resume data is empty")

    if not TEMPLATE_PATH.exists():
        raise FileNotFoundError(f"Template not found: {TEMPLATE_PATH}")

    template = TEMPLATE_PATH.read_text(encoding="utf-8")

    personal = resume.get("personal") or {}

    replacements = {
        "{{{name}}}": escape_latex(personal.get("name", "")),
        "{{{location}}}": escape_latex(personal.get("location", "")),
        "{{{phone}}}": escape_latex(personal.get("phone", "")),
        "{{{email}}}": escape_latex(personal.get("email", "")),

        # URLs are intentionally NOT escaped -- escaping would corrupt
        # characters like "_" or "~" that are valid and common in URLs.
        "{{{linkedin}}}": personal.get("linkedin", ""),
        "{{{github}}}": personal.get("github", ""),
        "{{{portfolio}}}": personal.get("portfolio", ""),

        "{{{education_section}}}": generate_education_section(
            resume.get("education") or []
        ),
        "{{{experience_section}}}": generate_experience_section(
            resume.get("experience") or []
        ),
        "{{{projects_section}}}": generate_projects_section(
            resume.get("projects") or []
        ),
        "{{{skills_section}}}": generate_skills_section(
            resume.get("skills") or []
        ),
        "{{{certifications_section}}}": generate_certifications_section(
            resume.get("certifications") or []
        ),
    }

    latex = template

    for key, value in replacements.items():
        latex = latex.replace(key, value)

    return latex