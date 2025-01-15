import React from 'react'
import {assets} from '../assets/assets.js'

const Navbar = () => {
  return (
    <div >
      <img src={assets.logo} alt="" className='w-32 h-21 mt-5 ml-5'/>
      <button>Logout</button>
    </div>
  )
}

export default Navbar
