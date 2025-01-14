import React, { useContext } from 'react'
import { authContext } from '../../Contexts/AuthContext/AuthContext'
import { useLoaderData } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const UpdatePage = () => {

    const { user } = useContext(authContext)

    const { tutorialImage, tutorialName, tutorEmail, price, language, description, review, _id } = useLoaderData()

    const handleUpdateTutorial = (e) => {
        e.preventDefault()

        const form = e.target
        const tutorialName = form.tutorialName.value
        const tutorialImage = form.tutorialImageUrl.value
        const price = form.price.value
        const language = form.language.value
        const description = form.description.value

        const updatedTutorial = {
            tutorialImage,
            tutorialName,
            price,
            language,
            description,
        }

        // Update tutorial to database
        axios.patch(`${import.meta.env.VITE_MAIN_URL}/update-tutorial/${_id}`, updatedTutorial)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "center center",
                        icon: "success",
                        title: "Updated Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })

    }

    return (
        <div id='update_page'>
            <div className="container py-10">
                <h1 className='mb-10 text-center'>Update Tutorial</h1>
                <form onSubmit={handleUpdateTutorial} className='w-11/12 md:w-8/12 lg:w-6/12 mx-auto'>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text"> Tutor Name</span>
                        </label>
                        <input type="text" placeholder="Tutor Name" defaultValue={user && user?.displayName} className="input input-bordered" disabled />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Tutor Email</span>
                        </label>
                        <input type="text" defaultValue={user && user?.email} placeholder="Tutor Email" className="input input-bordered" disabled />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Tutorial Name<span className='text-red-600'> *</span></span>
                        </label>
                        <input defaultValue={tutorialName} name='tutorialName' type="text" placeholder="Tutorial Name" className="input input-bordered" />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Image URL<span className='text-red-600'> *</span></span>
                        </label>
                        <input defaultValue={tutorialImage} name='tutorialImageUrl' type="text" placeholder="Image URL" className="input input-bordered" />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text dark:text-white">Language<span className='text-red-600'> *</span></span>
                        </label>
                        <select className='input input-bordered' name="language" defaultValue={language}>
                            <option value="english">English</option>
                            <option value="bangla">Bangla</option>
                            <option value="spanish">Spanish</option>
                            <option value="french">French</option>
                            <option value="german">German</option>
                            <option value="italian">Italian</option>
                            <option value="chinese">Chinese</option>
                            <option value="arabic">Arabic</option>
                            <option value="japanese">Japanese</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Price<span className='text-red-600'> *</span></span>
                        </label>
                        <input defaultValue={price} name='price' type="number" placeholder="Price" className="input input-bordered" />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description<span className='text-red-600'> *</span></span>
                        </label>
                        <textarea defaultValue={description} name='description' placeholder="Description..." className="textarea textarea-bordered" />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Review</span>
                        </label>
                        <input name='review' defaultValue={0} type="number" placeholder="Review" disabled className="input input-bordered" />
                    </div>

                    <div className="submit">
                        <input type="submit" value={'Update Tutorial'} className='btn w-full mt-5 bg-primary hover:bg-hover text-white' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdatePage
