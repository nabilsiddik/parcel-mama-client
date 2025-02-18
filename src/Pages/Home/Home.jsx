import React from 'react'
import StatisticsSection from '../../Sections/StatisticsSection/StatisticsSection'
import TopDeliveryManSection from '../../Sections/TopDeliveryManSection/TopDeliveryManSection'
import BannerSection from '@/Sections/BannerSection/BannerSection'
import FeaturesSection from '@/Sections/FeaturesSection/FeaturesSection'
import MapSection from '@/Sections/MapSection/MapSection'
import RecentBooking from '@/Sections/RecentBookingSection/RecentBooking'
import NewsletterSection from '@/Sections/NewsletterSection/NewsletterSection'
import FaqSection from '@/Sections/FaqSection/FaqSection'


const Home = () => {

  return (
    <div id='home_page' className='bg-white'>
      <BannerSection />
      <StatisticsSection />
      <div className="container py-5">
        <FeaturesSection />
      </div>
      <div className="container">
        <TopDeliveryManSection />
      </div>
      <div className="container">
        <RecentBooking/>
      </div>
      <NewsletterSection/>
      <FaqSection/>
    </div>
  )
}

export default Home
