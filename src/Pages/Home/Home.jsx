import React from 'react'
import StatisticsSection from '../../Sections/StatisticsSection/StatisticsSection'
import TopDeliveryManSection from '../../Sections/TopDeliveryManSection/TopDeliveryManSection'
import BannerSection from '@/Sections/BannerSection/BannerSection'


const Home = () => {

  return (
    <div id='home_page'>
      <BannerSection/>
      <div className="container py-5">
        <StatisticsSection/>
        <TopDeliveryManSection/>
      </div>
    </div>
  )
}

export default Home
