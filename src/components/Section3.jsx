import { Map, Compass, Shield, Bell } from "lucide-react"
export default function Section3() {
    return (
        <div id="optimize-your-flights" className='section-2 bg-[#ebedf2b7]'>
            <div className="p-16 pb-0  hero flex">
                <div className="left w-[55%]">
                    <h1 className='text-5xl font-mono'>Optimize Your Flights with Advanced Features</h1>
                    <p className='text-lg font-thin text-gray-400'>Leverage our comprehensive tools to plan the most efficient and safe routes for your flights.</p>

                    <div className="grid mt-10 grid-cols-2  w-fit">
                        <div className="card flex flex-col gap-2 w-[80%] p-4">
                        <Map />
                            <h1 className='text-xl'>Real-time Tracking</h1>
                            <p className='text-lg text-gray-500'>Monitor your flights in real-time on an interactive map.</p>
                        </div>

                        <div className="card flex flex-col gap-2 w-[80%] p-4">
                        <Compass />
                            <h1 className='text-xl'>Route Planning</h1>
                            <p className='text-lg text-gray-500'>Plan optimal routes considering weather, airspace, and other factors.</p>
                        </div>
                        <div className="card flex flex-col gap-2 w-[80%] p-4">
                        <Shield />
                            <h1 className='text-xl'>Risk Mitigation</h1>
                            <p className='text-lg text-gray-500'>Identify and address potential challenges along your flight path.</p>
                        </div>

                        <div className="card flex flex-col gap-2 w-[80%] p-4">
                        <Bell />
                            <h1 className='text-xl'>Alerts and Notifications</h1>
                            <p className='text-lg text-gray-500'>Stay informed with customizable alerts and notifications.</p>
                        </div>
                    </div>
                </div>
                <div className="right w-[45%] p-20">
                    <img className='w-[100%] h-[90%] shadow-lg shadow-black rounded-xl object-cover' src="/section3-img.jpg" alt="" />
                </div>
            </div>
        </div>
    )
}