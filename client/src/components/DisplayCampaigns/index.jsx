import React from 'react'
import { useNavigate } from 'react-router-dom'
import { loader } from '../../assets'
import FundCard from '../FundCard'

const DisplayCampaigns = ({title, loading, campaigns}) => {
    const navigate = useNavigate()

    const handleNavigate = (campaign) => {
        navigate(`/campaign-detail/${campaign.title}`, {
            state: campaign
        })
    }

  return (
    <div>
        <h1 className='font-epilogue font-semibold text-[18px] text-white'> {title} ({campaigns.length}) </h1>

        { loading && (
            <div>
                <img src={loader} alt="loader" className='w-[100px] h-[100px] object-contain' />
            </div>
        ) }

        { !loading && campaigns.length === 0 && (
            <p className='font-epilogue font-semibold text-[14px] text-[#818183] leading-[38px]'> You have not created any campaigns yet </p>
        ) }

        { !loading && campaigns.length > 0 && campaigns.map(campaign => (
            <FundCard key={campaign.pId} {...campaign} handleClick={() => handleNavigate(campaign)} />
        )) }
    </div>
  )
}

export default DisplayCampaigns