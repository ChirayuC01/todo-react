import React, { useState } from "react";
import menuIcon from "../assets/menu.svg";
import logo from "../assets/logo.svg";
import search from "../assets/search.svg";
import gridView from "../assets/gridView.svg";
import listView from "../assets/listView.svg";
import lightModeIcon from "../assets/lightMode.svg";
import darkModeIcon from "../assets/darkMode.svg";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/slices/themeSlice";
import { toggleView } from "../redux/slices/viewSlice";
import { toggleSidebar } from "../redux/slices/sidebarSlice";

const Header = () => {
  const dispatch = useDispatch();

  const isList = useSelector((state) => state.view.isList);
  const isDark = useSelector((state) => state.theme.isDark);

  return (
    <div className="flex justify-between items-center py-3">
      <div className="flex gap-6">
        <img
          src={menuIcon}
          className={`h-6 w-6 cursor-pointer ${isDark && "invert"} mt-1`}
          alt="Menu"
          onClick={() => dispatch(toggleSidebar())}
        />
        <img src={logo} className="" alt="Logo" />
      </div>
      <div className="flex gap-6">
        <img
          src={search}
          className={`h-6 w-6 ${isDark && "invert"}`}
          alt="Search"
        />
        <img
          src={isList ? gridView : listView}
          className={`${!isDark && "invert"} h-6 w-6 cursor-pointer`}
          alt="Grid View"
          onClick={() => dispatch(toggleView())}
        />
        <img
          src={!isDark ? darkModeIcon : lightModeIcon}
          className={`h-6 w-6 cursor-pointer ${!isDark && "invert"}`}
          alt={!isDark ? "Light Mode" : "Dark Mode"}
          onClick={() => dispatch(toggleTheme())}
        />
      </div>
    </div>
  );
};

export default Header;
