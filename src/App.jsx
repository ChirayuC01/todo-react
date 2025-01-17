import React from "react";
import { useSelector } from "react-redux";
import { LoginForm } from "./Components/LoginForm";
import { TaskInput } from "./Components/TaskInput";
import { TaskList } from "./Components/TaskList";
import { Sidebar } from "./Components/Sidebar";
import { CheckCircle, Moon, Sun } from "lucide-react";
import { useDispatch } from "react-redux";
import Header from "./Components/Header";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const isDark = useSelector((state) => state.theme.isDark);
  const isSidebar = useSelector((state) => state.sidebar.isSidebar);

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div
      className={`px-4 ${
        isDark ? "bg-[#242424] text-white" : "bg-white text-black"
      }`}
    >
      <Header />
      <div className={`min-h-screen  md:flex`}>
        {isSidebar && (
          <div className="">
            <Sidebar />
          </div>
        )}
        <div className="flex-1">
          <div className="max-w-6xl mx-auto p-6">
            <main>
              {/* <TaskInput /> */}
              <TaskList />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
