import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { authContext } from "../Contexts/AuthContext/AuthContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const SideMenu = () => {
  const { user } = useContext(authContext);

  const {
    data: currentUser = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["parcel", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_MAIN_URL}/user/${user?.email}`
      );

      return data;
    },
  });

  return (
    <div className="p-4">
      {currentUser?.role === "user" ? (
        <ul className="flex flex-col gap-2">
          <NavLink className={"font-bold text-white"} to={"/dashboard"}>
            Home
          </NavLink>
          <NavLink className={"font-bold text-white"} to={"book-parcel"}>
            Book Parcel
          </NavLink>
          <NavLink className={"font-bold text-white"} to={"my-parcels"}>
            My Parcels
          </NavLink>
          <NavLink className={"font-bold text-white"} to={"my-profile"}>
            My Profile
          </NavLink>
        </ul>
      ) : (
        <ul className="flex flex-col gap-2">
          <NavLink className={"font-bold text-white"} to={"statistics"}>
            Statistics
          </NavLink>
          <NavLink className={"font-bold text-white"} to={"all-parcels"}>
            All Parcels
          </NavLink>
          <NavLink className={"font-bold text-white"} to={"all-delivery-men"}>
            All Delevery Men
          </NavLink>
          <NavLink className={"font-bold text-white"} to={"all-users"}>
            All Users
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default SideMenu;
