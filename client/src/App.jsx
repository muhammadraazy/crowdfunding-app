import React from 'react'
import { Routes, Route } from "react-router-dom"
import { Home, Profile, CreateCampaign, CampaignDetail } from './pages'
import { Navbar, Sidebar } from './components'

const App = () => {

  return (
    <div className='relative sm:p-8 p-4 bg-[#13131a] min-h-screen flex'>
      <div className="sm:flex hidden relative mr-10">
         <Sidebar />
      </div>

      <div className='flex-1 sm:max-w-full max-w-[1280px] mx-auto sm:pr-5'>
         <Navbar />

         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-campaign" element={<CreateCampaign />} />
            <Route path="/campaign-detail/:id" element={<CampaignDetail />} />
         </Routes>
      </div>
    </div>
  )
}

export default App