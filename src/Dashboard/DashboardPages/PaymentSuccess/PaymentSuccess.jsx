import React from 'react'
import { useParams } from 'react-router-dom'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'


const PaymentSuccess = () => {

    const { transactionId } = useParams()
    const { width, height } = useWindowSize()

    return (
        <div className='min-h-[85%] flex items-center justify-center flex-col gap-3 relative overflow-hidden'>
            <div>
                <Confetti
                    width={width}
                    height={height}
                />
            </div>
            <h2 className='text-center'>Payment Successfull!</h2>
            <p className='bg-green-600 py-2 px-3 rounded-md font-bold text-white text-center'>Your Transaction id: {transactionId && transactionId} </p>
        </div>
    )
}

export default PaymentSuccess
