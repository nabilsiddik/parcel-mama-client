import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import deliveryBoy from "../../assets/delivery-boy.png"
import LoginCard from "@/Components/LoginCard/LoginCard";
import RegistrationCard from "@/Components/RegistrationCard/RegistrationCard";
import { Outlet } from "react-router-dom";

const AuthenticationPage = () => {
  return (
    <div className="bg-gray-100 pt-[180px] pb-[100px] flex justify-center">
      <div className="flex w-full max-w-5xl shadow-lg bg-white rounded-md overflow-hidden">
        <div className="w-1/2 bg-[#fc0] text-white p-8 justify-center items-center hidden md:flex">
          <img src={deliveryBoy} alt="" />
        </div>
        <div className="md:w-1/2 w-full p-8">
          <Card className='py-5'>
            <Outlet/>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;
