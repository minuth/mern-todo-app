import { useContext, useEffect, useState } from "react";
import TaskContext from "../../context/task.context";
import useTaskApi from "../api/use-task-api";

export default function useCreateUpdateTask() {
  const {
    task: { selectedItem },
    taskDispatch,
  } = useContext(TaskContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const taskApi = useTaskApi();

  const handleAdd = async () => {
    try {
      const res = await taskApi.create({ title, description });
      taskDispatch({
        type: "ADD_TASK",
        payload: {
          id: res.data.id,
          title,
          description,
          completed: false,
        },
      });
      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await taskApi.update({ id: selectedItem.id, title, description });
      taskDispatch({
        type: "UPDATE_TASK",
        payload: {
          ...selectedItem,
          title,
          description,
        },
      });
      taskDispatch({
        type: "SELECT_TASK",
        payload: undefined,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedItem) {
      await handleUpdate();
    } else {
      await handleAdd();
    }
  };

  useEffect(() => {
    setTitle(selectedItem?.title ?? "");
    setDescription(selectedItem?.description ?? "");
  }, [selectedItem]);

  return {
    title,
    description,
    setTitle,
    setDescription,
    selectedItem,
    handleSubmit,
  };
}
