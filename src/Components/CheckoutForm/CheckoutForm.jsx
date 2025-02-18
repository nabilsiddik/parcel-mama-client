import { authContext } from '@/Contexts/AuthContext/AuthContext';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import clsx from 'clsx';
import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import stripeLogo from '../../assets/Stripe.png'
import sslcommerzLogo from '../../assets/sslcommerz-logo.png'
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ parcelId }) => {
    const [error, setError] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(authContext)
    const [totalPrice, setTotalPrice] = useState(null)
    const [clientSecret, setClientSecret] = useState("")
    const [transactionId, setTransactionId] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('stripe')
    const navigate = useNavigate()



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


    // Handle Stripe Payment
    const handleStripePayment = async (event) => {
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

        // confirm paypment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }

        })

        if (confirmError) {
            console.log('confirm error')
        } else {
            if (paymentIntent.status === 'succeeded') {
                // Now save the payment in the database
                const stripePayment = {
                    email: user?.email,
                    name: user?.displayName,
                    image: user?.photoURL,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    parcelId: parcelId
                }

                const paymentResponse = await axios.post(`${import.meta.env.VITE_MAIN_URL}/payments`, stripePayment)

                if (paymentResponse.data.insertedId) {
                    Swal.fire({
                        position: "center center",
                        icon: "success",
                        title: "Payment Successfull",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setTransactionId(paymentIntent.id)
                    navigate(`/dashboard/payment-success/${paymentIntent?.id && paymentIntent?.id}`)

                    // send email about payment confirmation


                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops! Payment Failed",
                        text: "Something went wrong while payment",
                        footer: `${error.code}. ${error.message}`,
                    });
                }

            }
        }
    };

    // Handle SSL Payment
    const handleSslPayment = async(e) => {
        e.preventDefault()
        const sslPayment = {
            username: user?.displayName,
            userEmail: user?.email,
            profile: user?.photoURL,
            price: totalPrice,
            transactionId: '',
            date: new Date(),
            status: 'pending'
        }

        const sslRes = await axios.post(`${import.meta.env.VITE_MAIN_URL}/create-ssl-payment`, sslPayment)
        
    }

    return (
        <div>
            <h3 className='text-center text-3xl mb-7'>Select Payment Method</h3>

            <div className='flex justify-center mb-10'>
                <select onChange={(e) => setPaymentMethod(e.target.value)} className='select select-bordered w-11/12 md:w-8/12 lg:w-6/12 xl:w-4/12'>
                    <option value='stripe'>Stripe</option>
                    <option value="sslcommerz">SSL Commerz</option>
                </select>
            </div>

            {paymentMethod === 'stripe' &&
                <form id='stripe_payment_form' onSubmit={handleStripePayment} className='w-11/12 md:w-8/12 lg:w-6/12 xl:w-4/12 border mx-auto py-10 px-5 md:px-7 lg:px-20 shadow-lg rounded-lg'>
                    <div>
                        <img className='mx-auto mb-3 w-40' src={stripeLogo} alt="stripe logo" />
                        <h3 className='mb-6 text-center'>Enter Your Payment Info</h3>
                    </div>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                    border: '1px solid black',

                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                    <button className='btn bg-black w-full mt-8 mb-5 text-white' type="submit" disabled={!stripe || !clientSecret}>
                        Pay (BDT {totalPrice})
                    </button>

                    <p className='text-red-600 font-bold'>{error}</p>
                    {transactionId && <p className='text-green-600 font-bold'>Your Transaction ID: {transactionId && transactionId}</p>}
                </form>
            }


            {paymentMethod === 'sslcommerz' &&
                <form id='stripe_payment_form' onSubmit={handleSslPayment} className='w-11/12 md:w-8/12 lg:w-6/12 xl:w-4/12 border mx-auto py-10 px-5 md:px-7 lg:px-20 shadow-lg rounded-lg'>
                    <div>
                        <img className='mx-auto mb-3 w-40' src={sslcommerzLogo} alt="stripe logo" />
                        <h3 className='mb-6 text-center'>Enter Your Payment Info</h3>
                    </div>

                    <label className='label block'>Email <span className='text-red-600'>*</span></label>
                    <input type="email" placeholder='Your Email' className='input input-bordered w-full' />

                    <button className='btn bg-black w-full mt-3 mb-5 text-white' type="submit" disabled={!stripe || !clientSecret}>
                        Pay (BDT {totalPrice})
                    </button>
                </form>
            }
        </div>
    )
}

export default CheckoutForm
