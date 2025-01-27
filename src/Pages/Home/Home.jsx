import React from 'react'
import StatisticsSection from '../../Sections/StatisticsSection/StatisticsSection'
import TopDeliveryManSection from '../../Sections/TopDeliveryManSection/TopDeliveryManSection'
import BannerSection from '@/Sections/BannerSection/BannerSection'
import FeaturesSection from '@/Sections/FeaturesSection/FeaturesSection'
import MapSection from '@/Sections/MapSection/MapSection'


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
        <MapSection/>
      </div>
    </div>
  )
}

export default Home
