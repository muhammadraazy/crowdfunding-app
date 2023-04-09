import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ethers } from "ethers"
import { money } from '../../assets'
import { CustomButton, FormField } from '../../components'
import { checkIfImage } from "../../utils"

import { Loader } from "../../components"
import { useStateContext } from "../../context"

const CreateCampaign = () => {
      const navigate = useNavigate();
      const { createCampaign } = useStateContext()
      const [isLoading, setIsLoading] = useState(false);
      const [form, setForm] = useState({
        name: "",
        title: "",
        description: "",
        target: "",
        deadline: '',
        image: ''
      });

      const handleFormFieldChange = (fieldname, e) => {
          setForm({ ...form, [fieldname]: e.target.value })
      }

      const handleSubmit = async(e) => {
         e.preventDefault()

         checkIfImage(form.image, async(exist) => {
             if(exist) {
              setIsLoading(true)
              await createCampaign({ ...form, target: ethers.utils.parseEther(form.target) })
              setIsLoading(false)
              navigate("/")

              console.log(form)
            } else {
              alert("Please provide a valid image URL")  
              setForm({ ...form, image: '' })
             }
         })

      }

  return (
      <div className='bg-[#1c1c24] flex flex-col justify-center items-center rounded-[10px] sm:p-10 p-4'>
          { isLoading && <Loader transaction="creating campaign in progress .." /> }
          
          <div className='flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px] cursor-pointer '>
            <h1 className='font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white'> Start Campaign </h1>
          </div>

          <form onSubmit={handleSubmit} className='flex w-full mt-[65px] flex-col gap-[30px] ' >
            <div className='flex flex-wrap gap-[40px]'>
                <FormField
                  labelName="Enter Your Name"
                  placeholder="John Doe"
                  inputType="text"
                  value={form.name}
                  handleChange={(e) => handleFormFieldChange("name", e)}
                />
                <FormField
                  labelName="Enter Title"
                  placeholder="Write title .."
                  inputType="text"
                  value={form.title}
                  handleChange={(e) => handleFormFieldChange("title", e)}
                />
            </div>

            <FormField
                  labelName="Your Story"
                  placeholder="Write your story .."
                  isTextarea
                  value={form.description}
                  handleChange={(e) => handleFormFieldChange("description", e)}
                />

              <div className='flex w-full justify-center items-center gap-[20px] p-4 bg-[#5233c0] h-[90px] rounded-[10px] '>
                <img src={money} alt="money" className='object-contain w-[40px] h-[40px]' />
                <h4 className='font-epilogue text-[20px] font-bold text-white' > You will get 100% of raised amount </h4>
              </div>

              <div className='flex flex-wrap gap-[40px]'>
                <FormField
                  labelName="Goal"
                  placeholder="ETH 0.50"
                  inputType="text"
                  value={form.target}
                  handleChange={(e) => handleFormFieldChange("target", e)}
                />
                <FormField
                  labelName="End Date"
                  placeholder="End date .."
                  inputType="date"
                  value={form.deadline}
                  handleChange={(e) => handleFormFieldChange("deadline", e)}
                />
            </div>

            <FormField
                  labelName="Campaign Image"
                  placeholder="campaign image url .."
                  inputType="text"
                  value={form.image}
                  handleChange={(e) => handleFormFieldChange("image", e)}
              />

            <div className='flex justify-end items-center mt-[40px]'>
              <CustomButton 
                  styles='bg-[#1dc071]' 
                  title='Submit Campaign'
                  btnType="submit"
                />
            </div>
          </form>
      </div>

  )
}

export default CreateCampaign