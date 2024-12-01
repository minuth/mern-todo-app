import React from "react";
import Task from "./Task";
import useTaskList from "../hook/task/use-list";

function AllTask() {
  const { items } = useTaskList();

  return (
    <div>
      {items.length !== 0 ? (
        items.map((task, index) => {
          return <Task key={index} task={task} />;
        })
      ) : (
        <h1>Create a new task.</h1>
      )}
    </div>
  );
}

export default AllTask;
