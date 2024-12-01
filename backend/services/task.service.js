import taskModel from "../models/task.model.js";

export const addTask = async (param) => {
  const { title, description, userId } = param;
  const newTask = new taskModel({
    title: validator.escape(title),
    description: validator.escape(description),
    completed: false,
    userId,
  });
  const task = await newTask.save();
  return mapTaskDto(task);
};

export const removeTask = async (param) => {
  const { id, userId } = param;
  await taskModel.findOneAndDelete({ _id: id, userId: userId });
};

export const getTasks = async (param) => {
  const { userId } = param;
  const results = await taskModel.find({ userId: userId });
  return results.map((data) => mapTaskDto(data));
};

export const updateTask = async (param) => {
  const { id, userId, title, description, completed } = param;
  await taskModel.findOneAndUpdate(
    { _id: id, userId: userId },
    {
      title,
      description,
      completed,
    }
  );
};

const mapTaskDto = (task) => ({
  id: task.id,
  title: task.title,
  description: task.description,
  completed: task.completed,
  createdAt: task.createdAt,
  updatedAt: task.updatedAt,
});
