import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ManageParcelModal from "../../../Components/Modals/ManageParcelModal/ManageParcelModal";

const AllParcels = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredParcels, setFilteredParcels] = useState([])
  const [selectedParcelId, setSelectedParcelId] = useState(null)

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




  const handleOpenModal = (parcelId) => {
    setSelectedParcelId(parcelId);
    setIsOpen(true);
  };

  const handleSearchByDate = async(e) => {
    e.preventDefault()
    const form = e.target
    const dateFrom = new Date(form.dateFrom.value)
    const dateTo = new Date(form.dateTo.value)

    console.log({dateFrom, dateTo})

    try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_MAIN_URL}/search-parcels`,
          {
            params: { dateFrom, dateTo }
          }
        )
    
        setFilteredParcels(data)
      } catch (error) {
        console.error("Error fetching parcels by date range:", error)
      }


      console.log(filteredParcels)
  }

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div className="py-10">
      <div className="mb-5 flex items-center justify-between">
        <h3>All Parcels</h3>
        <div>
          <form onSubmit={handleSearchByDate}  className="flex gap-2">
            <input
              name="dateFrom"
              type="date"
              className="input input-bordered"
            />
            <input name="dateTo" type="date" className="input input-bordered" />
            <input
              type="submit"
              value={"Search"}
              className="btn bg-purple-600 text-white"
            />
          </form>
        </div>
      </div>
      <div>
        <div className="overflow-x-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {allParcels &&
              allParcels.map((parcel) => {
                const {
                  _id,
                  price,
                  phoneNumber,
                  deliveryDate,
                  bookingDate,
                  status,
                  customer: { name },
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
                      <b>Cost: </b>${price && price}
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
                      <button
                        onClick={() => handleOpenModal(_id)}
                        className="btn w-full bg-purple-600 text-white "
                      >
                        Manage
                      </button>
                    </div>

                    <ManageParcelModal
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      allParcels={allParcels}
                      _id={selectedParcelId}
                    />
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
