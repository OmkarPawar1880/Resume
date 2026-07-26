"""
Application Constants
"""


# ==========================================================
# Token Types
# ==========================================================
ACCESS_TOKEN = "access"
REFRESH_TOKEN = "refresh"
TOKEN_TYPE = "bearer"


# ==========================================================
# User Status
# ==========================================================
ACTIVE = True
INACTIVE = False

VERIFIED = True
UNVERIFIED = False


# ==========================================================
# User Roles
# ==========================================================
ROLE_USER = "USER"
ROLE_ADMIN = "ADMIN"


# ==========================================================
# Authentication Messages
# ==========================================================
INVALID_CREDENTIALS = "Invalid email or password."

EMAIL_ALREADY_EXISTS = "Email already registered."

USER_NOT_FOUND = "User not found."

ACCOUNT_DISABLED = "Account is disabled."

EMAIL_NOT_VERIFIED = "Email is not verified."

PASSWORD_CHANGED = "Password changed successfully."

ACCOUNT_DELETED = "Account deleted successfully."


# ==========================================================
# Success Messages
# ==========================================================
REGISTER_SUCCESS = "Registration successful."

LOGIN_SUCCESS = "Login successful."

PROFILE_UPDATED = "Profile updated successfully."


# ==========================================================
# Error Messages
# ==========================================================
UNAUTHORIZED = "Unauthorized."

FORBIDDEN = "Forbidden."

BAD_REQUEST = "Bad Request."

SERVER_ERROR = "Internal Server Error."


# ==========================================================
# Validation
# ==========================================================
MIN_PASSWORD_LENGTH = 8

MAX_PASSWORD_LENGTH = 128

PHONE_LENGTH = 10