import subprocess
from pathlib import Path

OUTPUT_DIR = Path("app/uploads/resumes")

def compile_pdf(latex: str, filename: str) -> str:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    tex_file = OUTPUT_DIR / f"{filename}.tex"
    tex_file.write_text(latex, encoding="utf-8")

    result = subprocess.run(
        [
            "pdflatex",
            "-interaction=nonstopmode",
            f"-output-directory={OUTPUT_DIR}",
            str(tex_file)
        ],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )

    pdf_file = OUTPUT_DIR / f"{filename}.pdf"

    # ✅ If PDF exists, treat as success
    if pdf_file.exists():
        return pdf_file.name

    # ❌ If PDF not created, raise real error
    raise RuntimeError(
        f"LaTeX failed:\n{result.stdout}\n{result.stderr}"
    )
