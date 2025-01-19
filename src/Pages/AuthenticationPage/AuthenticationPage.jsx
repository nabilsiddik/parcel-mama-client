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

const AuthenticationPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="flex w-full max-w-5xl shadow-lg bg-white rounded-md overflow-hidden">
        <div className="w-1/2 bg-[#fc0] text-white p-8 flex flex-col justify-between">
          <img src={deliveryBoy} alt="" />
        </div>
        <div className="w-1/2 p-8">
          <div className="flex justify-end">
          </div>
          <Card className='py-5'>
            <LoginCard/>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;
