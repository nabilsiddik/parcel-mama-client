import PageHeader from '@/Components/PageHeader/PageHeader'
import SectionHeader from '@/Components/SectionHeader/SectionHeader'
import Lottie from 'lottie-react'
import React from 'react'
import mobileApp from '../../assets/lotties/ordering-online-food.json'
import { FaApple } from 'react-icons/fa'
import { FaGooglePlay } from "react-icons/fa";
import { Link } from 'react-router-dom';

const AppSection = () => {
  return (
    <div>
      <div className="container my-20">

        <div className='flex items-center flex-col md:flex-row gap-5'>
            <div className='flex-1'>
                <Lottie animationData={mobileApp}/>
            </div>
            <div className='flex-1'>
                <h2 className='mb-5'>Download our mobile App</h2>
                <p>Download our mobile app from play store or app store. Mobile app will give you more better user experience and flexibility.</p>
                <div className="flex items-center md:justify-start gap-5 mt-5">
                <Link to={'https://play.google.com'}>
                  <button className="btn bg-red-600 border-2 border-red-600 hover:text-red-600 text-white hover:bg-[transparent] hover:border-red-600">
                    Download App <FaGooglePlay />
                  </button>
                </Link>
                <Link to={'https://www.apple.com/app-store/'}>
                <button className="btn bg-[transparent] border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600">
                  Download App <FaApple />
                </button>
                </Link>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AppSection
