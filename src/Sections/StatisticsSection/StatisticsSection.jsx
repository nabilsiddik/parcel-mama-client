import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

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
    <div className='grid grid-cols-3'>
      <div className='p-5 shadow-xl'>
        <p>Number of Booked Parcels</p>
        <span>{allParcels.length}</span>
      </div>

      <div className='p-5 shadow-xl'>
        <p>Number of Delivered Parcel</p>
        <span>{deliveredParcels.length}</span>
      </div>

      <div className='p-5 shadow-xl'>
        <p>Number of Users</p>
        <span>{allUsers.length}</span>
      </div>
    </div>
  )
}

export default StatisticsSection