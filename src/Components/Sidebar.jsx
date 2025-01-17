import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveFilter } from "../redux/slices/taskSlice";
import { TaskProgress } from "./TaskProgress";
import { ListTodo, Calendar, Star, Clock, Users, Plus } from "lucide-react";
import profile from "../assets/profile.png";
import { logout } from "../redux/slices/authSlice";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const activeFilter = useSelector((state) => state.tasks.activeFilter);
  const tasks = useSelector((state) => state.tasks.tasks);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const importantTasks = tasks.filter((task) => task.isImportant);
  const todayTasks = tasks.filter((task) => {
    const taskDate = new Date(task.createdAt).toDateString();
    const today = new Date().toDateString();
    return taskDate === today;
  });

  const handleFilterChange = (filter) => {
    dispatch(setActiveFilter(filter));
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logout());
    console.log("Logged out");
  };

  return (
    <div className="md:w-64 h-screen p-6 flex flex-col">
      {/* Profile Section */}
      <div className="relative flex flex-col items-center mb-8">
        <img
          src={profile}
          alt="Profile"
          className="w-16 h-16 rounded-full mb-2 object-cover cursor-pointer"
          onClick={toggleDropdown}
        />
        <h2 className="text-lg font-medium">Hey, {user?.name}</h2>

        {dropdownOpen && (
          <div className="absolute top-20 bg-white shadow-lg border rounded-md w-40 text-center z-10">
            <button
              className="w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => console.log("Navigate to My Profile")}
            >
              My Profile
            </button>
            <button
              className="w-full px-4 py-2 text-gray-700 hover:bg-gray-100 border-t"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => handleFilterChange("all")}
              className={`w-full flex items-center space-x-3 px-4 py-2  rounded-lg  ${
                activeFilter === "all" ? "bg-[#357937] bg-opacity-15" : ""
              }`}
            >
              <ListTodo className="h-5 w-5" />
              <span>All Tasks</span>
              <span className="ml-auto text-gray-400">{tasks.length}</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleFilterChange("today")}
              className={`w-full flex items-center space-x-3 px-4 py-2  rounded-lg  ${
                activeFilter === "today" ? "bg-[#357937] bg-opacity-15" : ""
              }`}
            >
              <Calendar className="h-5 w-5" />
              <span>Today</span>
              <span className="ml-auto text-gray-400">{todayTasks.length}</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleFilterChange("important")}
              className={`w-full flex items-center space-x-3 px-4 py-2  rounded-lg  ${
                activeFilter === "important" ? "bg-[#357937] bg-opacity-15" : ""
              }`}
            >
              <Star className="h-5 w-5" />
              <span>Important</span>
              <span className="ml-auto text-gray-400">
                {importantTasks.length}
              </span>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleFilterChange("planned")}
              className={`w-full flex items-center space-x-3 px-4 py-2  rounded-lg  ${
                activeFilter === "planned" ? "bg-[#357937] bg-opacity-15" : ""
              }`}
            >
              <Clock className="h-5 w-5" />
              <span>Planned</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleFilterChange("assigned")}
              className={`w-full flex items-center space-x-3 px-4 py-2  rounded-lg  ${
                activeFilter === "assigned" ? "bg-[#357937] bg-opacity-15" : ""
              }`}
            >
              <Users className="h-5 w-5" />
              <span>Assigned to me</span>
            </button>
          </li>
        </ul>

        <button
          onClick={() => handleFilterChange("all")}
          className="w-full flex items-center space-x-3 px-4 py-2  rounded-lg  mt-4"
        >
          <Plus className="h-5 w-5" />
          <span>Add list</span>
        </button>
      </nav>

      {/* Task Progress */}
      <TaskProgress />
    </div>
  );
};
