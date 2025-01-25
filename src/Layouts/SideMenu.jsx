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
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_MAIN_URL}/user/${user?.email}`
      );

      return data;
    },
  });

  return (
    <div className="p-4">
      {currentUser?.role === "user" && (
        <ul className="flex flex-col gap-4">
          <NavLink className={"font-bold text-black"} to={"book-parcel"}>
            Book Parcel
          </NavLink>
          <NavLink className={"font-bold text-black"} to={"my-parcels"}>
            My Parcels
          </NavLink>
          <NavLink className={"font-bold text-black"} to={"my-profile"}>
            My Profile
          </NavLink>
        </ul>
      )}

      {currentUser?.role === "admin" && (
        <ul className="flex flex-col gap-4">
          <NavLink className={"font-bold text-black"} to={"statistics"}>
            Statistics
          </NavLink>
          <NavLink className={"font-bold text-black"} to={"all-parcels"}>
            All Parcels
          </NavLink>
          <NavLink className={"font-bold text-black"} to={"all-delivery-man"}>
            All Delevery Men
          </NavLink>
          <NavLink className={"font-bold text-black"} to={"all-users"}>
            All Users
          </NavLink>
        </ul>
      )}

      {currentUser?.role === "deliveryman" && (
        <ul className="flex flex-col gap-4">
          <NavLink className={"font-bold text-black"} to={"my-delivery-list"}>
            My Delivery List
          </NavLink>
          <NavLink className={"font-bold text-black"} to={"my-reviews"}>
            My Reviews
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default SideMenu;
