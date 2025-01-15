import React, { useContext } from "react";
import { authContext } from "../../../Contexts/AuthContext/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const MyParcels = () => {
  const { user } = useContext(authContext);

  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["parcel"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_MAIN_URL}/my-parcels/${user?.email}`
      );

      return data;
    },
  });

  return (
    <div>
      <h1>My Parcels</h1>
      <div>
        <div className="overflow-x-auto">
          {/* <table className="table table-lg flex items-center">
            <thead className="hidden md:block">
              <tr className="flex justify-between flex-col md:flex-row dark:bg-darklight dark:text-white">
                <th>Info</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel) => {
                const {
                  _id,
                  phoneNumber,
                  parcelType,
                  parcelWeight,
                  receiverName,
                  receiverPhoneNumber,
                  deliveryAddress,
                  deliveryDate,
                  latitude,
                  longitude,
                  bookingDate,
                  status,
                  apprDeliDate,
                  deliveryManId
                } = parcel;
                return (
                  <tr
                    key={_id}
                    className="flex items-center justify-between flex-col md:flex-row dark:bg-darklight dark:text-white"
                  >
                    <td>
                      <div className="flex items-center gap-3">
                       <div>
                       <h4>Type: {parcelType && parcelType}</h4>
                       <p>Req Date: {deliveryDate && deliveryDate}</p>
                       </div>
                        <div>
                          <div className="font-bold">
                            Boo Date: {bookingDate && bookingDate}
                          </div>
                          <div className="font-bold">
                            <p>Appr Date: {apprDeliDate && apprDeliDate}</p>
                          </div>
                          <div className="text-sm opacity-50">
                            By {status && status}
                          </div>
                          <div className="text-sm opacity-50">BDT {status}</div>
                          <div className="text-sm opacity-50">
                            {status && status}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="flex-1 md:w-5/12 w-full">
                      <span>{status && status}</span>
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        {status && status} Review
                      </span>
                    </td>
                    <td>
                      <Link to={`/update-tutorial/${_id}`}>
                        <button className="btn bg-green-600 text-white hover:bg-green-700">
                          Update
                        </button>
                      </Link>
                    </td>
                    <th>
                      <button
                        className="btn bg-primary text-white hover:bg-hover"
                      >
                        Delete
                      </button>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table> */}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {parcels.map((parcel) => {
              const {
                _id,
                phoneNumber,
                parcelType,
                parcelWeight,
                receiverName,
                receiverPhoneNumber,
                deliveryAddress,
                deliveryDate,
                latitude,
                longitude,
                bookingDate,
                status,
                apprDeliDate,
                deliveryManId,
              } = parcel;
              return (
                <div className="shadow-lg border p-5">
                  <p>
                    <b>Parcel Type: </b> {parcelType && parcelType}
                  </p>
                  <p>
                    <b>Requested Delivery Date: </b>{" "}
                    {deliveryDate && deliveryDate}
                  </p>
                  <p>
                    <b>Approximate Delivery Date: </b>
                    {apprDeliDate && apprDeliDate}
                  </p>
                  <p>
                    <b>Booking Date: </b>
                    {bookingDate && bookingDate}
                  </p>
                  <p>
                    <b>Delivery Men ID: </b> {deliveryManId && deliveryManId}
                  </p>
                  <p>
                    <b>Booking Status: </b> {status && status}
                  </p>
                  <p>
                    <b>Booking Type: </b>
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <button className="btn bg-success">Update</button>
                    <button className="btn bg-primary">Cancle</button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <button className="btn bg-success">Review</button>
                    <button className="btn bg-primary">Pay</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyParcels;
