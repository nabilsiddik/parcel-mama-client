import React from 'react'

const IconList = ({ icon, title, text }) => {
    return (
        <div id='icon_list' className='flex items-center gap-5 pb-8'>
            <div className='border w-12 h-12 flex items-center justify-center rounded-full bg-primary text-white hover:bg-white hover:text-primary transition-all duration-[.3s]'>
                {icon && icon}
            </div>
            <div>
                <h3>{title && title}</h3>
                <p>{text && text}</p>
            </div>
        </div>
    )
}

export default IconList
