import React, { useContext } from "react";
import { authContext } from "../../../Contexts/AuthContext/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyParcels = () => {
  const { user } = useContext(authContext);

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
  });

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
    }).then(async(result) => {
      if (result.isConfirmed) {

        const res = await axios.patch(`${import.meta.env.VITE_MAIN_URL}/cancle-parcel/${_id}`)

        swalWithBootstrapButtons.fire({
          title: "Cancled!",
          text: "Your Parcel Is Cancled.",
          icon: "error"
        });
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

  if(isLoading){
    return <h1>Loading ...</h1>
  }

  return (
    <div>
      <h1>My Parcels</h1>
      <div>
        <div className="overflow-x-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {parcels && parcels.length > 0 && parcels.map((parcel) => {
              const {
                _id,
                phoneNumber,
                parcelType,
                parcelWeight,
                receiverName,
                receiverPhoneNumber,
                deliveryAddress,
                deliveryDate,
                latitude,
                longitude,
                bookingDate,
                status,
                apprDeliDate,
                deliveryManId,
              } = parcel;
              return (
                <div key={_id} className="shadow-lg border p-5">
                  <p>
                    <b>Parcel Type: </b> {parcelType && parcelType}
                  </p>
                  <p>
                    <b>Delivery Address: </b> {deliveryAddress && deliveryAddress}
                  </p>
                  <p>
                    <b>Requested Delivery Date: </b>{" "}
                    {deliveryDate && deliveryDate}
                  </p>
                  <p>
                    <b>Approximate Delivery Date: </b>
                    {apprDeliDate && apprDeliDate}
                  </p>
                  <p>
                    <b>Booking Date: </b>
                    {bookingDate && bookingDate}
                  </p>
                  <p>
                    <b>Delivery Men ID: </b> {deliveryManId && deliveryManId}
                  </p>
                  <p>
                    <b>Booking Status: </b> {status && status}
                  </p>
                  <p>
                    <b>Booking Type: </b>
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <Link to={`/dashboard/update-parcel/${_id}`}>
                      <button className="btn bg-success" disabled={status === 'pending'? false : true}>Update</button>
                    </Link>
                    <button onClick={() => handleCancleParcel(_id)} className="btn bg-primary" disabled={status === 'pending'? false : true}>Cancle</button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <button className="btn bg-success">Review</button>
                    <button className="btn bg-primary">Pay</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyParcels;
