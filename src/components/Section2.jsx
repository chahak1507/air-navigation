export default function Section2() {
    return (
        <div className='section-2 bg-[#111827] text-gray-300'>
            <div className="p-16 pb-0  hero flex">
                <div className="left w-[55%]">
                    <h1 className='text-5xl font-mono'>Optimize Your Flights with Advanced Features</h1>
                    <p className='text-lg font-thin text-gray-400'>Leverage our comprehensive tools to plan the most efficient and safe routes for your flights.</p>

                    <div className="grid mt-10 grid-cols-2  w-fit">
                        <div className="card flex flex-col gap-2 w-[80%] p-4">
                            <img className='h-10 w-10' src="src\assets\map.svg" alt="" />
                            <h1 className='text-xl'>Real-time Tracking</h1>
                            <p className='text-lg text-gray-500'>Monitor your flights in real-time on an interactive map.</p>
                        </div>

                        <div className="card flex flex-col gap-2 w-[80%] p-4">
                            <img className='filter invert h-10 w-10' src="src\assets\compass.svg" alt="" />
                            <h1 className='text-xl'>Route Planning</h1>
                            <p className='text-lg text-gray-500'>Plan optimal routes considering weather, airspace, and other factors.</p>
                        </div>
                        <div className="card flex flex-col gap-2 w-[80%] p-4">
                            <img className='filter invert h-10 w-10' src="src\assets\secure.svg" alt="" />
                            <h1 className='text-xl'>Risk Mitigation</h1>
                            <p className='text-lg text-gray-500'>Identify and address potential challenges along your flight path.</p>
                        </div>

                        <div className="card flex flex-col gap-2 w-[80%] p-4">
                            <img className='filter invert h-10 w-10' src="src\assets\bell.svg" alt="" />
                            <h1 className='text-xl'>Alerts and Notifications</h1>
                            <p className='text-lg text-gray-500'>Stay informed with customizable alerts and notifications.</p>
                        </div>
                    </div>
                </div>
                <div className="right w-[45%] p-20">
                    <img className='w-[100%] h-[70%] shadow-lg shadow-black rounded-xl' src="https://generated.vusercontent.net/placeholder.svg" alt="" />
                </div>
            </div>
        </div>
    )
}