import React from 'react'
import { FaRobot, FaRegCircleUser } from "react-icons/fa6";

const Navbar = () => {
  return (
    <div>
      <div className="nav flex items-center justify-between h-[100px] px-[150px]">
        <div className="logo flex items-center gap-[10px]">
          <i className='text-[50px]'><FaRobot /></i>
          <h3 className='text-[25px] font-[700]'>Bot<span className='text-purple-500'>GPT</span></h3>
        </div>

        <div className="user">
         <i className='text-[27px] cursor-pointer'><FaRegCircleUser/></i>
        </div>
      </div>

    </div>
  )
}

export default Navbar