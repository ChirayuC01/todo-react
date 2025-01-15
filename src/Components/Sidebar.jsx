import React, { useState } from "react";
import profilePic from "../assets/profile.png";
import allTasks from "../assets/allTasks.svg";
import today from "../assets/today.svg";
import important from "../assets/important.svg";
import planned from "../assets/planned.svg";
import assignedToMe from "../assets/assignedToMe.svg";
import addList from "../assets/addList.svg";
import AllTasks from "./AllTasks";
import Today from "./Today";
import Important from "./Important";
import Planned from "./Planned";
import AssignedToMe from "./AssignedToMe";

const Sidebar = () => {
  const [activeComponent, setActiveComponent] = useState("AllTasks");

  // Components to render based on the selected menu item
  const renderComponent = () => {
    switch (activeComponent) {
      case "AllTasks":
        return <AllTasks />;
      case "Today":
        return <Today />;
      case "Important":
        return <Important />;
      case "Planned":
        return <Planned />;
      case "AssignedToMe":
        return <AssignedToMe />;
      default:
        return <AllTasks />;
    }
  };

  return (
    <div className="flex">
      <div className="min-h-screen  flex flex-col items-center p-4 w-1/6">
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={profilePic} // Replace with actual profile picture
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <p className="mt-2 text-lg font-semibold">Hey, ABCD</p>
        </div>

        {/* Navigation Menu */}
        <nav className="w-full mb-6">
          <ul className="space-y-2">
            <li
              className={`flex items-center gap-4 p-3 rounded-md  cursor-pointer ${
                activeComponent === "AllTasks"
                  ? "bg-[#357937] bg-opacity-15"
                  : ""
              }`}
              onClick={() => setActiveComponent("AllTasks")}
            >
              <img src={allTasks} alt="All Tasks" />
              <span className="font-medium">All Tasks</span>
            </li>
            <li
              className={`flex items-center gap-4 p-3 rounded-md  cursor-pointer ${
                activeComponent === "Today" ? "bg-[#357937] bg-opacity-15" : ""
              }`}
              onClick={() => setActiveComponent("Today")}
            >
              <img src={today} alt="Today" />
              <span className="font-medium">Today</span>
            </li>
            <li
              className={`flex items-center gap-4 p-3 rounded-md  cursor-pointer ${
                activeComponent === "Important"
                  ? "bg-[#357937] bg-opacity-15"
                  : ""
              }`}
              onClick={() => setActiveComponent("Important")}
            >
              <img src={important} alt="Important" />
              <span className="font-medium">Important</span>
            </li>
            <li
              className={`flex items-center gap-4 p-3 rounded-md  cursor-pointer ${
                activeComponent === "Planned"
                  ? "bg-[#357937] bg-opacity-15"
                  : ""
              }`}
              onClick={() => setActiveComponent("Planned")}
            >
              <img src={planned} alt="Planned" />
              <span className="font-medium">Planned</span>
            </li>
            <li
              className={`flex items-center gap-4 p-3 rounded-md  cursor-pointer ${
                activeComponent === "AssignedToMe"
                  ? "bg-[#357937] bg-opacity-15"
                  : ""
              }`}
              onClick={() => setActiveComponent("AssignedToMe")}
            >
              <img src={assignedToMe} alt="Assigned To Me" />
              <span className="font-medium">Assigned to me</span>
            </li>
          </ul>
        </nav>

        {/* Add List Button */}
        <div className="w-full mb-6">
          <button className="w-full flex items-center justify-center gap-2 py-3  rounded-md ">
            <img src={addList} />
            <span className="font-medium">Add list</span>
          </button>
        </div>

        {/* Task Summary */}
        {/* <div className="w-full bg-white p-4 rounded-md shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-800 font-medium">Today Tasks</h3>
            <span className="text-gray-400 text-sm cursor-pointer">ℹ️</span>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold text-green-500 mb-2">11</h1>
            <div className="relative w-24 h-24">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <circle
                  className="text-gray-300"
                  strokeWidth="3"
                  fill="none"
                  r="16"
                  cx="18"
                  cy="18"
                />
                <circle
                  className="text-green-500"
                  strokeWidth="3"
                  strokeDasharray="75,100"
                  strokeLinecap="round"
                  fill="none"
                  r="16"
                  cx="18"
                  cy="18"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm text-gray-600">
                75% Done
              </span>
            </div>
          </div>
          <div className="flex justify-between text-sm mt-4">
            <span className="text-green-500">● Pending</span>
            <span className="text-gray-400">● Done</span>
          </div>
        </div> */}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 w-5/6">{renderComponent()}</div>
    </div>
  );
};

export default Sidebar;
