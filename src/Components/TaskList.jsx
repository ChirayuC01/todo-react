import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleTask,
  deleteTask,
  updateTaskPriority,
  toggleImportant,
} from "../redux/slices/taskSlice";
import {
  Star,
  Trash2,
  Cloud,
  X,
  RotateCw,
  Bell,
  RotateCcw,
  Calendar,
} from "lucide-react";
import { format } from "date-fns";
import { addTask } from "../redux/slices/taskSlice";
import { TaskDetailsSidebar } from "./TaskDetailsSidebar";
import star from "../assets/star.svg";
import starFill from "../assets/starFill.svg";

export const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const activeFilter = useSelector((state) => state.tasks.activeFilter);
  const dispatch = useDispatch();
  const [selectedTask, setSelectedTask] = useState(null);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const isDark = useSelector((state) => state.theme.isDark);
  const isList = useSelector((state) => state.view.isList);
  const isSidebar = useSelector((state) => state.sidebar.isSidebar);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 500);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const filteredTasks = tasks.filter((task) => {
    switch (activeFilter) {
      case "today":
        const taskDate = new Date(task.createdAt).toDateString();
        const today = new Date().toDateString();
        return taskDate === today;
      case "important":
        return task.isImportant;
      case "planned":
        return task.dueDate;
      case "assigned":
        return false;
      default:
        return true;
    }
  });

  const pendingTasks = filteredTasks.filter((task) => !task.completed);
  const completedTasks = filteredTasks.filter((task) => task.completed);

  const handleTaskClick = (taskId) => {
    setSelectedTask(taskId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await dispatch(
      addTask({
        title: title.trim(),
        completed: false,
        priority,
        dueDate,
      })
    );

    setTitle("");
    setPriority("medium");
    setDueDate("");
  };

  if (isMobile && isSidebar) return null;

  return (
    <div className={`relative flex-1 `}>
      <div
        className={` p-4 py-10 rounded-lg mb-6 ${
          selectedTask ? "max-w-[75%]" : ""
        }`}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div
            className={`flex flex-col gap-5 py-4 px-4 space-x-4 ${
              isDark
                ? "bg-[#357937] bg-opacity-15"
                : "bg-[#357937] bg-opacity-15"
            }`}
          >
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a task"
              className={`flex-1 rounded-md px-4 py-2 h-28 focus:outline-none  ${
                isDark ? "bg-inherit bg-opacity-15" : "bg-inherit bg-opacity-15"
              }`}
            />
            <div className="flex justify-between ">
              <div className="flex space-x-2">
                <button type="button" className="p-2 ">
                  <Bell className="h-5 w-5" />
                </button>
                <button type="button" className="p-2 ">
                  <RotateCcw className="h-5 w-5" />
                </button>
                <button type="button" className="p-2 ">
                  <Calendar className="h-5 w-5" />
                </button>
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Add Task
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="space-y-4">
        {/* Pending Tasks */}
        <div
          className={`space-y-2 ${
            !isList && selectedTask && pendingTasks.length > 2
              ? "max-w-[75%]"
              : ""
          }`}
        >
          <h2 className="text-lg font-semibold  mb-4">Tasks</h2>
          {pendingTasks.length === 0 && <div>Great Job! No pending tasks</div>}
          {isList ? (
            // List View
            pendingTasks.map((task) => (
              <div
                key={task.id}
                className={`border border-[#496E4B] border-opacity-20 rounded-lg p-4 cursor-pointer ${
                  task.id === selectedTask ? "ring-2 ring-green-500" : ""
                } ${selectedTask ? "max-w-[75%]" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={(e) => {
                        e.stopPropagation();
                        dispatch(toggleTask(task.id));
                      }}
                      className="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="" onClick={() => handleTaskClick(task.id)}>
                      {task.title}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <img
                      src={task.isImportant ? starFill : star}
                      className={`cursor-pointer ${!isDark && "invert"}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(toggleImportant(task.id));
                      }}
                    />
                    <Trash2
                      className="h-5 w-5 text-gray-400 hover:text-red-500 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(deleteTask(task.id));
                        setSelectedTask(null);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Card View
            <div
              className={`grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3`}
            >
              {pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className={`border border-[#496E4B] border-opacity-20 rounded-lg p-4 shadow cursor-pointer ${
                    task.id === selectedTask ? "ring-2 ring-green-500" : ""
                  } `}
                >
                  <div className="flex items-center justify-between mb-2 min-h-24">
                    <div className="flex justify-center items-center gap-2">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={(e) => {
                          e.stopPropagation();
                          dispatch(toggleTask(task.id));
                        }}
                        className="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <h3
                        className="text-lg font-semibold"
                        onClick={() => handleTaskClick(task.id)}
                      >
                        {task.title}
                      </h3>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                      <img
                        src={task.isImportant ? starFill : star}
                        className={`cursor-pointer ${!isDark && "invert"}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(toggleImportant(task.id));
                        }}
                      />
                      <Trash2
                        className="h-5 w-5 text-gray-400 hover:text-red-500 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(deleteTask(task.id));
                          setSelectedTask(null);
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold  mb-4">Completed</h2>
            <div className="space-y-2 opacity-60">
              {completedTasks.map((task) => (
                <div
                  key={task.id}
                  className={`rounded-lg p-4 cursor-pointer  ${
                    task.id === selectedTask ? "ring-2 ring-green-500" : ""
                  } ${selectedTask ? "max-w-[75%]" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={(e) => {
                          e.stopPropagation();
                          dispatch(toggleTask(task.id));
                        }}
                        className="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span
                        className=" line-through"
                        onClick={() => handleTaskClick(task.id)}
                      >
                        {task.title}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <img
                        src={task.isImportant ? starFill : star}
                        className={`cursor-pointer ${!isDark && "invert"}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(toggleImportant(task.id));
                        }}
                      />
                      <Trash2
                        className="h-5 w-5 text-gray-400 hover:text-red-500 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(deleteTask(task.id));
                          setSelectedTask(null);
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Task Details Sidebar */}
      {selectedTask && (
        <TaskDetailsSidebar
          taskId={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
};
