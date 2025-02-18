import RecentBookingCard from '@/Components/RecentBookingCard/RecentBookingCard'
import SectionHeader from '@/Components/SectionHeader/SectionHeader'
import { parcelContext } from '@/Contexts/ParcelContext/ParcelContext'
import React, { useContext } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';


const RecentBooking = () => {

    const { limitedNumOfParcel } = useContext(parcelContext)

    console.log(limitedNumOfParcel)


    return (
        <div className='my-20'>
            <SectionHeader title={'Recent Bookings'} description={'Here are some of the latest bookings that our customers booked.'} />

            <div>
                <Swiper
                    pagination={{
                        dynamicBullets: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                    spaceBetween={30}  
                    slidesPerView={3} 
                    loop={true} 
                    breakpoints={{
                        640: {
                            slidesPerView: 1, 
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20, 
                        },
                        1280: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        }
                    }}
                >
                    {limitedNumOfParcel.length > 0 && limitedNumOfParcel.map((parcel) => {
                        return <SwiperSlide>
                            <RecentBookingCard parcel={parcel} />
                        </SwiperSlide>
                    })}
                </Swiper>
            </div>
        </div>
    )
}

export default RecentBooking
