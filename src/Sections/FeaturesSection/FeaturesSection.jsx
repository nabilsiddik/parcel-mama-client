import FeatureCard from '@/Components/FeatureCard/FeatureCard'
import React from 'react'
import safeDelivery from '../../assets/safe-delivery.png'
import fastDelivery from '../../assets/fast-delivery.png'
import support from '../../assets/24-hours.png'
import { Fade } from "react-awesome-reveal";

const FeaturesSection = () => {
  return (
    <div className='my-16 grid md:grid-cols-3 gap-3 lg:gap-5'>
      <Fade direction='left'>
        <FeatureCard title={'100% Safe Delivery'} description={'We Ensure secure and reliable delivery every time.'} icon={safeDelivery} />
      </Fade>
      <Fade direction='top'>
        <FeatureCard title={'Super Fast Delivery'} description={'Get your parcels delivered in record time.'} icon={fastDelivery} />
      </Fade>
      <Fade direction='right'>
        <FeatureCard title={'24/7 support'} description={'You will get 24/7 suuport no mater what time is it.'} icon={support} />
      </Fade>
    </div>
  )
}

export default FeaturesSection