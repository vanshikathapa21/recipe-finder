const rawApiUrl = process.env.REACT_APP_API_URL?.trim();

const normalizeApiBase = (value) => {
  if (!value) {
    return "";
  }

  return value.replace(/\/+$/, "");
};

const getDefaultApiBase = () => {
  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    return "http://localhost:5000/api";
  }

  return "/api";
};

export const API_BASE = normalizeApiBase(rawApiUrl) || getDefaultApiBase();
