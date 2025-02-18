import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'

const RecentBookingCard = ({ parcel }) => {
    const { customer, parcelType, bookingDate } = parcel
    return (
        <Card className={`py-5 `}>
            <CardHeader>
                <div className='flex items-center gap-5'>
                    <div>
                        <Avatar className='mx-auto w-[100px] h-[100px]'>
                            <AvatarImage className='rounded-full w-[100px] h-[100px]' src={customer?.photo} />
                            <AvatarFallback className='rounded-full w-[100px] h-[100px] bg-red-500 flex items-center justify-center font-bold text-white'>Unknown</AvatarFallback>
                        </Avatar>
                    </div>
                    <div>
                        <CardTitle className='mb-3'>
                            <h3>{customer.name}</h3>
                        </CardTitle>
                        <CardDescription>
                            <p>{bookingDate && new Date(bookingDate).toLocaleDateString()}</p>
                            <p>{parcelType && parcelType}</p>
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
        </Card>
    )
}

export default RecentBookingCard
