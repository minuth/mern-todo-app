import { useMemo } from "react";

export default function useApiHelper() {
  const token = useMemo(() => {
    return JSON.parse(localStorage.getItem("authToken"));
  }, []);

  const authHeader = useMemo(() => {
    return {
      Authorization: `Bearer ${token}`,
    };
  }, [token]);

  return { authHeader };
}
