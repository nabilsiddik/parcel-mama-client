import axios from "axios";
import React, { useContext } from "react";
import { authContext } from "../../../Contexts/AuthContext/AuthContext";
import Swal from "sweetalert2";
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import parcelBooking from "../../../assets/parcel-booking.png"



const BookParcel = () => {
  const { user } = useContext(authContext);

  const handleAddParcel = async (e) => {
    e.preventDefault();
    const form = e.target;

    const phoneNumber = form.phoneNumber.value;
    const parcelType = form.parcelType.value;
    const parcelWeight = parseInt(form.parcelWeight.value);
    const receiverName = form.receiverName.value;
    const receiverPhoneNumber = form.receiverPhoneNumber.value;
    const deliveryAddress = form.deliveryAddress.value;
    const deliveryDate = new Date(form.deliveryDate.value);
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
        const patchResponse = await axios.patch(
          `${import.meta.env.VITE_MAIN_URL}/increment-booked-parcel/${user?.email}`,
          parcel
        );
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
    <div className="py-8">
      <h2 className="mb-5 text-center">Book Parcel</h2>

      <div className="xl:flex items-stretch gap-5">
        <div className="w-1/2 border flex items-center hidden xl:block">
          <img className="" src={parcelBooking} alt="delivery man with parcel" />
        </div>
        <form className="xl:w-1/2 border p-10" onSubmit={handleAddParcel}>
          <div className="mb-4 flex items-center gap-5">
            <div className="w-1/2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                placeholder="Phone Number"
              />
            </div>
            <div className="w-1/2">
              <Label htmlFor="parcelType">Parcel Type</Label>
              <Input
                id="parcelType"
                name="parcelType"
                type="text"
                placeholder="Parcel Type"
              />
            </div>
          </div>

          <div className="mb-4 flex items-center gap-5">
            <div className="w-1/2">
              <Label htmlFor="parcelWeight">Parcel Weight</Label>
              <Input
                id="parcelWeight"
                name="parcelWeight"
                type="number"
                placeholder="Parcel Weight"
              />
            </div>
            <div className="w-1/2">
              <Label htmlFor="receiverName">Receiver's Name</Label>
              <Input
                id="receiverName"
                name="receiverName"
                type="text"
                placeholder="Receiver's Name"
              />
            </div>
          </div>

          <div className="mb-4 flex items-center gap-5">
            <div className="w-1/2">
              <Label htmlFor="receiverPhoneNumber">Receiver's Phone Number</Label>
              <Input
                id="receiverPhoneNumber"
                name="receiverPhoneNumber"
                type="tel"
                placeholder="Receiver's Phone Number"
              />
            </div>
            <div className="w-1/2">
              <Label htmlFor="deliveryDate">Requested Delivery Date</Label>
              <Input id="deliveryDate" name="deliveryDate" type="date" />
            </div>
          </div>

          <div className="mb-4">
            <Label htmlFor="deliveryAddress">Parcel Delivery Address</Label>
            <Input
              id="deliveryAddress"
              name="deliveryAddress"
              type="text"
              placeholder="Delivery Address"
            />
          </div>

          <div className="mb-4 flex items-center gap-5">
            <div className="w-1/2">
              <Label htmlFor="latitude">Delivery Address Latitude</Label>
              <Input
                id="latitude"
                name="latitude"
                type="number"
                step="any"
                placeholder="e.g., 21.121365496"
              />
            </div>
            <div className="w-1/2">
              <Label htmlFor="longitude">Delivery Address Longitude</Label>
              <Input
                id="longitude"
                name="longitude"
                type="number"
                step="any"
                placeholder="e.g., 21.121365496"
              />
            </div>
          </div>



          <Button type="submit" className="w-full bg-purple-600 text-white font-bold">
            Book Parcel
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BookParcel;
