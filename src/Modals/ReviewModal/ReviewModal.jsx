import React, { useContext, useEffect, useState } from 'react'
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { authContext } from '@/Contexts/AuthContext/AuthContext'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useQuery } from '@tanstack/react-query'


const ReviewModal = ({ isOpen, setIsOpen, parcelId }) => {

    const { user } = useContext(authContext)
    const [deliveryManId, setDeliveryManId] = useState(null)
    const [parcelStatus, setParcelStatus] = useState('')

    // get current user
    const {
        data: currentUser = {},
    } = useQuery({
        queryKey: ["user", user?.email],
        queryFn: async () => {
            const { data } = await axios.get(
                `${import.meta.env.VITE_MAIN_URL}/user/${user?.email}`
            );

            return data;
        },
    });

    console.log(currentUser._id, currentUser.role)

    // Fetch delivery man id
    useEffect(() => {
        const fetchDeliveryManId = async () => {
            if (parcelId) {
                try {
                    const res = await axios.get(
                        `${import.meta.env.VITE_MAIN_URL}/deliveryman/${parcelId}`
                    );
                    setDeliveryManId(res.data);
                } catch (err) {
                    console.log('Error while getting deliveryman id', err)
                }
            }
        }

        fetchDeliveryManId();
    }, [parcelId, isOpen])


    // Get parcel status
    useEffect(() => {
        const getCurrentParcel = async () => {
            if (parcelId) {
                try {
                    const res = await axios.get(
                        `${import.meta.env.VITE_MAIN_URL}/parcel/${parcelId}`
                    );
                    setParcelStatus(res.data.status);
                } catch (err) {
                    console.log('Error while getting deliveryman id', err)
                }
            }
        }

        getCurrentParcel();
    }, [parcelId, isOpen])

    // Submit review
    const handleSubmitReview = async (parcelId, e) => {
        e.preventDefault()

        const form = e.target
        const rating = parseInt(form.rating.value)
        const feedback = form.feedback.value
        const reviewGiver = {
            name: user?.displayName,
            image: user?.photoURL,
        }
        const reviewDate = new Date()
        const deliveryMan = deliveryManId

        const review = {
            rating,
            feedback,
            reviewGiver,
            deliveryMan,
            reviewDate
        }

        // Post review to database
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_MAIN_URL}/reviews`, review)

            if (data.insertedId) {
                // Update rating on deliveryman
                const { data } = await axios.patch(`${import.meta.env.VITE_MAIN_URL}/update-deliverman-rating/${parcelId}`, { rating: rating })
                if (data.modifiedCount > 0) {
                    console.log('success')
                } else {
                    console.log('not success')
                }

                Swal.fire({
                    position: "center center",
                    icon: "success",
                    title: "Thanks for Submitting Review",
                    showConfirmButton: false,
                    timer: 1500,
                })
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong! While Submitting the review",
                    footer: `${error.code}. ${error.message}`,
                })
            }

        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 flex w-full items-center justify-center p-2">
                    <DialogPanel className="w-10/12 md:w-8/12 lg:w-6/12 space-y-4 border p-4 md:p-10 pt-5 shadow-xl bg-white text-black rounded-lg">
                        <DialogTitle className="font-bold text-center text-2xl md:text-3xl">Give Review</DialogTitle>

                        <form onSubmit={(e) => handleSubmitReview(parcelId, e)}>
                            <div className='mb-3'>
                                <Input name='rating' className='' max='5' min='1' type='number' placeholder='Rating (1 to 5)' />
                            </div>
                            <div className='mb-3'>
                                <Textarea name='feedback' rows='5' placeholder='Write your feedback ...' />
                            </div>
                            <div className='mb-3'>
                                <Input disabled={(deliveryManId && parcelStatus === 'delivered') ? false : true} className='bg-black text-white cursor-pointer' type='submit' value='Submit' />
                            </div>
                        </form>

                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    )
}

export default ReviewModal
