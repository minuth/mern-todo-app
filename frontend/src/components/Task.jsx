import React from "react";

import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import useTaskAction from "../hook/task/use-action";

function Task({ task }) {
  const { handleEdit, handleMarkDone, handleRemove } = useTaskAction(task);

  return (
    <div className="bg-slate-300 py-4 rounded-lg shadow-md flex items-center justify-center gap-2 mb-3">
      <div className="mark-done">
        <input
          type="checkbox"
          className="checkbox"
          onChange={handleMarkDone}
          checked={task.completed}
        />
      </div>
      <div className="task-info text-slate-900 text-sm w-10/12">
        <h4
          className={`task-title text-lg capitalize ${
            task.completed ? "line-through text-red-500" : ""
          }`}
        >
          {task.title}
        </h4>
        <p className="task-description">{task.description}</p>
        <div className=" italic opacity-60">{task?.createdAt}</div>
      </div>
      <div className="flex space-x-2">
        <PencilSquareIcon
          onClick={handleEdit}
          className="size-6 text-blue-500 cursor-pointer"
        />
        <TrashIcon
          onClick={handleRemove}
          className="size-6 text-blue-500 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default Task;
