import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom"

import { useStateContext } from '../../context'
import { CustomButton, CountBox, Loader} from "../../components"
import { calculateBarPercentage, daysLeft } from '../../utils'
import { thirdweb, loader } from '../../assets'

const CampaignDetail = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const { getDonations, donateCampaign, address, contract } = useStateContext()

    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState('0');
    const [donators, setDonators] = useState([]);
    
    const remainingDays = daysLeft(state.deadline);

    const handleDonate = async() => {
        setIsLoading(true)
        if(amount && (amount > 0)) {
            await donateCampaign(state.pId, amount)
        }
        setIsLoading(false)
        navigate("/")
    }

    useEffect(() => {
        const allDonations = async() => {
          if(contract) {
             const donations = await getDonations(state.pId);
             
             setDonators(donations)
          }
        }

        allDonations()

        console.log(state.amountCollected)
    }, [state.pId, contract, address])


  return (
    <div>
        { isLoading && <Loader transaction="Donating is in progress, please wait .." /> }

        <div className="w-full flex md:flex-row flex-col justify-between mt-[10px] gap-[20px] ">

           <div className='flex flex-col'>
            <img src={state.image} alt="campaign" className='w-full h-[410px] object-cover rounded-xl' />
            
            <div className='relative w-full h-[5px] bg-[#3a3a43] mt-[10px] '>
              <div 
                style={{ width: `${calculateBarPercentage(state.target, state.amountCollected)}`, maxWidth: "100%" }} 
                className="absolute h-full bg-[#4adc86] " />
            </div>
          </div>

          <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
            <CountBox title="Days Left" value={remainingDays} />
            <CountBox title={`Raised of ${state.target}`} value={state.amountCollected} amountRaised />
            <CountBox title="Total Backers" value={donators.length} />
          </div>
        </div> 

        <div className="flex lg:flex-row flex-col mt-[20px] gap-5 ">
           <div className="flex flex-[2] flex-col gap-[40px]">
              <div>
                 <h4 className="font-epilogue font-semibold text-white text-[18px] uppercase "> Campaign Creator </h4>

                 <div className='mt-[20px] flex flex-wrap items-center gap-[14px]'>
                    <div className='w-[52px] h-[52px] flex items-center justify-center bg-[#2c2f32] rounded-full cursor-pointer'>
                        <img src={thirdweb} alt="creator" className='w-[30px] h-[30px] object-contain' />
                    </div>

                    <div>
                      <h4 className='font-epilogue font-semibold text-[16px] text-white break-all'> {state.owner} </h4>
                      <p className='font-epilogue text-[#808191] mt-[5px] text-[14px] font-normal'> 10 Campaigns </p>
                    </div>
                 </div>
              </div>

              <div>
                 <h4 className="font-epilogue font-semibold text-white text-[18px] uppercase "> Campaign Description </h4>

                 <div className="mt-[5px]">
                     <p className='font-epilogue font-normal text-[#808191] text-[14px] '> { state.description } </p>
                 </div>
              </div>

              <div>
                 <h4 className="font-epilogue font-semibold text-white text-[18px] uppercase "> Donators </h4>

                 <div className="mt-[5px] flex flex-col gap-4">
                      { donators.length > 0 ? donators.map((item, index) => (
                        <div className='flex justify-start items-center gap-4' key={`${item.donator}-${index}`}>
                           <p className="font-epilogue font-normal text-[#b2bdb3] leading-[30px] text-[14px] "> { index + 1 }. {item.donator} &nbsp; -- </p>
                           <p className="font-epilogue font-normal text-[#808191] leading-[30px] text-[14px] "> ({item.donation} ETH) </p>
                         </div>
                      )) : (
                        <p className='font-epilogue font-normal text-[#808191] text-[14px] '> No donators yet, be the first one now! </p>
                      ) }
                 </div>
              </div>

           </div>

           <div className="flex-1 sm:mt-[20px] mt-[10px]">
              <h4 className="font-epilogue font-semibold text-white text-[18px] uppercase "> Donate Now </h4>

              <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
                 <p className='font-epilogue font-medium text-[20px] text-center text-[#808191] leading-[30px] '> Donate with no rewards </p>

                 <div className="mt-[20px]">
                     <input type="text" placeholder='ETH 0.01' className='w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent text-white font-epilogue text-[16px]  placeholder:text-[#4b5264] rounded-xl'
                      value={amount}
                      onChange={e => setAmount(e.target.value)}
                      />
                 </div>
                 <div className="mt-[20px]">
                    { isLoading ? <img src={loader} alt="loader" /> : 
                      <CustomButton 
                          styles="w-full bg-[#3a3ab3] " title='Fund Campaign'
                          handleClick={handleDonate}
                          />
                     }
                 </div>
              </div>
           </div>
        </div>
    </div>
  )
}

export default CampaignDetail