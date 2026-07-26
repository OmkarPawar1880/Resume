from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib

from app.core.config import settings


class EmailService:
    """
    Service for sending emails.
    """

    def __init__(self):
        self.smtp_host = settings.SMTP_HOST
        self.smtp_port = settings.SMTP_PORT
        self.smtp_username = settings.SMTP_USERNAME
        self.smtp_password = settings.SMTP_PASSWORD
        self.email_from = settings.EMAIL_FROM

    # ==========================================================
    # Send Email
    # ==========================================================
    def send_email(
        self,
        recipient: str,
        subject: str,
        body: str
    ) -> bool:
        """
        Send an HTML email.
        """

        # Email is not configured
        if not all([
            self.smtp_host,
            self.smtp_port,
            self.smtp_username,
            self.smtp_password,
            self.email_from
        ]):
            print("SMTP is not configured. Email not sent.")
            return False

        message = MIMEMultipart()

        message["From"] = self.email_from
        message["To"] = recipient
        message["Subject"] = subject

        message.attach(
            MIMEText(body, "html")
        )

        try:
            with smtplib.SMTP(
                self.smtp_host,
                self.smtp_port
            ) as server:

                server.starttls()

                server.login(
                    self.smtp_username,
                    self.smtp_password
                )

                server.sendmail(
                    self.email_from,
                    recipient,
                    message.as_string()
                )

            return True

        except Exception as e:
            print(f"Email Error: {e}")
            return False

    # ==========================================================
    # Welcome Email
    # ==========================================================
    def send_welcome_email(
        self,
        recipient: str,
        first_name: str
    ):

        subject = "Welcome to Resume Builder"

        body = f"""
        <h2>Welcome {first_name}!</h2>

        <p>
            Thank you for registering with Resume Builder.
        </p>

        <p>
            Your account has been created successfully.
        </p>
        """

        return self.send_email(
            recipient,
            subject,
            body
        )

    # ==========================================================
    # Verification Email
    # ==========================================================
    def send_verification_email(
        self,
        recipient: str,
        first_name: str,
        verification_link: str
    ):

        subject = "Verify Your Email"

        body = f"""
        <h2>Hello {first_name}</h2>

        <p>
            Click the button below to verify your email.
        </p>

        <a href="{verification_link}">
            Verify Email
        </a>
        """

        return self.send_email(
            recipient,
            subject,
            body
        )

    # ==========================================================
    # Password Reset Email
    # ==========================================================
    def send_password_reset_email(
        self,
        recipient: str,
        first_name: str,
        reset_link: str
    ):

        subject = "Reset Your Password"

        body = f"""
        <h2>Hello {first_name}</h2>

        <p>
            Click the link below to reset your password.
        </p>

        <a href="{reset_link}">
            Reset Password
        </a>

        <p>
            If you didn't request this, you can safely ignore this email.
        </p>
        """

        return self.send_email(
            recipient,
            subject,
            body
        )


email_service = EmailService()