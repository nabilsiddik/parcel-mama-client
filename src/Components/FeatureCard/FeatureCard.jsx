import React from 'react'

const FeatureCard = ({title, description, icon}) => {
  return (
    <div className="text-center border py-10 px-3 rounded-lg group bg-white">
        <div className="flex justify-center mb-4">
          <img
            src={icon && icon}
            alt="icon"
            className="lg:w-24 lg:h-24 w-20 h-20  group-hover:scale-[1.2] transition-all"
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
