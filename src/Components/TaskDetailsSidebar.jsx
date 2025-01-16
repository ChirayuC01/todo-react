import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTask,
  toggleImportant,
  toggleTask,
  updateTask,
} from "../redux/slices/taskSlice";
import {
  X,
  Bell,
  Calendar,
  RotateCw,
  Plus,
  Star,
  Repeat,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";
import star from "../assets/star.svg";
import starFill from "../assets/starFill.svg";

export const TaskDetailsSidebar = ({ taskId, onClose }) => {
  const [showCalender, setShowCalender] = useState(false);
  const task = useSelector((state) =>
    state.tasks.tasks.find((t) => t.id === taskId)
  );
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDark);

  if (!task) return null;

  const handleUpdate = (key, value) => {
    dispatch(updateTask({ ...task, [key]: value }));
  };

  const handleCalenderClick = () => {
    setShowCalender((prev) => !prev);
  };

  return (
    <div
      className={`fixed top-0 right-0 w-80 h-full flex flex-col ${
        isDark ? "bg-[#2C2C2C]" : "bg-[#EEF6EF]"
      } shadow-lg`}
    >
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Task Details</h2>
        </div>

        <div className="space-y-6">
          {/* Title Section */}
          <div>
            <h3 className="text-sm font-medium mb-2">Title</h3>
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => {
                  e.stopPropagation();
                  dispatch(toggleTask(task.id));
                }}
                className={`h-5 w-5 rounded `}
              />
              <input
                type="text"
                value={task.title}
                onChange={(e) => handleUpdate("title", e.target.value)}
                className={`flex-1  border-none focus:outline-none rounded-md  ${
                  isDark ? "bg-[#2C2C2C] text-white" : "bg-[#EEF6EF] text-black"
                } border`}
              />
              <img
                src={task.isImportant ? starFill : star}
                className={`cursor-pointer ${!isDark && "invert"}`}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(toggleImportant(task.id));
                }}
              />
            </div>
          </div>

          {/* Other Sections */}
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center gap-4">
              <Plus /> Add Stop
            </h3>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center gap-4">
              <Bell /> Set Reminder
            </h3>
          </div>

          {/* Due Date Section */}
          <div onClick={handleCalenderClick} className="cursor-pointer">
            <h3 className="text-sm font-medium mb-2 flex items-center gap-4">
              <Calendar /> Add Due Date
            </h3>
          </div>
          {showCalender && (
            <div>
              <input
                type="date"
                value={task.dueDate || ""}
                onChange={(e) => handleUpdate("dueDate", e.target.value)}
                className={`w-full rounded-md px-3 py-2 ${
                  isDark ? "bg-[#2C2C2C] text-white" : "bg-[#EEF6EF] text-black"
                } border`}
              />
            </div>
          )}

          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center gap-4">
              <Repeat /> Repeat
            </h3>
          </div>
        </div>
      </div>

      {/* End Section */}
      <div
        className={`end-section flex justify-between items-center p-4 border-t ${
          isDark ? "border-gray-700" : "border-gray-300"
        }`}
      >
        <button onClick={onClose}>
          <X className="h-5 w-5" />
        </button>
        <div>
          <p>{format(new Date(task.createdAt), "PPP")}</p>
        </div>
        <Trash2
          className="h-5 w-5 text-gray-400 hover:text-red-500 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(deleteTask(taskId));
            onClose();
          }}
        />
      </div>
    </div>
  );
};
