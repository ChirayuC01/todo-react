import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, toggleComplete, toggleImportant } from "../redux/taskSlice";

const AllTasks = () => {
  const [taskText, setTaskText] = useState("");
  const { tasks, completedTasks } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (taskText.trim()) {
      dispatch(addTask(taskText));
      setTaskText("");
    }
  };

  return (
    <div className="p-4 ">
      {/* Add Task Input */}
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Add A Task"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          className="flex-1 p-2 border rounded-md"
        />
        <button
          onClick={handleAddTask}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          ADD TASK
        </button>
      </div>

      {/* Task List */}
      <div>
        <h3 className="mb-4 font-semibold">Tasks</h3>
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between p-2 border-b"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => dispatch(toggleComplete(task.id))}
                />
                <span className={task.completed ? "line-through" : ""}>
                  {task.text}
                </span>
              </div>
              <span
                onClick={() => dispatch(toggleImportant(task.id))}
                className={`cursor-pointer ${
                  task.important ? "text-yellow-500" : "text-gray-500"
                }`}
              >
                ★
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Completed Tasks */}
      <div className="mt-6">
        <h3 className="mb-4 font-semibold">Completed</h3>
        <ul>
          {completedTasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between p-2 border-b"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => dispatch(toggleComplete(task.id))}
                />
                <span className="line-through">{task.text}</span>
              </div>
              <span
                onClick={() => dispatch(toggleImportant(task.id))}
                className={`cursor-pointer ${
                  task.important ? "text-yellow-500" : "text-gray-500"
                }`}
              >
                ★
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllTasks;
