import FeatureCard from '@/Components/FeatureCard/FeatureCard'
import React from 'react'

import safeDelivery from '../../assets/safe-delivery.png'
import fastDelivery from '../../assets/fast-delivery.png'
import support from '../../assets/24-hours.png'

const FeaturesSection = () => {
  return (
    <div className='my-16 grid md:grid-cols-3 gap-3 lg:gap-5'>
      <FeatureCard title={'100% Safe Delivery'} description={'We Ensure secure and reliable delivery every time.'} icon={safeDelivery}/>
      <FeatureCard title={'Super Fast Delivery'} description={'Get your parcels delivered in record time.'} icon={fastDelivery}/>
      <FeatureCard title={'24/7 support'} description={'You will get 24/7 suuport no mater what time is it.'} icon={support}/>
    </div>
  )
}

export default FeaturesSection