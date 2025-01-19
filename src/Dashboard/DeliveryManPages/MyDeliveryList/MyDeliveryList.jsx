import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../../../Contexts/AuthContext/AuthContext";
import Swal from "sweetalert2";

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
    }).then(async(result) => {
      
      if (result.isConfirmed) {

        const res = await axios.patch(`${import.meta.env.VITE_MAIN_URL}/cancle-parcel/${_id}`)

        if(res.data.modifiedCount > 0){
          refetch()
          swalWithBootstrapButtons.fire({
            title: "Cancled!",
            text: "Parcel Cancled.",
            icon: "error"
          });
        }else{
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
    }).then(async(result) => {
      if (result.isConfirmed) {

        const res = await axios.patch(`${import.meta.env.VITE_MAIN_URL}/delivered-parcel/${_id}`)

        const { parcelResult, deliveryManResult } = res.data

        if(parcelResult?.modifiedCount > 0 &&
          deliveryManResult?.modifiedCount > 0){

          refetch()
          swalWithBootstrapButtons.fire({
            title: "Delivered!",
            text: "Parcel Delivered.",
            icon: "success"
          });
        }else{
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
    <div>
      <h2>My Delivery List</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {deliveryList?.length > 0 &&
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
              deliveryDate,
              latitude,
              longitude,
              price,
              status,
              apprDeliDate,
              bookingDate,
              deliveryManId,
            } = deliveredParcel;

            return (
              <div key={deliveredParcel._id} className="shadow-lg border p-5">
                <h3>
                  <b>Booked User’s Name: </b>
                  {name && name}
                </h3>
                <p>
                  <b>Reveivers Name:</b> {receiverName && receiverName}
                </p>
                <p>
                  <b>Booked Users Number:</b> {phoneNumber && phoneNumber}
                </p>
                <p>
                  <b>Requested Delivery Date:</b> {deliveryDate && deliveryDate}
                </p>
                <p>
                  <b>Approximate Delivery Date:</b>{" "}
                  {apprDeliDate && apprDeliDate}
                </p>
                <p>
                  <b>Receivers phone number:</b>{" "}
                  {receiverPhoneNumber && receiverPhoneNumber}
                </p>
                <p>
                  <b>Receivers Address:</b> {deliveryAddress && deliveryAddress}
                </p>

                <button className="btn mt-3 bg-purple-600 text-white">
                  View Location
                </button>
                <div className="flex items-center justify-between">
                  <button disabled={status === 'cancled' || status === 'delivered' ? true : false} onClick={() => cancleDelivery(_id)} className="btn mt-3 bg-purple-600 text-white">
                    Cancle
                  </button>
                  <button disabled={status === 'cancled' || status === 'delivered' ? true : false} onClick={() => handleDelivered(_id)} className="btn mt-3 bg-purple-600 text-white">
                    Deliver
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MyDeliveryList;
