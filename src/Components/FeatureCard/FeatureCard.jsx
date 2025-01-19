import React from 'react'

const FeatureCard = ({title, description, icon}) => {
  return (
    <div className="text-center border py-10 px-5 rounded-lg">
        <div className="flex justify-center mb-4">
          <img
            src={icon && icon}
            alt="icon"
            className="w-24 h-24"
          />
        </div>
        <h3 className="text-xl font-bold mb-2">{title && title}</h3>
        <p className="text-gray-600 lg:w-6/12 mx-auto">
          {description && description}
        </p>
      </div>
  )
}

export default FeatureCard
