import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateParcel = () => {
  const { id } = useParams();

  const {
    data: parcel = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["parcel"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_MAIN_URL}/parcel/${id}`
      );

      return data;
    },
  });

  const handleUpdateParcel = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedParcel = {
      phoneNumber: form.phoneNumber.value,
      parcelType: form.parcelType.value,
      parcelWeight: parseInt(form.parcelWeight.value),
      receiverName: form.receiverName.value,
      receiverPhoneNumber: form.receiverPhoneNumber.value,
      deliveryAddress: form.deliveryAddress.value,
      reqDeliveryDate: form.reqDeliveryDate.value,
      latitude: form.latitude.value,
      longitude: form.longitude.value,
    };

    console.log(updatedParcel)

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_MAIN_URL}/parcel/${id}`,
        updatedParcel
      );
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "center center",
          icon: "success",
          title: "Parcel Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        })
        refetch()
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: `${error.code}. ${error.message}`,
      })
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="py-8">
      <h2 className="mb-5 text-center">Update Parcel</h2>
      <form onSubmit={handleUpdateParcel} className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto">
        <div className="input-group mb-3">
          <label className="label">Phone Number</label>
          <input
            name="phoneNumber"
            type="tel"
            defaultValue={parcel.phoneNumber}
            placeholder="Phone Number"
            className="input input-bordered w-full"
          />
        </div>

        <div className="input-group mb-3">
          <label className="label">Parcel Type</label>
          <input
            name="parcelType"
            type="text"
            defaultValue={parcel.parcelType}
            placeholder="Parcel Type"
            className="input input-bordered w-full"
          />
        </div>

        <div className="input-group mb-3">
          <label className="label">Parcel Weight</label>
          <input
            name="parcelWeight"
            type="number"
            defaultValue={parcel.parcelWeight}
            placeholder="Parcel Weight"
            className="input input-bordered w-full"
          />
        </div>

        <div className="input-group mb-3">
          <label className="label">Receiver's Name</label>
          <input
            name="receiverName"
            type="text"
            defaultValue={parcel.receiverName}
            placeholder="Receiver's Name"
            className="input input-bordered w-full"
          />
        </div>

        <div className="input-group mb-3">
          <label className="label">Receiver's Phone Number</label>
          <input
            name="receiverPhoneNumber"
            type="tel"
            defaultValue={parcel.receiverPhoneNumber}
            placeholder="Receiver's Phone Number"
            className="input input-bordered w-full"
          />
        </div>

        <div className="input-group mb-3">
          <label className="label">Parcel Delivery Address</label>
          <input
            name="deliveryAddress"
            type="text"
            defaultValue={parcel.deliveryAddress}
            placeholder="Delivery Address"
            className="input input-bordered w-full"
          />
        </div>

        <div className="input-group mb-3">
          <label className="label">Requested Delivery Date</label>
          <input
            name="reqDeliveryDate"
            type="date"
            defaultValue={parcel.deliveryDate?.split("T")[0]}
            className="input input-bordered w-full"
          />
        </div>

        <div className="input-group mb-3">
          <label className="label">Delivery Address Latitude</label>
          <input
            name="latitude"
            type="number"
            step="any"
            defaultValue={parcel.latitude}
            placeholder="e.g., 21.121365496"
            className="input input-bordered w-full"
          />
        </div>

        <div className="input-group mb-3">
          <label className="label">Delivery Address Longitude</label>
          <input
            name="longitude"
            type="number"
            step="any"
            defaultValue={parcel.longitude}
            placeholder="e.g., 21.121365496"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <input
            className="btn w-full bg-purple-600 text-white font-bold"
            type="submit"
            value="Update Parcel"
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateParcel;
