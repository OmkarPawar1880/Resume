/* =========================
   BASIC FIELD VALIDATORS
========================= */

export const isRequired = (value, message) => {
  if (!value || !value.trim()) {
    return message || "This field is required";
  }
  return null;
};

export const isEmail = (value) => {
  if (!value) return "Email is required";

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(value)) {
    return "Invalid email address";
  }

  return null;
};

export const minLength = (value, length, message) => {
  if (!value || value.length < length) {
    return (
      message ||
      `Must be at least ${length} characters`
    );
  }
  return null;
};

