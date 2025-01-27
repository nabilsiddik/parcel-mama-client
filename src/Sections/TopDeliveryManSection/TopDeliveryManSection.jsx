import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import SectionHeader from '@/Components/SectionHeader/SectionHeader';
import StarRatings from 'react-star-ratings';

const TopDeliveryManSection = () => {

    const {
        data: topDeliveryMens = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["topDeliveryMan"],
        queryFn: async () => {
            const { data } = await axios.get(`
            ${import.meta.env.VITE_MAIN_URL}/top-deliverymen`);

            return data;
        },
    })


    return (
        <div className='my-20'>
            <SectionHeader title={'Our Top Deliverymen'} description={'Here is our top 3 Deliveryman working consistantly, delivered lots of product and has a good reviews'} />
            <div className="grid md:grid-cols-3 gap-4 mt-14">
                {topDeliveryMens.length > 0 && topDeliveryMens.map((deliveryMan, index) => {
                    const { _id, name, image, numOfDeliveredParcel, avarageRating } = deliveryMan
                    const orderClass = index === 0 ? 'md:order-2' : index === 1 ? 'md:order-1' : 'md:order-3';
                    return <Card key={_id} className={`${orderClass} py-16 ${
                        index === 0 ? 'md:translate-y-[-20px] bg-yellow-500' : ''
                    }`}>
                        <CardHeader>
                            <div className='text-center flex flex-col gap-3'>
                                <Avatar className='mx-auto w-[100px] h-[100px]'>
                                    <AvatarImage src={image} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <CardTitle>
                                    <h3>{name}</h3>
                                </CardTitle>
                                <CardDescription>
                                    <p className='font-bold text-lg text-black'>Delivered Parcel: {numOfDeliveredParcel ? numOfDeliveredParcel : 0}</p>
                                </CardDescription>

                                <StarRatings
                                    rating={avarageRating && avarageRating}
                                    starDimension="20px"
                                    starSpacing="5px"
                                    starRatedColor={index === 0 ? 'red' : '#f39c12'}
                                    starEmptyColor="#7f8c8d"
                                />

                                <CardDescription>
                                    <p className='text-black'>{name && name} has delivered <b>{numOfDeliveredParcel && numOfDeliveredParcel}</b> parcels with an avarage rating of <b>{avarageRating && avarageRating.toFixed(2)}</b></p>
                                </CardDescription>
                            </div>
                        </CardHeader>
                    </Card>
                })}
            </div>
        </div>
    )
}

export default TopDeliveryManSection
