import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';

const AllPlants = () => {

    const {data: plants, isLoading, refetch} = useQuery({
        queryKey: ['plants'],
        queryFn: async() => {
            const {data} = await axios.get(`${import.meta.env.VITE_MAIN_URL}/plants`)
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
            <h1 className='text-center mb-5'></h1>
            {plants && plants.length > 0 ? 
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {
                        plants.map((plant) => {
                            const {name, imageUrl, description, category, price, _id} = plant
                            return <div key={_id} className="card bg-base-100 shadow-xl">
                            <figure>
                              <img className='w-full'
                                src={imageUrl}
                                alt="Shoes" />
                            </figure>
                            <div className="card-body">
                              <h2 className="card-title">{name}</h2>
                              <p>{description}</p>
                              <p>{price}</p>
                              <p>{category}</p>
                              <div className="card-actions justify-end">
                                <Link to={`/dashboard/plant-details/${_id}`} className="btn btn-primary">View Details</Link>
                              </div>
                            </div>
                          </div>
                        })
                    }
                </div>
            : <h3>No Plants Available</h3>}
        </div>
    )
}

export default AllPlants
