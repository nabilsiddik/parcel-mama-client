import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../../../Contexts/AuthContext/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
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
import ReviewModal from "@/Modals/ReviewModal/ReviewModal";


const MyParcels = () => {
  const { user } = useContext(authContext);
  const [isOpen, setIsOpen] = useState(false)
  const [parcelId, setParcelId] = useState(null)

  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["parcel", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_MAIN_URL}/my-parcels/${user?.email}`
      );

      return data;
    },
  })


  const handleCancleParcel = (_id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You want to cancle the parcel?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancle It!",
      cancelButtonText: "No Not Cancle!",
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {

        const res = await axios.patch(`${import.meta.env.VITE_MAIN_URL}/cancle-parcel/${_id}`)

        swalWithBootstrapButtons.fire({
          title: "Cancled!",
          text: "Your Parcel Is Cancled.",
          icon: "error"
        });

        refetch()
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Thanks",
          text: "Your Parcel is safe",
          icon: "success"
        });
      }
    });
  }


  // Give Review to Deliveryman after successfully delivered the parcel
  const handleReview = (_id) => {
    setParcelId(_id)
    setIsOpen(true)
  }
  

  if (isLoading) {
    return <h1>Loading ...</h1>
  }

  return (
    <div>
      <h3 className="py-8">My Parcels</h3>
      <ReviewModal isOpen={isOpen} setIsOpen={setIsOpen} parcelId = {parcelId}/>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Parcel Type</TableHead>
              <TableHead>Delivery Address</TableHead>
              <TableHead>Requested Date</TableHead>
              <TableHead>Approximate Date</TableHead>
              <TableHead>Booking Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {parcels &&
              parcels.map((parcel) => {
                const {
                  _id,
                  parcelType,
                  deliveryAddress,
                  deliveryDate,
                  bookingDate,
                  status,
                  apprDeliDate
                } = parcel;
                return (
                  <TableRow key={_id}>
                    <TableCell>{parcelType && parcelType}</TableCell>
                    <TableCell>{deliveryAddress && deliveryAddress}</TableCell>
                    <TableCell>{deliveryDate && deliveryDate}</TableCell>
                    <TableCell>{apprDeliDate && apprDeliDate}</TableCell>
                    <TableCell>{bookingDate && bookingDate}</TableCell>
                    <TableCell>{status && status}</TableCell>
                    <TableCell>{parcelType && parcelType}</TableCell>
                    <TableCell>
                      <div className="flex gap-2 mb-3">
                        <Link to={status === 'pending' ? `/dashboard/update-parcel/${_id}` : ''}>
                          <Button disabled={status === 'pending' ? false : true}>Update</Button>
                        </Link>

                        <Button disabled={status === 'pending'? false : true} onClick={() => handleCancleParcel(_id)}>Cancle</Button>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick = {() => handleReview(_id)}>Review</Button>
                        <Link to={`/dashboard/checkout/${_id}`}>
                          <Button>Pay</Button>
                        </Link>
                      </div>
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

export default MyParcels;
