import { useEffect, useReducer } from "react";
import tokenReducer from "../reducer/token.reducer";
import userReducer from "../reducer/user.reducer";
import taskReducer from "../reducer/task.reducer";
import useUserApi from "./api/use-user-api";

export default function useInit() {
  const token = JSON.parse(localStorage.getItem("authToken"));
  const [userToken, tokenDispatch] = useReducer(tokenReducer, token);
  const [user, userDispatch] = useReducer(userReducer, {});
  const [task, taskDispatch] = useReducer(taskReducer, {
    items: [],
    selectedItem: undefined,
  });

  const { userInfo } = useUserApi();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await userInfo();
        userDispatch({ type: "SET_USER", payload: data.user });
      } catch (error) {
        console.log(error);
      }
    };
    if (userToken) {
      fetchUser();
    }
  }, [userToken, userInfo]);

  return { user, userToken, task, taskDispatch, tokenDispatch, userDispatch };
}
