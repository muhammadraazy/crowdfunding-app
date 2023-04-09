import React from 'react'
import { tagType, thirdweb } from '../../assets'
import { daysLeft } from '../../utils'

const FundCard = ({ owner, title, description, target, deadline, amountCollected, image, handleClick }) => {
     const remainingDays = daysLeft(deadline)

  return (
    <div className='sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer mt-[15px]' onClick={handleClick}>
        <img src={image} alt="fund" className='w-full h-[158px] object-cover roudned-[15px] ' />

        <div className="flex flex-col p-4">
            <div className='flex items-center'>
                <img src={tagType} alt="tag" className=' w-[17px] h-[17px] object-contain' />
                <p className='font-epilogue ml-[12px] mt-[2px] text-[14px] font-medium text-[#808191]  '> Category: blockchain </p>
            </div>

            <div className='block mt-[15px]'>
                <h3 className='font-epilogue text-[16px] font-semibold text-white leading-[26px] truncate'> {title} </h3>
                <p className='font-epilogue text-[12px] font-normal text-[#808191] leading-[18px] truncate'> {description} </p>
            </div>

            <div className="flex justify-between flex-wrap mt-[15px] gap-2 ">
                <div className="flex flex-col">
                    <h4 className='font-epilogue font-semibold text-[14px] text-[#b2b3bd]'> {amountCollected} ETH </h4>
                    <p className='font-epilogue text-[12px] font-normal leading-[16px] text-[#808191] mt-[5px] sm:max-w-[150px] truncate '> Amount Raised { target } ETH </p>
                </div>
                <div className="flex flex-col">
                    <h4 className='font-epilogue text-[#808191] text-[14px]'> { remainingDays } </h4>
                    <p className='text-[#b2b3bd] font-normal font-epilogue text-[12px] '> Days Left </p>
                </div>
            </div>

            <div className="flex items-center mt-[20px] gap-[12px]">
                <div className='h-[30px] w-[30px] flex justify-center items-center gap-[12px] bg-[#13131a] rounded-full'>
                    <img src={thirdweb} alt="owner" className='h-1/2 w-1/2 object-contain' />
                </div>
                <p className=' sm:min-w-[200px] text-[12px] font-epilogue font-normal text-[#808191] truncate'> By <span className='text-[#b2b3bd]'> {owner} </span>  </p>
            </div>
        </div>
    </div>
  )
}

export default FundCard