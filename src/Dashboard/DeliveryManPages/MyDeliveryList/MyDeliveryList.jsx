import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../../../Contexts/AuthContext/AuthContext";
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


const MyDeliveryList = () => {
  const { user } = useContext(authContext);
  const [deliveryManId, setDeliveryManId] = useState(null);


  useEffect(() => {
    const fetchDeliveryManId = async () => {
      if (user?.email) {
        let res = await axios.get(
          `${import.meta.env.VITE_MAIN_URL}/deliveryManId/${user?.email}`
        );
        setDeliveryManId(res.data);
      }
    };

    fetchDeliveryManId();
  }, [user?.email]);


  const { data: deliveryList = [], isLoading, refetch } = useQuery(
    ["delivery", deliveryManId],
    async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_MAIN_URL}/deliverylist/${deliveryManId}`
      );
      return data;
    },
    {
      enabled: !!deliveryManId,
    }
  );



  const cancleDelivery = (_id) => {
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

        if (res.data.modifiedCount > 0) {
          refetch()
          swalWithBootstrapButtons.fire({
            title: "Cancled!",
            text: "Parcel Cancled.",
            icon: "error"
          });
        } else {
          swalWithBootstrapButtons.fire({
            title: "Error",
            text: "Error while canclation",
            icon: "error"
          });
        }


      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Not Cancled",
          text: "Parcel Not Cancled",
          icon: "success"
        });
      }
    });
  }



  const handleDelivered = (_id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You want to deliver the parcel?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delever It!",
      cancelButtonText: "Cancle",
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {

        const res = await axios.patch(`${import.meta.env.VITE_MAIN_URL}/delivered-parcel/${_id}`)

        const { parcelResult, deliveryManResult } = res.data

        if (parcelResult?.modifiedCount > 0 &&
          deliveryManResult?.modifiedCount > 0) {

          refetch()
          swalWithBootstrapButtons.fire({
            title: "Delivered!",
            text: "Parcel Delivered.",
            icon: "success"
          });
        } else {
          swalWithBootstrapButtons.fire({
            title: "Error",
            text: "Error while deliver",
            icon: "error"
          });
        }


      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancled",
          text: "Parcel Not delivered",
          icon: "error"
        });
      }
    });
  }



  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div className="py-8">
      <h3 className="mb-5 ">My Delivery List</h3>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booked By</TableHead>
              <TableHead>Reveiver</TableHead>
              <TableHead>Booked Users Number</TableHead>
              <TableHead>Requested Date</TableHead>
              <TableHead>Approximate Date</TableHead>
              <TableHead>Receivers phone</TableHead>
              <TableHead>Receivers Address</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {deliveryList &&
              deliveryList.map((deliveredParcel) => {
                const {
                  _id,
                  ObjectId,
                  customer: { name },
                  phoneNumber,
                  parcelType,
                  parcelWeight,
                  receiverName,
                  receiverPhoneNumber,
                  deliveryAddress,
                  reqDeliveryDate,
                  latitude,
                  longitude,
                  price,
                  status,
                  apprDeliDate,
                  bookingDate,
                  deliveryManId,
                } = deliveredParcel;
                return (
                  <TableRow>
                    <TableCell>{name && name}</TableCell>
                    <TableCell>{receiverName && receiverName}</TableCell>
                    <TableCell>{phoneNumber && phoneNumber}</TableCell>
                    <TableCell>{reqDeliveryDate && reqDeliveryDate}</TableCell>
                    <TableCell>{apprDeliDate && apprDeliDate}</TableCell>
                    <TableCell>{receiverPhoneNumber && receiverPhoneNumber}</TableCell>
                    <TableCell>{deliveryAddress && deliveryAddress}</TableCell>
                    <TableCell>
                      <div>
                        
                      <div className="flex items-center justify-between gap-3">
                          <Button onClick={() => cancleDelivery(_id)} disabled={status === 'cancled' || status === 'delivered' ? true : false}>Cancel</Button>
                          <Button onClick={() => handleDelivered(_id)} disabled={status === 'cancled' || status === 'delivered' ? true : false}>Delvere</Button>
                        </div>
                        <div className="mt-2">
                          <Button className='w-full' onClick={() => handleOpenModal(_id)}>View Location</Button>
                        </div>
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

export default MyDeliveryList;
