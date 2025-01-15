import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const AllParcels = () => {
  const {
    data: allParcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_MAIN_URL}/parcels`
      );

      return data;
    },
  });

  //   const handleCancleParcel = (_id) => {
  //     const swalWithBootstrapButtons = Swal.mixin({
  //       customClass: {
  //         confirmButton: "btn btn-success",
  //         cancelButton: "btn btn-danger",
  //       },
  //       buttonsStyling: false,
  //     });
  //     swalWithBootstrapButtons
  //       .fire({
  //         title: "Are you sure?",
  //         text: "You want to cancle the parcel?",
  //         icon: "warning",
  //         showCancelButton: true,
  //         confirmButtonText: "Yes, Cancle It!",
  //         cancelButtonText: "No Not Cancle!",
  //         reverseButtons: true,
  //       })
  //       .then(async (result) => {
  //         if (result.isConfirmed) {
  //           const res = await axios.patch(
  //             `${import.meta.env.VITE_MAIN_URL}/cancle-parcel/${_id}`
  //           );

  //           swalWithBootstrapButtons.fire({
  //             title: "Cancled!",
  //             text: "Your Parcel Is Cancled.",
  //             icon: "error",
  //           });

  //           refetch();
  //         } else if (result.dismiss === Swal.DismissReason.cancel) {
  //           swalWithBootstrapButtons.fire({
  //             title: "Thanks",
  //             text: "Your Parcel is safe",
  //             icon: "success",
  //           });
  //         }
  //       });
  //   };

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div>
      <h1>My Parcels</h1>
      <div>
        <div className="overflow-x-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {allParcels &&
              allParcels.map((parcel) => {
                const {
                  _id,
                  price,
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
                  customer: {name, email}
                } = parcel;
                return (
                  <div key={_id} className="shadow-lg border p-5">
                    <p>
                      <b>User Name: </b>
                      {name && name}
                    </p>
                    <p>
                      <b>Phone Number: </b>
                      {phoneNumber && phoneNumber}
                    </p>
                    <p>
                      <b>Cost: </b>
                      ${price && price}
                    </p>
                    <p>
                      <b>Requested Delivery Date: </b>{" "}
                      {deliveryDate && deliveryDate}
                    </p>
                    <p>
                      <b>Booking Date: </b>
                      {bookingDate && bookingDate}
                    </p>
                    <p>
                      <b>Booking Status: </b> {status && status}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <Link to={`/dashboard/update-parcel/${_id}`}>
                        <button
                          className="btn bg-success"
                          disabled={status === "pending" ? false : true}
                        >
                          Update
                        </button>
                      </Link>
                      <button
                        onClick={() => handleCancleParcel(_id)}
                        className="btn bg-primary"
                        disabled={status === "pending" ? false : true}
                      >
                        Cancle
                      </button>
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

export default AllParcels;
