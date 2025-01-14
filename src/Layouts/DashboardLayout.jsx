import React from "react";
import SideMenu from "./sideMenu";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex gap-20">
      <div className="bg-purple-600 min-h-screen w-3/12 xl:w-2/12">
        <SideMenu />
      </div>
      <div className="w-full">
        <Outlet/>
      </div>
    </div>
  );
};

export default DashboardLayout;
