import React from 'react'
import StatisticsSection from '../../Sections/StatisticsSection/StatisticsSection'
import TopDeliveryManSection from '../../Sections/TopDeliveryManSection/TopDeliveryManSection'


const Home = () => {

  return (
    <div id='home_page'>
      <h1>Home Page</h1>
      <div className="container">
        <StatisticsSection/>
        <TopDeliveryManSection/>
      </div>
    </div>
  )
}

export default Home
