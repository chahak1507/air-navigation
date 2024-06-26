export default function Section1() {
    return (
        <div className='section-1 flex bg-white h-[60%]' >
            <div className="left mt-6 ml-6 w-full h-full p-4">
                <div className='ml-20 mt-20'>
                    <h1 className=' font-mono text-black text-5xl my-4 w-3/4'>Comprehensive Flight Tracking and Route Planning</h1>
                    <p className='font-medium text-xl text-gray-800 my-4 w-3/4'>Optimize your flights with real-time data, weather insights, and risk mitigation tools</p>
                    <ul className='flex gap-4 text-white text-sm'>
                        <li className='cursor-pointer bg-black p-2 border rounded-xl hover:text-white hover:bg-gray-500  transition-all'>
                            <a href="#flight-dashboard">Get Started</a>
                        </li>
                        <li className='cursor-pointer bg-black p-2 border rounded-xl hover:text-black hover:bg-gray-50 hover:border border-black transition-all'>
                            <a href="https://drive.google.com/drive/folders/1vLHqBkQEZaYx6D1_x0IUcmYcWl_yz6-d"  target="_blank">Learn More</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="right mt-6 ml-6 w-[65%] pt-20 pr-20">
                <img className='w-[85%] h-[85%] object-cover shadow-lg shadow-black rounded-xl' src="/hero-img.png" alt="" />
            </div>
        </div>
    )
}