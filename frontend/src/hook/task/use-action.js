import { useContext } from "react";
import TaskContext from "../../context/task.context";
import useTaskApi from "../api/use-task-api";

export default function useTaskAction(task) {
  const { taskDispatch } = useContext(TaskContext);
  const taskApi = useTaskApi();

  const handleRemove = async (e) => {
    e.preventDefault();
    await taskApi.remove(task.id);
    taskDispatch({
      type: "REMOVE_TASK",
      id: task.id,
    });
  };

  const handleMarkDone = async (e) => {
    await taskApi.update({ id: task.id, completed: !task.completed });
    taskDispatch({
      type: "MARK_DONE",
      id: task.id,
    });
  };

  const handleEdit = async (e) => {
    taskDispatch({
      type: "SELECT_TASK",
      payload: task,
    });
  };

  return { handleRemove, handleMarkDone, handleEdit };
}
