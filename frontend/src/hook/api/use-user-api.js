import { useCallback } from "react";
import { httpClient } from "../../config/http-config";
import useApiHelper from "./use-api-helper";

export default function useUserApi() {
  const { authHeader } = useApiHelper();
  /**
   *
   * @param {Object} payload
   * @param {String} payload.email
   * @param {String} payload.password
   * @returns
   */
  const login = useCallback(async (payload) => {
    const res = await httpClient.post("/users/login", payload);
    return res.data;
  }, []);

  /**
   *
   * @param {Object} payload
   * @param {String} payload.name
   * @param {String} payload.email
   * @param {String} payload.password
   * @returns
   */
  const register = useCallback(async (payload) => {
    const res = await httpClient.post("/users/register", payload);
    return res.data;
  }, []);

  const userInfo = useCallback(async () => {
    const res = await httpClient.get("/users/me", {
      headers: { ...authHeader },
    });

    return res.data;
  }, [authHeader]);

  return { login, register, userInfo };
}
