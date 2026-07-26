# Changelog

## [Unreleased] — Resume Builder Backend Restructure

### Architecture
<!-- Fill in the specifics of the folder restructuring you did, e.g.: -->
- Reorganized backend into feature-based folders (e.g. `app/resume/`, `app/<feature>/`) instead of a flat structure.
- Moved LaTeX template to `backend/app/resume/templates/resume_template.tex`.
- Moved resume generation logic to `backend/app/resume/resume_generator.py`.

### Fixed
- **Bullet rendering bug**: nested `itemize` (job/project bullet points) was defaulting to LaTeX's level-2 label (an en-dash), rendering as `–` instead of `•`. Fixed by explicitly setting `\setlist[itemize,2]{label=\textbullet, ...}` in the template.
- **`format_month_year` duplicate definition**: the function was defined twice in the same module, silently overwriting the first version and breaking the "Present" fallback for ongoing experience end dates. Merged into a single function with a `default` parameter.
- **Empty experience type**: job entries without a `type` value rendered as `"Role ()"` with empty parentheses. Now parentheses are only added when a type is present.

### Added
- `split_into_sentences()` helper: splits a paragraph-style `responsibilities`/`description` field into individual sentences (on `.`, `!`, `?`), so each sentence renders as its own bullet point instead of several sentences being bundled into one long bullet.
- Added `\usepackage[T1]{fontenc}` for correct font glyph rendering.

### Notes
- URL fields (`linkedin`, `github`, `portfolio`) are intentionally **not** LaTeX-escaped before insertion into `\href{...}`, since escaping would corrupt valid URL characters like `_` or `~`.
