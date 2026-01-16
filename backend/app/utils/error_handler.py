from fastapi import Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi import status


def validation_exception_handler(
    request: Request,
    exc: RequestValidationError
):
    """
    Converts FastAPI / Pydantic validation errors into
    clean, frontend-friendly error messages.
    """

    formatted_errors = {}

    for error in exc.errors():
        # Example loc:
        # ('body', 'education', 0, 'endYear')
        loc = error.get("loc", [])
        message = error.get("msg", "Invalid input")

        path_parts = []

        for part in loc:
            if part == "body":
                continue
            elif isinstance(part, int):
                # education -> education[0]
                path_parts[-1] = f"{path_parts[-1]}[{part}]"
            else:
                path_parts.append(part)

        field_path = ".".join(path_parts)

        # Avoid overwriting same field error
        if field_path not in formatted_errors:
            formatted_errors[field_path] = message

    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={
            "success": False,
            "errors": formatted_errors
        }
    )
