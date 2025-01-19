import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const StatisticsSection = () => {

  const {
    data: allUsers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get(`
            ${import.meta.env.VITE_MAIN_URL}/users`);

      return data;
    },
  })


  const {
    data: allParcels = [],
  } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const { data } = await axios.get(`
            ${import.meta.env.VITE_MAIN_URL}/parcels
          `);

      return data;
    },
  });


  const {
    data: deliveredParcels = [],
  } = useQuery({
    queryKey: ["deliveredParcels"],
    queryFn: async () => {
      const { data } = await axios.get(`
            ${import.meta.env.VITE_MAIN_URL}/delivered-parcels
          `);

      return data;
    },
  });



  return (
    <div className='grid sm:grid-cols-3 gap-3 md:gap-5'>
      <Card>
        <CardHeader>
          <div className='text-center flex flex-col gap-2'>
            <CardTitle>
              <h2>{allParcels.length}+</h2>
            </CardTitle>
            <p>
              <CardDescription>Booked Parcels</CardDescription>
            </p>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <div className='text-center flex flex-col gap-2'>
            <CardTitle>
              <h2>{deliveredParcels.length}+</h2>
            </CardTitle>
            <p>
              <CardDescription>Delivered Parcels</CardDescription>
            </p>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <div className='text-center flex flex-col gap-2'>
            <CardTitle>
              <h2>{allUsers.length}+</h2>
            </CardTitle>
            <p>
              <CardDescription>Registered Users</CardDescription>
            </p>
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}

export default StatisticsSection