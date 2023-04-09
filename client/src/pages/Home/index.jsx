import React, { useState, useEffect } from 'react'
import { useStateContext } from '../../context'
import { DisplayCampaigns } from "../../components"
import { ethers } from 'ethers'

const Home = () => {
    const { getCampaigns, contract, address, walletBalance } = useStateContext()
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(false)

    const fetchAllCampaigns = async() => {
        setLoading(true)
        const allCampaigns = await getCampaigns();
        setCampaigns(allCampaigns)
        setLoading(false)

        console.log(campaigns)
        console.log(ethers.utils.formatEther(walletBalance.value.toString()))
      }

      useEffect(() => {
        if(contract){
          fetchAllCampaigns()
        }
    }, [contract, address]);

  return (
    <DisplayCampaigns title="All Campaigns" loading={loading} campaigns={campaigns} />
  )
}

export default Home