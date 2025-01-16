import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../redux/slices/taskSlice";
import { Bell, RotateCcw, Calendar } from "lucide-react";

export const TaskInput = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const isDark = useSelector((state) => state.theme.isDark);

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

  return (
    <div className=" p-4 py-10 rounded-lg mb-6 ">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div
          className={`flex flex-col gap-5 py-4 px-4 space-x-4 ${
            isDark ? "bg-[#357937] bg-opacity-15" : "bg-[#357937] bg-opacity-15"
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
  );
};
