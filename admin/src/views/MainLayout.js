import React, { useEffect } from "react";
import Navigation from "../layout/Navigation";
import Sidebar from "../layout/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem("admin"));
    if (adminData && adminData.preference.mode === "dark") {
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
