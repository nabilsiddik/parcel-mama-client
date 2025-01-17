import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../../../Contexts/AuthContext/AuthContext";

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

  console.log(deliveryManId);

  const { data: deliveryList = [], isLoading } = useQuery(
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

  console.log("list", deliveryList);

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
              <div key={user._id} className="shadow-lg border p-5">
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
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MyDeliveryList;
