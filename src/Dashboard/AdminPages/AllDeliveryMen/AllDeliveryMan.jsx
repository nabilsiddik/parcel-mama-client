import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/Components/ui/button";

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
    <div id="all_deliveryman" className="py-8">
      <h3 className="mb-3">All Deliverymens</h3>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Parcels Dleivered</TableHead>
              <TableHead>Average Review</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {deliveryMens &&
              deliveryMens.map((deliveryMan) => {
                const {
                  _id,
                  name,
                  numOfDeliveredParcel,
                  phone,
                  avarageRating
                } = deliveryMan;
                return (
                  <TableRow key={_id}>
                    <TableCell>{name && name}</TableCell>
                    <TableCell>{phone && phone}</TableCell>
                    <TableCell>{numOfDeliveredParcel && numOfDeliveredParcel}</TableCell>
                    <TableCell>{avarageRating && `${avarageRating.toFixed(2)} Star`} </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllDeliveryMan;
