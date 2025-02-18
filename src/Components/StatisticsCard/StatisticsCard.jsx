import React from 'react'
import CountUp from 'react-countup';

const StatisticsCard = ({number, text}) => {
    return (
        <div className='text-center'>
            <h2 className='text-5xl mb-2 text-red-600'><CountUp end={number} />+</h2>
            <p className='text-xl font-bold'>{text}</p>
        </div>
    )
}

export default StatisticsCard
