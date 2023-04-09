import React, { useState, useEffect } from 'react'
import { useStateContext } from '../../context'
import { DisplayCampaigns } from "../../components"

const Profile = () => {
    const { userCampaigns, contract, address } = useStateContext()
    const [campaigns, setCampaigns] = useState([]);
    const [isLoading, setIsLoading] = useState(false)


    const fetchAllCampaigns = async() => {
        setIsLoading(true)
        const allCampaigns = await userCampaigns();
        setCampaigns(allCampaigns)
        setIsLoading(false)

        console.log(campaigns)
      }

      useEffect(() => {
        if(contract) fetchAllCampaigns()
    }, [contract, address]);

  return (
    <DisplayCampaigns title="All Campaigns" loading={isLoading} campaigns={campaigns} />
  )
}

export default Profile