import React from "react";
import Navigation from "../layout/Navigation";
import Sidebar from "../layout/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
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
