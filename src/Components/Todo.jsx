import React from "react";
import Sidebar from "./Sidebar";
import AllTasks from "./AllTasks";

const Todo = () => {
  return (
    <div className="w-full flex">
      <div className="w-full">
        <Sidebar />
      </div>
      {/* <div className="">
        <AllTasks />
      </div> */}
    </div>
  );
};

export default Todo;
