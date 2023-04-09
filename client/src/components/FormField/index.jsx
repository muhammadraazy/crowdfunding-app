import React from 'react'

const FormField = ({ labelName, placeholder, inputType, value, handleChange, isTextarea }) => {
  return (
    <label className='flex-1 flex flex-col w-full'>
        { labelName && (
            <span className='font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px] '> { labelName }* </span>
        ) }
        { isTextarea ? (
            <textarea
                required
                placeholder={placeholder} 
                value={value}
                rows={10}
                onChange={handleChange}
                className='py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43 bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px] '
             />
        ) : (
            <input 
                required
                type={inputType} 
                placeholder={placeholder} 
                step="0.1"
                value={value}
                onChange={handleChange}
                className='py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43 bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px] '
            />
        ) }
    </label>
  )
}

export default FormField