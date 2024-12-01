import { useContext, useEffect } from "react";
import TaskContext from "../../context/task.context";
import TokenContext from "../../context/token.context";
import useTaskApi from "../api/use-task-api";

export default function useTaskList() {
  const {
    task: { items, selectedItem },
    taskDispatch,
  } = useContext(TaskContext);
  const { userToken } = useContext(TokenContext);
  const { list } = useTaskApi();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await list();
        taskDispatch({ type: "SET_TASK", payload: data });
      } catch (error) {
        console.log(error);
      }
    };
    fetchTasks();
  }, [userToken, taskDispatch, list]);

  return {
    items,
    selectedItem,
  };
}
