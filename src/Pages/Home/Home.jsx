import React from 'react'
import StatisticsSection from '../../Sections/StatisticsSection/StatisticsSection'
import TopDeliveryManSection from '../../Sections/TopDeliveryManSection/TopDeliveryManSection'
import BannerSection from '@/Sections/BannerSection/BannerSection'
import FeaturesSection from '@/Sections/FeaturesSection/FeaturesSection'


const Home = () => {

  return (
    <div id='home_page'>
      <BannerSection />
      <div className="container py-5">
        <FeaturesSection />
      </div>
      <StatisticsSection />
      <div className="container">
        <TopDeliveryManSection />
      </div>
    </div>
  )
}

export default Home
