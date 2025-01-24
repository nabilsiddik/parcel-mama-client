import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import StatisticsCard from '@/Components/StatisticsCard/StatisticsCard';
import useAxiosSecure from '@/CustomHooks/useAxiosSecure';


const StatisticsSection = () => {
 const axiosSecure = useAxiosSecure()
 const token = localStorage.getItem('access-token')
  const {
    data: allUsers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get(`
        ${import.meta.env.VITE_MAIN_URL}/users
      `);
      return data;
    }
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
    <div className='bg-[#fc0] py-8'>
      <div className="container grid sm:grid-cols-3 gap-3 md:gap-5">
        <StatisticsCard number={allParcels.length} text="Booked Parcels"/>
        <StatisticsCard number={deliveredParcels.length} text="Deliverd Parcels"/>
        <StatisticsCard number={allUsers.length} text="Registered Users"/>
      </div>

    </div>
  )
}

export default StatisticsSection