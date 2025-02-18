import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const parcelContext = createContext(null);

const ParcelContextProvider = ({ children }) => {
    const [limitedNumOfParcel, setLimitedNumOfParcel] = useState([])

    useEffect(() => {
        // Get limited number of parcels
        const getLimitedNumberOfParcels = async (limit) => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_MAIN_URL}/parcels?limit=${limit}`)
                setLimitedNumOfParcel(res.data)
            }catch(error){
                console.error("Error fetching parcel", error)
            }
        }

        getLimitedNumberOfParcels(5)
    }, [])



    const parcelContextValue = {
        limitedNumOfParcel,
    }

    return (
        <parcelContext.Provider value={parcelContextValue}>
            {children}
        </parcelContext.Provider>
    )
}

export default ParcelContextProvider
