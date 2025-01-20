import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts'
import {
  Card
} from "@/components/ui/card"
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


const Statistics = () => {


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

  const dateCounts = allParcels.reduce((acc, parcel) => {
    const bookingDate = new Date(parcel.bookingDate).toLocaleDateString();
    acc[bookingDate] = (acc[bookingDate] || 0) + 1;
    return acc;
  }, {});

  const dates = Object.keys(dateCounts)
  const counts = Object.values(dateCounts)

  console.log(dates, counts)


  useEffect(() => {
    var chart1 = {
      chart: {
        type: 'bar'
      },
      series: [{
        name: 'sales',
        data: counts
      }],
      xaxis: {
        categories: dates
      },
    }


    var chart2 = {
      chart: {
        type: 'line'
      },
      series: [{
        name: 'sales',
        data: counts
      }],
      xaxis: {
        categories: dates
      },
    }


    var barChart = new ApexCharts(document.querySelector("#barChart"), chart1);
    var lineChart = new ApexCharts(document.querySelector("#lineChart"), chart2);

    barChart.render()
    lineChart.render()
  }, [allParcels])

  return (
    <div className='py-8'>
      <h3>Statistics</h3>
      <div className='grid lg:grid-cols-2 gap-5'>
        <div id='barChart' className='w-full border p-5'></div>
        <div id='lineChart' className='w-full border p-5'></div>
      </div>

    </div>
  )
}

export default Statistics
