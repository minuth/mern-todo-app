import React from "react";
import useCreateUpdateTask from "../hook/task/use-create-update.js";

function CreateTask() {
  const {
    title,
    description,
    setDescription,
    setTitle,
    handleSubmit,
    selectedItem,
  } = useCreateUpdateTask();

  return (
    <div className="addContainer md:w-1/3 md:mx-auto mx-3 mt-3 flex justify-center">
      <div className="w-11/12">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="my-3">
            <label htmlFor="description">Description</label>
            <textarea
              rows={5}
              name="description"
              id="description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
              style={{ resize: "none" }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className=" bg-blue-700 rounded-md text-white px-5 py-1 "
            >
              {selectedItem ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTask;
