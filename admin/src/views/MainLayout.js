import React from "react";
import Navigation from "../layout/Navigation";
import Sidebar from "../layout/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Navigation />
      <div className="flex">
        <Sidebar />
        <div className="ml-5 w-[100%]">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
