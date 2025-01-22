import { authContext } from '@/Contexts/AuthContext/AuthContext';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import clsx from 'clsx';
import React, { useContext, useEffect, useState } from 'react'

const CheckoutForm = ({ parcelId }) => {
    const [error, setError] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(authContext)
    const [totalPrice, setTotalPrice] = useState(null)
    const [clientSecret, setClientSecret] = useState("")


    useEffect(() => {
        const getTotalPrice = async () => {
            if (user?.email) {
                const { data } = await axios.get(`${import.meta.env.VITE_MAIN_URL}/parcel/${parcelId}`)

                setTotalPrice(data.price)
            }
        }

        getTotalPrice()
    }, [user?.email, parcelId])


    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        if (user?.email && totalPrice !== null) {
            axios.post(`${import.meta.env.VITE_MAIN_URL}/create-payment-intent`, { price: totalPrice })
                .then(res => {
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [user?.email, totalPrice]);

    
    console.log(clientSecret)

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('')
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>

                <p className='text-red-600 font-bold'>{error}</p>
            </form>
        </div>
    )
}

export default CheckoutForm
