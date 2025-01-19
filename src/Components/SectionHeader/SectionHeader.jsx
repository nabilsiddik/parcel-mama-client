import React from 'react'

const SectionHeader = ({title, description}) => {
  return (
    <div className='flex flex-col gap-1 items-center mb-8'>
      <h2>{title && title}</h2>
      <p className='w-11/12 md:w-8/12 lg:w-6/12 text-center'>{description && description}</p>
    </div>
  )
}

export default SectionHeader
