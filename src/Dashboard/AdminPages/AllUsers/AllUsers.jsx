import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import Swal from "sweetalert2";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/Components/ui/button";
import { authContext } from "@/Contexts/AuthContext/AuthContext";
import useAxiosSecure from "@/CustomHooks/useAxiosSecure";

const AllUsers = () => {

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


  const handleMakeAdmin = (_id) => {
    console.log(_id)
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You want to make him/her Admin",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Make admin request to database
        const res = await axiosSecure.patch(`/make-admin/${_id}`)

        console.log(res.data)
        if (res.data.modifiedCount > 0) {
          swalWithBootstrapButtons.fire({
            title: "Admin Done!",
            text: "You made him/her admin",
            icon: "success"
          });
        }else{
          swalWithBootstrapButtons.fire({
            title: "Something Wrong",
            text: "Something wrong or user is already admin",
            icon: "error"
          });
        }

        refetch()
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Alright",
          text: "User Role is the Same as Before",
          icon: "error"
        });
      }
    });
  }

  const handleMakeDeliveryMan = (_id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You want to make him/her Delivery Man?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Make admin request to database
        const res = await axiosSecure.patch(`/make-deliveryman/${_id}`)
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
          swalWithBootstrapButtons.fire({
            title: "Delivery Man Done!",
            text: "You made him/her Delivery Man",
            icon: "success"
          });
        }else{
          swalWithBootstrapButtons.fire({
            title: "Something Wrong",
            text: "Something wrong or user is already deliveryman",
            icon: "error"
          });
        }

        refetch()
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Alright",
          text: "User Role is the Same as Before",
          icon: "error"
        });
      }
    });
  }

  return (
    <div className="py-8">
      <h3 className="mb-3">All Users</h3>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Parcels Booked</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {allUsers &&
              allUsers.map((user) => {
                const { _id, name, email, image, role, timeStamp, phone, totalSpent, bookedParcel } = user;
                return (
                  <TableRow key={user._id}>
                    <TableCell>{name && name}</TableCell>
                    <TableCell>{phone && phone}</TableCell>
                    <TableCell>{bookedParcel && bookedParcel}</TableCell>
                    <TableCell>BDT {totalSpent && totalSpent}</TableCell>
                    <TableCell>
                      <Button disabled={role === 'admin' ? true : false} onClick={() => handleMakeAdmin(_id)}>Make Admin</Button>
                    </TableCell>
                    <TableCell>
                      <Button disabled={role === 'deliveryman' ? true : false} onClick={() => handleMakeDeliveryMan(_id)}>Make Delivery Man</Button>
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllUsers;
