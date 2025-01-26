import React, { useContext } from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { authContext } from "../../../Contexts/AuthContext/AuthContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/CustomHooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageParcelModal = ({ isOpen, setIsOpen, _id }) => {
  const axiosSecure = useAxiosSecure()
  const {
    data: allUsers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/users')
      return data;
    },
  });


  const getAllDeliveryMens = () => {
    const deliveryMens =
      allUsers.length > 0 &&
      allUsers.filter((user) => user?.role === "deliveryman");

    return deliveryMens;
  };

  const handleAssignDeliveryMan = async (e, _id) => {
    e.preventDefault()
    const form = e.target

    const deliveryMan = form.deliveryman.value
    const apprDelDate = form.apprDelDate.value


    const res = await axiosSecure.patch(`${import.meta.env.VITE_MAIN_URL}/setdeliveryman/${_id}`, { deliveryMan, apprDelDate })
    console.log(res.data)
    if (res.data.modifiedCount) {
      Swal.fire({
        position: "center center",
        icon: "success",
        title: "Parcel Successfully Assigned",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: `Parcel is not assigned`,
      })
    }
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => setIsOpen(false)}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 shadow-lg"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium">
                Manage Parcel
              </DialogTitle>

              <form onSubmit={(e) => handleAssignDeliveryMan(e, _id)}>
                <div className="mb-3">
                  <select
                    name="deliveryman"
                    className="select select-bordered w-full"
                  >
                    {getAllDeliveryMens().length > 0 &&
                      getAllDeliveryMens().map((deliveryMan, index) => {
                        return (
                          <option key={index} value={deliveryMan._id}>
                            {deliveryMan.name}
                          </option>
                        );
                      })}
                  </select>
                </div>

                <div>
                  <input name="apprDelDate" type="date" className="input input-bordered w-full" />
                </div>

                <div>
                  <input type="submit"
                    className="btn bg-purple-600 w-full mt-3 text-white"
                    value={"Assign"}
                  />
                </div>
              </form>

              <div className="mt-4">
                <Button
                  className="btn w-full bg-black text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Close Modal
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ManageParcelModal;
