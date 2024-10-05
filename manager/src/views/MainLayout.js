import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./layout/Navigation";
import Sidebar from "./layout/Sidebar";

const MainLayout = () => {
  useEffect(() => {
    const managerData = JSON.parse(localStorage.getItem("manager"));
    if (managerData && managerData.preference.mode === "dark") {
      document.body.classList.add("dark");
    }
  }, []);

  return (
    <>
      <Navigation />
      <div className="flex  min-h-[95vh]">
        <div className="bg-[#ccc] w-[10%] dark:bg-gray-500">
          <Sidebar />
        </div>
        <div className="ml-15 w-[90%] dark:bg-gray-800 text-gray-800 dark:text-gray-300 p-8">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
