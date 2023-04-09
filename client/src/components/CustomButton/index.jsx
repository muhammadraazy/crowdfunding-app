import React from 'react'

const CustomButton = ({ btnType, title, styles, handleClick }) => {
  return (
    <button type={btnType} className={`${styles} font-epilogue font-semibold text-white px-4 min-h-[52px] rounded-[10px] hover:opacity-[0.7]`}
      onClick={handleClick}
     >
        { title }
    </button>
  )
}

export default CustomButton