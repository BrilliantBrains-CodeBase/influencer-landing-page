import axios from "axios";

let csrfToken: string | null = null;

export const getCsrfToken = async () => {
  if (csrfToken) return csrfToken;

  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/auth/csrf-token`,
    { withCredentials: true }
  );

  csrfToken = res.data.csrfToken;
  return csrfToken;
};

export const clearCsrfToken = () => {
  csrfToken = null;
};
