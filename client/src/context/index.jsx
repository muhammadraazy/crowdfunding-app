import { useContext, createContext } from "react"
import { useContract, useContractWrite, useContractRead, useAddress, useMetamask, useBalance } from "@thirdweb-dev/react"
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import {ethers} from "ethers"

const StateContext = createContext();

export const StateContextProvider = ({children}) => {
       const { contract } = useContract('0x3BA8736B15D2753be1b4A3d2DA4bA2660D12bB37');
       const { mutateAsync: createCampaign } = useContractWrite(contract, "createCampaign")
   
       
      //    get the connected wallet address
      const address = useAddress()
       //    hooks for connecting to metamask
       const connect = useMetamask()
       const { data: walletBalance } = useBalance(NATIVE_TOKEN_ADDRESS)
       
       const publishCampaign = async(form) => {
        try {
            const data = await createCampaign([
               address,
               form.title,
               form.description,
               form.target,
               new Date(form.deadline).getTime(),
               form.image
            ])
            
            console.log("submitting campaign", data)
        } catch (error) {
            console.log("submitting campaign failed", error)
        }
       }

       const donateToCampaign = async(pId, amount) => {
         try {
            const donate = await contract.call("donateCampaign", pId, { value: ethers.utils.parseEther(amount) });
 
            console.log("donate successfully",donate)
            return donate

         } catch (error) {
            console.log("donate failed", error)
         }
       }

       const getAllCampaigns = async() => {
          const campaigns = await contract.call('getCampaigns')
         //  return campaigns
        const parsedCampaigns = campaigns.map((campaign, i) => {
           const { owner, title, description, target, deadline, amountCollected, image } = campaign;

           return {
              owner,
              title, 
              description, 
              target: ethers.utils.formatEther(target.toString()),
              deadline: Number(deadline), 
              amountCollected: ethers.utils.formatEther(amountCollected.toString()),
              image,
              pId: i
           }
        })

        return parsedCampaigns
       }

       const getUserCampaigns = async() => {
           const campaigns = await getAllCampaigns();
           const userCampaigns = campaigns.filter(campaign => {
               return campaign.owner === address;
           })

           return userCampaigns
       }

       const getDonations = async(pId) => {
           const donations = await contract.call("getDonators", pId)
           const numberOfDonations = donations[0].length;

           let allDonations = []

           for(let d = 0; d < numberOfDonations; d++) {
               allDonations.push({
                  donator: donations[0][d],
                  donation: ethers.utils.formatEther(donations[1][d].toString())
               })
           }


           return allDonations;
       }

       return (
          <StateContext.Provider value={{
             address,
             connect,
             contract,
             walletBalance,
             createCampaign: publishCampaign,
             getCampaigns: getAllCampaigns,
             userCampaigns: getUserCampaigns,
             donateCampaign: donateToCampaign,
             getDonations
          }} >
             {children}
          </StateContext.Provider>
       )
}


export const useStateContext = () => useContext(StateContext)