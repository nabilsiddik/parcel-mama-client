import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const AllUsers = () => {
  const {
    data: allUsers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_MAIN_URL}/users`
      );

      return data;
    },
  })

  return (
    <div>
      <h2>All Users</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {allUsers &&
          allUsers.map((user) => {
            const { _id, name, email, image, role, timeStamp, phone, totalSpent} = user;

            return (
              <div key={user._id} className="shadow-lg border p-5">
                <h3>
                  <b>Name: </b>
                  {name && name}
                </h3>
                <p>
                  <b>Phone Number:</b> {phone && phone}
                </p>
                <p>
                  <b>Parcels Booked:</b>
                </p>
                <p>
                  <b>Total Spent:</b> {totalSpent && totalSpent}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AllUsers;
