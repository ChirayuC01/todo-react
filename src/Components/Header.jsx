import React, { useState } from "react";
import menuIcon from "../assets/menu.svg";
import logo from "../assets/logo.svg";
import search from "../assets/search.svg";
import gridView from "../assets/gridView.svg";
import listView from "../assets/listView.svg";
import lightModeIcon from "../assets/lightMode.svg";
import darkModeIcon from "../assets/darkMode.svg";

const Header = () => {
  const [grid, setGrid] = useState(true);
  const [light, setLight] = useState(true);

  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    setLight(false); // Update state to reflect dark mode
  };

  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    setLight(true); // Update state to reflect light mode
  };

  const toggleTheme = () => {
    if (light) {
      setDarkMode();
    } else {
      setLightMode();
    }
  };

  const toggleView = () => {
    setGrid((prev) => !prev);
  };

  return (
    <div className="flex justify-between items-center py-3">
      <div className="flex gap-6">
        <img
          src={menuIcon}
          className={`h-6 w-6 ${!light && "invert"} mt-1`}
          alt="Menu"
        />
        <img src={logo} className="" alt="Logo" />
      </div>
      <div className="flex gap-6">
        <img
          src={search}
          className={`h-6 w-6 ${!light && "invert"}`}
          alt="Search"
        />
        <img
          src={grid ? gridView : listView}
          className={`${light && "invert"} h-6 w-6 cursor-pointer`}
          alt="Grid View"
          onClick={toggleView}
        />
        <img
          src={light ? darkModeIcon : lightModeIcon}
          className={`h-6 w-6 cursor-pointer ${light && "invert"}`}
          alt={light ? "Light Mode" : "Dark Mode"}
          onClick={toggleTheme} // Call toggleTheme on click
        />
      </div>
    </div>
  );
};

export default Header;
