import { isRequired, isEmail } from "./validators";

/* =========================
   PERSONAL INFO VALIDATION
========================= */
export const validatePersonalInfo = (data) => {
  const errors = [];

  errors.push(
    isRequired(data.fullName, "Full name is required")
  );

  errors.push(
    isEmail(data.contact?.email)
  );

  errors.push(
    isRequired(data.location?.city, "City is required")
  );

  errors.push(
    isRequired(data.location?.state, "State is required")
  );

  // Remove nulls
  return errors.filter(Boolean);
};
