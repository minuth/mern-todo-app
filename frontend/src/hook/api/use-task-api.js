import { useCallback } from "react";
import { httpClient } from "../../config/http-config";
import useApiHelper from "./use-api-helper";

export default function useTaskApi() {
  const { authHeader } = useApiHelper();

  const create = useCallback(
    async (payload) => {
      const res = await httpClient.post("/tasks", payload, {
        headers: {
          ...authHeader,
        },
      });

      return res.data;
    },
    [authHeader]
  );

  const list = useCallback(async () => {
    const res = await httpClient.get("/tasks", {
      headers: {
        ...authHeader,
      },
    });

    return res.data;
  }, [authHeader]);

  const remove = useCallback(
    async (taskId) => {
      const res = await httpClient.delete(`/tasks/${taskId}`, {
        headers: { ...authHeader },
      });

      return res.data;
    },
    [authHeader]
  );

  const update = useCallback(
    async (task) => {
      const res = await httpClient.put(`/tasks/${task.id}`, task, {
        headers: {
          ...authHeader,
        },
      });

      return res.data;
    },
    [authHeader]
  );

  return { create, list, remove, update };
}
