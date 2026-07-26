from passlib.context import CryptContext

# ==========================================================
# Password Hashing Configuration
# ==========================================================

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


class PasswordHasher:
    """
    Utility class for password hashing and verification.
    """

    @staticmethod
    def hash_password(password: str) -> str:
        """
        Hash a plain text password.
        """
        return pwd_context.hash(password)

    @staticmethod
    def verify_password(
        plain_password: str,
        hashed_password: str
    ) -> bool:
        """
        Verify a plain password against a hashed password.
        """
        return pwd_context.verify(
            plain_password,
            hashed_password
        )


password_hasher = PasswordHasher()