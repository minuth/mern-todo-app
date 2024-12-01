function taskReducer(task, action) {
  const { items } = task;
  switch (action.type) {
    case "ADD_TASK": {
      return { items: [...items, action.payload] };
    }
    case "SET_TASK": {
      return { items: action.payload };
    }
    case "REMOVE_TASK": {
      return { items: items.filter((task) => task.id !== action.id) };
    }
    case "MARK_DONE": {
      return {
        items: items.map((task) => {
          if (task.id === action.id) {
            return {
              ...task,
              completed: !task.completed,
            };
          }
          return task;
        }),
      };
    }
    case "SELECT_TASK": {
      return {
        items,
        selectedItem: action.payload,
      };
    }
    case "UPDATE_TASK": {
      const updateIndex = items.findIndex(
        (item) => action.payload.id === item.id
      );
      items[updateIndex] = action.payload;
      return { items };
    }
    default: {
      throw Error("Unknown Action" + action.type);
    }
  }
}

export default taskReducer;
