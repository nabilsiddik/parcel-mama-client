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

    console.log(topDeliveryMens)

    return (
        <div className='my-20'>
            <SectionHeader title = {'Our Top Deliverymen'} description={'Here is our top 3 Deliveryman working consistantly, delivered lots of product and has a good reviews'}/>
            <div className="grid md:grid-cols-3 gap-4 mt-14">
                {topDeliveryMens.length > 0 && topDeliveryMens.map((deliveryMan, index) => {
                    const { _id, name, image, numOfDeliveredParcel } = deliveryMan
                    return <Card key={_id} className={index === 1 && 'md:translate-y-[-20px]'}>
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
                                    <p className='font-bold text-lg'>Delivered Parcel: {numOfDeliveredParcel ? numOfDeliveredParcel : 0}</p>
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
