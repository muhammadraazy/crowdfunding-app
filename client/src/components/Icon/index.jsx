import React from 'react'

const Icon = ({ styles, imgUrl, name, disabled, handleClick, isActive }) => {
  return (
    <div className={`w-[48px] flex items-center justify-center h-[48px] rounded-[10px] ${isActive && isActive === name && 'bg-[#2c2f32]'} ${!disabled && "cursor-pointer"} ${styles}`} onClick={handleClick}>
        { !isActive ? (
            <img src={imgUrl} alt="fund-logo" className='w-1/2 h-1/2' />
        ) : (
            <img src={imgUrl} alt="fund-logo" className={`w-1/2 h-1/2 ${isActive != name && "grayscale"}`} />
        ) }
    </div>
  )
}

export default Icon