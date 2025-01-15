import React from "react";
import { NavLink } from "react-router-dom";

const SideMenu = () => {
  return (
    <div className="p-4">
      <ul className="flex flex-col gap-2">
        <NavLink className={'font-bold text-white'} to={"/dashboard"}>Home</NavLink>
        <NavLink className={'font-bold text-white'} to={"book-parcel"}>Book Parcel</NavLink>
        <NavLink className={'font-bold text-white'} to={"my-parcels"}>My Parcels</NavLink>
      </ul>
    </div>
  );
};

export default SideMenu;
