import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { authContext } from "../Contexts/AuthContext/AuthContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { SiStatista } from "react-icons/si";
import { FaBox, FaRegUserCircle, FaUser } from "react-icons/fa";
import { MdAllInbox, MdDeliveryDining } from "react-icons/md";
import { VscFeedback } from "react-icons/vsc";
import { TbTruckDelivery } from "react-icons/tb";
import { IoAddCircleOutline } from "react-icons/io5";


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
        <ul className="flex flex-col gap-6">
          <NavLink className={"font-bold text-black"} to={"book-parcel"}>
            <span className='flex items-center gap-3'><IoAddCircleOutline className="text-2xl" /> Book Parcel</span>
          </NavLink>
          <NavLink className={"font-bold text-black"} to={"my-parcels"}>
            <span className='flex items-center gap-3'><MdAllInbox className="text-2xl" /> My Parcels</span>
          </NavLink>
          <NavLink className={"font-bold text-black"} to={"my-profile"}>
            <span className='flex items-center gap-3'><FaRegUserCircle className="text-2xl" /> My Profile</span>
          </NavLink>
        </ul>
      )}

      {currentUser?.role === "admin" && (
        <ul className="flex flex-col gap-6">
          <NavLink className={"font-bold text-black"} to={"statistics"}>
            <span className='flex items-center gap-3'><SiStatista className="text-2xl" /> Statistics</span>
          </NavLink>
          <NavLink className={"font-bold text-black"} to={"all-parcels"}>
            <span className='flex items-center gap-3'><FaBox className="text-2xl" />
              Parcels</span>
          </NavLink>
          <NavLink className={"font-bold text-black"} to={"all-delivery-man"}>
            <span className='flex items-center gap-3'><MdDeliveryDining className="text-2xl" />
              Delivery Mens</span>
          </NavLink>
          <NavLink className={"font-bold text-black"} to={"all-users"}>
            <span className='flex items-center gap-3'><FaUser v /> Users</span>
          </NavLink>
          <NavLink className={"font-bold text-black"} to={"my-profile"}>
            <span className='flex items-center gap-3'><FaRegUserCircle className="text-2xl" /> My Profile</span>
          </NavLink>
        </ul>
      )}

      {currentUser?.role === "deliveryman" && (
        <ul className="flex flex-col gap-6">
          <NavLink className={"font-bold text-black"} to={"my-delivery-list"}>
            <span className='flex items-center gap-3'><TbTruckDelivery className="text-2xl" />
              My Delivery List</span>
          </NavLink>
          <NavLink className={"font-bold text-black"} to={"my-reviews"}>
            <span className='flex items-center gap-3'><VscFeedback className="text-2xl" />
              My Reviews</span>
          </NavLink>
          <NavLink className={"font-bold text-black"} to={"my-profile"}>
            <span className='flex items-center gap-3'><FaRegUserCircle className="text-2xl" /> My Profile</span>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default SideMenu;
