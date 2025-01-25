import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import StarRatings from 'react-star-ratings';
import { authContext } from '@/Contexts/AuthContext/AuthContext';


const MyReviews = () => {

  const { user } = useContext(authContext)

// Get delivery man id
const {
  data: deliveryMan = {}, // Default to an empty object if no data
} = useQuery({
  queryKey: ["deliveryMan", user?.email],
  queryFn: async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_MAIN_URL}/user/${user?.email}`
    );
    return res.data;
  },
});


  // get all reviews
  const { data: allReviews = [] } = useQuery(
    ["allreviews", deliveryMan._id],
    async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_MAIN_URL}/reviews/${deliveryMan._id}`
      );
      return res.data;
    }
  );


  return (
    <div className='py-8'>
      <h3 className='mb-5'>All Reviews</h3>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {allReviews && allReviews.map((review) => {

          const { _id, rating, feedback, reviewGiver, reviewDate } = review

          return <Card className='h-full' key={_id}>
            <CardHeader>
              <div className='flex items-center gap-4'>
                <img className='w-[80px] rounded-full' src={reviewGiver.image} alt="" />

                <div className='flex flex-col gap-1'>
                  <CardTitle className='font-bold text-xl'>{reviewGiver.name}</CardTitle>
                  <CardDescription>{new Date(reviewDate).toLocaleDateString()}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <StarRatings
                rating={rating}
                starDimension="20px"
                starSpacing="5px"
                starRatedColor="#f39c12"
                starEmptyColor="#7f8c8d"
              />
            </CardContent>
            <CardFooter>
              <p>{feedback}</p>
            </CardFooter>
          </Card>

        })}
      </div>
    </div>
  )
}

export default MyReviews
