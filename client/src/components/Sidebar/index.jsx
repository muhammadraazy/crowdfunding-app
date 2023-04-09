import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Icon from "../Icon"

import { logo, sun } from "../../assets"
import { navlinks } from "../../constants"
import { useStateContext } from '../../context'

const Sidebar = () => {
  const navigate = useNavigate()
  const [isActive, setIsActive] = useState('dashboard');
  const { address } = useStateContext()

  return (
    <div className='flex justify-between items-center flex-col sticky top-5 h-[95vh]'>
        <Link to="/">
           <Icon styles="w-[52px] h-[52px] bg-[#2c3f32]" imgUrl={logo} />
        </Link>

        <div className='flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[70px] py-4 mt-12'>
           <div className='flex flex-col items-center gap-3'>
               { navlinks.map(link => (
                  <Icon
                     key={link.name}
                     {...link}
                     isActive={isActive}
                     handleClick={() => {
                        if(!link.disabled) {
                            setIsActive(link.name)

                            if(address) {
                              navigate(link.link)
                            } else {
                              navigate("/")
                            }
                        }
                     }}
                   />
               )) }
           </div>

           <Icon styles='bg-[#1c1c24] shadow-secondary' imgUrl={sun} />
        </div>
    </div>
  )
}

export default Sidebar