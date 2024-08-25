import React, { useEffect } from "react";
import Navigation from "../layout/Navigation";
import Sidebar from "../layout/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const MainLayout = () => {
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    console.log(user);
    document.querySelector("html").classList.remove("dark");
    if (user.preference === "dark") {
      document.querySelector("html").classList.add("dark");
    } else if (user.preference === "light") {
      document.querySelector("html").classList.remove("dark");
    }
  }, []);
  return (
    <>
      <Navigation />
      <div className="flex  min-h-[95vh]">
        <div className="bg-[#ccc] w-[10%]">
          <Sidebar />
        </div>
        <div className="ml-15 w-[85%] ">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
