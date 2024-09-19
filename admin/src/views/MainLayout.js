import React, { useEffect } from "react";
import Navigation from "../layout/Navigation";
import Sidebar from "../layout/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const MainLayout = () => {
  // const { user } = useSelector((state) => state.auth);
  // useEffect(() => {
  //   console.log(user);
  //   document.querySelector("html").classList.remove("dark");
  //   if (user.preference === "dark") {
  //     document.querySelector("html").classList.add("dark");
  //   } else if (user.preference === "light") {
  //     document.querySelector("html").classList.remove("dark");
  //   }
  // }, []);
  useEffect(() => {
    // Retrieve the current admin object from localStorage
    const adminData = JSON.parse(localStorage.getItem("admin"));
    console.log("admin data", adminData);

    // Check if adminData exists and apply dark mode if necessary
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
