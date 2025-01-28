import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ManageParcelModal from "../../../Components/Modals/ManageParcelModal/ManageParcelModal";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/Components/ui/button";

import logoIcon from '../../../assets/delivery.png'

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

  const handleSearchByDate = async (e) => {
    e.preventDefault()
    const form = e.target
    const dateFrom = new Date(form.dateFrom.value)
    const dateTo = new Date(form.dateTo.value)

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
    <div className="py-8">
      <div>
        <div className="">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Requested Date</TableHead>
                <TableHead>Booking Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {(filteredParcels.length > 0 ? filteredParcels : allParcels).map((parcel) => {
                  const {
                    _id,
                    price,
                    phoneNumber,
                    deliveryDate,
                    bookingDate,
                    status,
                    reqDeliveryDate,
                    customer: { name },
                  } = parcel;
                  return (
                    <TableRow key={_id}>
                      <TableCell>{name && name}</TableCell>
                      <TableCell>{phoneNumber && phoneNumber}</TableCell>
                      <TableCell>{price && price}</TableCell>
                      <TableCell>{reqDeliveryDate && reqDeliveryDate}</TableCell>
                      <TableCell>{bookingDate && new Date(bookingDate).toLocaleDateString()}</TableCell>
                      <TableCell>{status && status}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleOpenModal(_id)}>Manage</Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
          <ManageParcelModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            allParcels={allParcels}
            _id={selectedParcelId}
          />
        </div>
      </div>
    </div>
  );
};

export default AllParcels;
