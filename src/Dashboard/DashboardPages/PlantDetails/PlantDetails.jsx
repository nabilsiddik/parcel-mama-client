import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import PurchaseModal from '../../../Modals/PurchaseModal/PurchaseModal'

const PlantDetails = () => {

    const {id} = useParams()
    let [isOpen, setIsOpen] = useState(false)

    const {data: plant, isLoading, refetch} = useQuery({
        queryKey: ['plant', id],
        queryFn: async () => {
            const {data} = await axios.get(`${import.meta.env.VITE_MAIN_URL}/plants/${id}`)
            return data
        }
    })

    if(isLoading){
        return <div className='flex justify-center mt-20'>
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    }

    return (
        <div>
            <PurchaseModal isOpen={isOpen} setIsOpen={setIsOpen} plant = {plant} refetch = {refetch}/>
            <h1>Details Of Plant</h1>
            <img src={plant?.imageUrl} alt="" />
            <h2>{plant?.name}</h2>
            <p>{plant?.description}</p>
            <p>{plant?.price}</p>
            <p>{plant?.category}</p>
            <p>{plant?.quantity}</p>
            <button onClick={() => setIsOpen(true)} className='btn bg-purple-600 text-white font-bold'>{plant?.quantity > 0 ? 'Purchase' : 'Out Of Stock'}</button>
        </div>
    )
}

export default PlantDetails
