import React from 'react'
import { Phone, Mail  } from 'lucide-react';


const Footer = () => {
  return (
    <footer id='footer' className='flex justify-between bg-gray-900 text-white py-6 text-sm px-4'>
        <div className="logo flex items-center justify-evenly">
          <img className='ml-5 w-7 h-7 invert mr-2' src="src/assets/aeroplane.svg" alt="" />
            <span className='font-bold text-white mr-8'>Air NAvigation</span>
        </div>
        <div className='mr-5'>
            <ul className='flex gap-5 '>
                <p className='text-lg hover:underline flex items-center justify-center gap-2'><span><Phone size={17} /></span>+91 7976118639</p>
                <p className='text-lg hover:underline flex items-center justify-center gap-2'><span><Mail size={17}/></span>chahakkhurana05574@gmail.com</p>
            </ul>
        </div>
        {/* <div>© 2024 FlightTrack. All rights reserved.</div> */}
      
    </footer>
  )
}

export default Footer
