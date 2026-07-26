from pydantic import BaseModel, EmailStr, Field


# ==========================================================
# Login Request
# ==========================================================
class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)


# ==========================================================
# Access Token Response
# ==========================================================
class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


# ==========================================================
# Refresh Token Request
# ==========================================================
class RefreshTokenRequest(BaseModel):
    refresh_token: str


# ==========================================================
# Forgot Password Request
# ==========================================================
class ForgotPasswordRequest(BaseModel):
    email: EmailStr


# ==========================================================
# Reset Password Request
# ==========================================================
class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str = Field(..., min_length=8, max_length=128)


# ==========================================================
# Change Password Request
# ==========================================================
class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str = Field(..., min_length=8, max_length=128)


# ==========================================================
# Generic Success Message
# ==========================================================
class MessageResponse(BaseModel):
    message: str