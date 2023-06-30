import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/EN_logo.png";
const Footer = () => {


  return (
    <nav className="bg-white w-full flex  justify-between items-center mx-auto px-8 h-20 ">
      <div className="w-full flex justify-between
            items-center max-w-7xl mx-auto">
        <Link to="/posts" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-9 h-9 object-contain rounded-full" />
          <p className="text-black text-[25px] font-semibold cursor-pointer hidden sm:block">EveryNote &nbsp;</p>
        </Link>
      </div>


    </nav>
  )
}

export default Footer;
