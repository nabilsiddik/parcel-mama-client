import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Swal from "sweetalert2";

const AllUsers = () => {
  const {
    data: allUsers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_MAIN_URL}/users`
      );

      return data;
    },
  })


  const handleMakeAdmin = (_id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You want to make him/her Admin",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true
    }).then(async(result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Admin Done!",
          text: "You made him/her admin",
          icon: "success"
        });

        // Make admin request to database
        const res = await axios.patch(`${import.meta.env.VITE_MAIN_URL}/make-admin/${_id}`)

        refetch()
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Alright",
          text: "User Role is the Same as Before",
          icon: "error"
        });
      }
    });
  }

  const handleMakeDeliveryMan = (_id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You want to make him/her Delivery Man?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true
    }).then(async(result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Delivery Man Done!",
          text: "You made him/her Delivery Man",
          icon: "success"
        });

        // Make admin request to database
        const res = await axios.patch(`${import.meta.env.VITE_MAIN_URL}/make-deliveryman/${_id}`)

        refetch()
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Alright",
          text: "User Role is the Same as Before",
          icon: "error"
        });
      }
    });
  }

  return (
    <div>
      <h2>All Users</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {allUsers &&
          allUsers.map((user) => {
            const { _id, name, email, image, role, timeStamp, phone, totalSpent, bookedParcel} = user;

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
                  <b>Parcels Booked:</b> {bookedParcel && bookedParcel}
                </p>
                <p>
                  <b>Total Spent:</b> {totalSpent && totalSpent}
                </p>

                <button onClick={() => handleMakeAdmin(_id)} className="btn bg-secondary w-full mt-2 text-white">Make Admin</button>
                <button onClick={() => handleMakeDeliveryMan(_id)} className="btn bg-secondary w-full mt-2 text-white">Make Delivery Man</button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AllUsers;
