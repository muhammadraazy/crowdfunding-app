import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import CustomButton from "../CustomButton"

import { logo, menu, thirdweb, search } from "../../assets"
import { navlinks } from "../../constants"
import { useStateContext } from '../../context'

const Navbar = () => {
      const navigate = useNavigate()
      const { address, connect } = useStateContext()
      const [isActive, setIsActive] = useState('dashboard');
      const [toggleDrawer, setToggleDrawer] = useState(false);

  return (
    <div className='flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6'>
       <div className='lg:flex-1 flex max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[60px]'>
          <input type="text" 
            placeholder='Search for campaigns'
            className='flex w-full font-epilogue font-normal text-white bg-transparent outline-none placeholder:text-[#4b5264]' />

          <div className='w-[72px] h-full rounded-[20px] flex justify-center items-center cursor-pointer bg-[#4acd8d]'>
            <img src={search} alt="search" className='w-[15px] h-[15px] object-contain' />
          </div>
       </div>

       <div className='sm:flex hidden justify-end gap-4'>
          <CustomButton 
            btnType="button"
            title={address ? "Create Campaign" : "Connect Wallet"}
            styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
            handleClick={() => {
               if(address) navigate("/create-campaign")
               else connect()
            }}
          />

          <Link to='/profile'>
              <div className='w-[52px] h-[52px] bg-[#2c2f32] rounded-full flex flex-col justify-center items-center '>
                 <img src={thirdweb} alt="profile" className='w-[60%] h-[60%] object-contain cursor-pointer' />
              </div>
          </Link>
       </div>
         
         {/* small navigation */}
       <div className='sm:hidden flex justify-between items-center relative'>
             <div className='w-[40px] h-[40px] bg-[#2c2f32] rounded-full flex flex-col justify-center items-center '>
                 <img src={logo} alt="profile" className='w-[60%] h-[60%] object-contain cursor-pointer' />
            </div>

            <img src={menu} alt="menu" 
               className='w-[34px] h-[34px] object-contain cursor-pointer mr-4' 
               onClick={() => setToggleDrawer(prevDrawer => !prevDrawer)}  
               />
            
            <div className={`absolute top-[60px] left-0 right-0 bg-[#1c1c24] shadow-secondary py-4 ${!toggleDrawer ? "translate-y-[-100vh]" : "translate-y-0"} transition-all duration-700 `}>
                  <ul className="mb-4">
                     { navlinks.map(link => (
                        <li
                           key={link.name}
                           className={`p-4 flex ${isActive === link.name && "bg-[#3a3a43]"} ${!link.disabled && "cursor-pointer"} text-white font-medium `} 
                           onClick={() => {
                              setIsActive(link.name)
                              setToggleDrawer(false)
                              navigate(link.link)
                           }}                     
                           > 
                              <img src={link.imgUrl} alt="link" className={`object-contain w-[24px] h-[24px] ${isActive == link.name ? "grayscale-0" : "grayscale" } `} />
                              <p className={`ml-[20px] font-epilogue font-semibold text-[14px] ${isActive ? "text-[#1dc071]" : "text-[#808191]" } `}> {link.name} </p>
                           </li>
                     )) }
                  </ul>

                  <CustomButton 
                     btnType="button"
                     title={address ? "Create Campaign" : "Connect Wallet"}
                     styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
                     handleClick={() => {
                        if(address) navigate("/create-campaign")
                        else {
                           connect()
                           console.log("connectingg")
                        }
                     }}
                  />
            </div>
       </div>
    </div>
  )
}

export default Navbar