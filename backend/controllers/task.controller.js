import {
  addTask,
  getTasks,
  removeTask,
  updateTask,
} from "../services/task.service.js";

const add = async (req, res) => {
  const userId = req.user.id;
  try {
    const createdTask = await addTask({ ...req.body, userId });
    return res
      .status(200)
      .json({ message: "Task added successfully", data: createdTask });
  } catch (error) {
    return res.status(error.code ?? 500).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  try {
    await removeTask({ id, userId });
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(error.code ?? 500).json({ message: error.message });
  }
};

const list = async (req, res) => {
  const userId = req.user.id;
  try {
    const data = await getTasks({ userId });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(error.code ?? 500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  try {
    await updateTask({ id, userId, ...req.body });
    return res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    return res.status(error.code ?? 500).json({ message: error.message });
  }
};

export const taskController = { add, remove, list, update };
