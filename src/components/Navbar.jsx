import React, { useState } from 'react'

const Navbar = ({ optimalPath }) => {
  const [showAlert, setShowAlert] = useState(false)
  return (
    <nav className='flex justify-between bg-black text-white py-2 relative'>
      <div className="logo flex items-center">
        <img className='ml-5 w-7 h-7 invert mr-2' src="src/assets/aeroplane.svg" alt="" />
        <span className='font-bold text-white text-2xl mr-8'>Air Navigation</span>
        <div className='flex gap-6 ml-10 text-md'>
          <a href="#" className='hover:underline transition-all'>Home</a>
          <a href="#flight-dashboard" className='hover:underline transition-all'>Flights</a>
          <a href="#optimize-your-flights" className='hover:underline transition-all'>Optimize your flights</a>
          <button onMouseDown={() => { setShowAlert(prev => !prev) }} className='hover:underline transition-all relative'>
            Alerts
            {showAlert && <Alert optimalPath={optimalPath} />}
          </button>
          <a href="#footer" className='hover:underline transition-all'>Contact Us</a>

        </div>
      </div>

      {/* <ul className='flex gap-4 mx-9 text-white text-lg font-bold'>
        <li className='cursor-pointer bg-black p-2 border rounded-xl hover:bg-white hover:text-black transition-all'>Sign in</li>
        <li className='cursor-pointer bg-black p-2 border rounded-xl hover:bg-white hover:text-black transition-all'>Sign up</li>
      </ul> */}
    </nav>
  )
}

const Alert = ({ optimalPath }) => {
  if (!optimalPath) return
  const optimal = optimalPath[optimalPath.length - 1]
  return (
    <>
      <div className='p-4 rounded-md absolute top-full z-10 shadow-xl bg-white text-black min-w-64'>
        <h3 className='text-start text-xl mb-3'>Hello ✌️</h3>
        <ul className="text-lg flex flex-col items-start gap-1">
          <li>Temperature: {optimal.temperature}</li>
          <li>Wind speed: {optimal.wind_speed}</li>
          <li>Precipitation: {optimal.precipitation}</li>
        </ul>
      </div>
    </>
  )
}

export default Navbar
