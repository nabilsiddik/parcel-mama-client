import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

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
        <div>
            <h2>Top Delivery Man</h2>
            <div className="grid grid-cols-3 gap-4 p-5">
                {topDeliveryMens.length > 0 && topDeliveryMens.map((deliveryMan) => {
                    const {name, image, numOfDeliveredParcel} = deliveryMan
                    return <div className="card card-compact bg-base-100 shadow-xl">
                        <figure>
                            <img
                                src={image}
                                alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{name}</h2>
                            <p>Delivered Parcel: {numOfDeliveredParcel ? numOfDeliveredParcel : 0}</p>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default TopDeliveryManSection
