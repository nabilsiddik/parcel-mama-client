import axios from "axios";
import React, { useContext } from "react";
import { authContext } from "../../../Contexts/AuthContext/AuthContext";
import Swal from "sweetalert2";

const BookParcel = () => {
  const { user } = useContext(authContext);

  const handleAddPlant = async (e) => {
    e.preventDefault();
    const form = e.target;

    const phoneNumber = form.phoneNumber.value;
    const parcelType = form.parcelType.value;
    const parcelWeight = parseInt(form.parcelWeight.value);
    const receiverName = form.receiverName.value;
    const receiverPhoneNumber = form.receiverPhoneNumber.value;
    const deliveryAddress = form.deliveryAddress.value;
    const deliveryDate = form.deliveryDate.value;
    const latitude = form.latitude.value;
    const longitude = form.longitude.value;

    const parcel = {
      customer: {
        name: user?.displayName,
        email: user?.email,
      },
      phoneNumber,
      parcelType,
      parcelWeight,
      receiverName,
      receiverPhoneNumber,
      deliveryAddress,
      deliveryDate,
      latitude,
      longitude,
    };

    try {
      // Send parcel to database
      const res = await axios.post(
        `${import.meta.env.VITE_MAIN_URL}/parcel`,
        parcel
      );

      if (res.data.insertedId) {
        Swal.fire({
          position: "center center",
          icon: "success",
          title: "Parcel Booked Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
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

  return (
    <div>
      <h1>Book Parcel</h1>

      <form onSubmit={handleAddPlant} className="w-11/12 md:w-8/12 lg:w-6/12">
        <div className="input-group mb-3">
          <label className="label">Phone Number</label>
          <input
            name="phoneNumber"
            type="tel"
            placeholder="Phone Number"
            className="input input-bordered w-full"
          />
        </div>

        <div className="input-group mb-3">
          <label className="label">Parcel Type</label>
          <input
            name="parcelType"
            type="text"
            placeholder="Parcel Type"
            className="input input-bordered w-full"
          />
        </div>

        <div className="input-group mb-3">
          <label className="label">Parcel Weight</label>
          <input
            name="parcelWeight"
            type="number"
            placeholder="Parcel Weight"
            className="input input-bordered w-full"
          />
        </div>

        <div className="input-group mb-3">
          <label className="label">Receiver's Name</label>
          <input
            name="receiverName"
            type="text"
            placeholder="Receiver's Name"
            className="input input-bordered w-full"
          />
        </div>

        <div className="input-group mb-3">
          <label className="label">Receiver's Phone Number</label>
          <input
            name="receiverPhoneNumber"
            type="tel"
            placeholder="Receiver's Phone Number"
            className="input input-bordered w-full"
          />
        </div>

        <div className="input-group mb-3">
          <label className="label">Parcel Delivery Address</label>
          <input
            name="deliveryAddress"
            type="text"
            placeholder="Delivery Address"
            className="input input-bordered w-full"
          />
        </div>

        <div className="input-group mb-3">
          <label className="label">Requested Delivery Date</label>
          <input
            name="deliveryDate"
            type="date"
            className="input input-bordered w-full"
          />
        </div>

        <div className="input-group mb-3">
          <label className="label">Delivery Address Latitude</label>
          <input
            name="latitude"
            type="number"
            step="any"
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
            placeholder="e.g., 21.121365496"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <input
            className="btn w-full bg-purple-600 text-white font-bold"
            type="submit"
            value={"Book Parcel"}
          />
        </div>
      </form>
    </div>
  );
};

export default BookParcel;
