import { useState } from "react";
import Header from "./Components/Header";
import Todo from "./Components/Todo";

function App() {
  return (
    <div className="px-12 bg-darkMode text-darkMode">
      <Header />
      <Todo />
    </div>
  );
}

export default App;
