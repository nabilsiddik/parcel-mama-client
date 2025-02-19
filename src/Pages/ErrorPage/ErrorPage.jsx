import React from 'react'
import errorLottie from '../../assets/lotties/404-error.json'
import Lottie from 'lottie-react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
    return (
        <div>
            <div className="container py-20">
                <h1 className='text-center'>Opps! 404 Error</h1>
                <div className="flex justify-center ml-20">
                    <Lottie className='w-[500px]' animationData={errorLottie} />
                </div>
                <div className='flex justify-center mt-10'>
                    <Link to={'/'} className='btn bg-red-600 border-2 border-red-600 hover:text-red-600 text-white hover:bg-[transparent] hover:border-red-600'>Go to Home</Link>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage
