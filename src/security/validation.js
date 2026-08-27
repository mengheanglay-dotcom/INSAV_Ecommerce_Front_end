export const validators = {
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  password: (value) => typeof value === "string" && value.length >= 8,
  name: (value) =>
    typeof value === "string" &&
    value.trim().length >= 2 &&
    value.length <= 100,
};
