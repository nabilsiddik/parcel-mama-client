import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../../../Components/CheckoutForm/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { useParams } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PRIMARY_KEY)

const Checkout = () => {

    const { parcelId } = useParams()

    return (
        <div className='py-8'>
            <h2 className='mb-5'>Checkout</h2>

            <Elements stripe={stripePromise}>
                <CheckoutForm parcelId = {parcelId} />
            </Elements>
        </div>
    )
}

export default Checkout
