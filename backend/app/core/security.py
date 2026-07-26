import re
import secrets
import string


class Security:
    """
    Common security helper methods.
    """

    @staticmethod
    def generate_token(length: int = 64) -> str:
        """
        Generate a secure random token.

        Used for:
        - Email verification
        - Password reset
        - API keys
        """
        return secrets.token_urlsafe(length)

    @staticmethod
    def generate_otp(length: int = 6) -> str:
        """
        Generate a numeric OTP.
        """
        digits = string.digits
        return "".join(secrets.choice(digits) for _ in range(length))

    @staticmethod
    def validate_password(password: str) -> tuple[bool, str]:
        """
        Validate password strength.
        """

        if len(password) < 8:
            return False, "Password must be at least 8 characters."

        if not re.search(r"[A-Z]", password):
            return False, "Password must contain an uppercase letter."

        if not re.search(r"[a-z]", password):
            return False, "Password must contain a lowercase letter."

        if not re.search(r"\d", password):
            return False, "Password must contain a number."

        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
            return False, "Password must contain a special character."

        return True, "Password is valid."


security = Security()