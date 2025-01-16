import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const AllDeliveryMan = () => {
  const {
    data: deliveryMens = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["deliverymens"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_MAIN_URL}/deliverymens`
      );

      return data;
    },
  });

  return (
    <div>
      <h2>All Delivery Man</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {deliveryMens &&
          deliveryMens.map((deliveryMan) => {
            const {
              _id,
              name,
              email,
              image,
              role,
              timeStamp,
              phone,
              totalSpent,
              bookedParcel,
            } = deliveryMan;

            return (
              <div key={_id} className="shadow-lg border p-5">
                <h3>
                  <b>Name: </b>
                  {name && name}
                </h3>
                <p>
                  <b>Phone Number:</b> {phone && phone}
                </p>
                <p>
                  <b>Parcels Dleivered:</b> 
                </p>
                <p>
                  <b>Average Review:</b> 
                </p>

              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AllDeliveryMan;
