import React, { useEffect, useState, useId } from 'react';
import axios from 'axios';


export default function VisualizeData() {
    return (
        <>
            <div className="section-3 bg-[#ebedf2b7] flex flex-col mt-10 mb-10 gap-8">
                <FLightDashboard />
                <VisualizeAndAnaylyzeFlightData />
            </div>
        </>
    )
}

function FLightDashboard() {
    return (
        <div className="left ml-20 ">
            <h1 className='font-semibold text-4xl font-mono w-[80%]'>Flight Dashboard</h1>
            <div className="grid grid-cols-3 justify-around mt-4 text-black bg-white p-4 border-gray-500 border rounded-xl ">
                <div className="card bg-gray-400 p-4 w-2/3 rounded-xl ml-4">
                    <h1 className='font-semibold mb-2'>Weather</h1>
                    <ul className='flex flex-col gap-2' >
                        <li className='flex gap-2'>
                            <img src="src\assets\cloud.svg" alt="" />
                            <li>Partly Cloudy</li>
                        </li>
                        <li className='flex gap-2'>
                            <img src="src\assets\temp.svg" alt="" />
                            <li>20°C</li>
                        </li>
                        <li className='flex gap-2'>
                            <img src="src\assets\wind.svg" alt="" />
                            <li>10km/h</li>
                        </li>
                    </ul>
                </div>
                <div className="card bg-gray-400 p-4 w-2/3 rounded-xl ml-4">
                    <h1 className='font-semibold mb-2'>Environmental</h1>
                    <ul className='flex flex-col gap-2' >
                        <li className='flex gap-2'>
                            <img src="src\assets\leaf.svg" alt="" />
                            <li>Low Emissions Moderate</li>
                        </li>
                        <li className='flex gap-2'>
                            <img src="src\assets\net.svg" alt="" />
                            <li>Noise Normal</li>
                        </li>
                        <li className='flex gap-2'>
                            <img src="src\assets\radiation.svg" alt="" />
                            <li>Radiation</li>
                        </li>
                    </ul>
                </div>
                <div className="card bg-gray-400 p-4 w-2/3 rounded-xl ml-4">
                    <h1 className='font-semibold mb-2'>System Status</h1>
                    <ul className='flex flex-col gap-2' >
                        <li className='flex gap-2'>
                            <img src="src\assets\online.svg" alt="" />
                            <li>Online</li>
                        </li>
                        <li className='flex gap-2'>
                            <img src="src\assets\GPS.svg" alt="" />
                            GPS Connected</li>
                        <li className='flex gap-2'>
                            <img src="src\assets\data.svg" alt="" />
                            <li> Data Synced</li>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

function VisualizeAndAnaylyzeFlightData() {
    const [weather, setWeather] = useState([])
    const [environment, setEnvironment] = useState([])
    const [electronicSystem, setElectronicSystem] = useState([])
    const [optimisedData, setOptimisedData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const weatherResponse = await axios.get('/weather.json');
            const environmentResponse = await axios.get('/environment.json');
            const systemFailuresResponse = await axios.get('/electronic-system.json');

            const weatherData = weatherResponse.data;
            const environmentData = environmentResponse.data;
            const systemFailuresData = systemFailuresResponse.data;

            const combinedData = weatherData.map(wd => {
                const environment = environmentData.find(ed => ed.flight_id === wd.flight_id && ed.date === wd.date);
                const systemFailures = systemFailuresData.find(sd => sd.flight_id === wd.flight_id && sd.date === wd.date);
                return {
                    ...wd,
                    ...environment,
                    ...systemFailures
                };
            });

            setWeather(weatherData)
            setEnvironment(environmentData)
            setElectronicSystem(systemFailuresData)
            setOptimisedData(combinedData);
        };

        fetchData();
    }, [])
    return (
        <div className="right max-w-full mx-auto">
            <h1 className='font-mono text-5xl mb-4 text-center'>Visualize and Analyze Your Flight Data</h1>
            <p className='text-xl text-gray-600 mb-4 text-center'>Our interactive map and comprehensive data analysis tools provide you with the insights you need to make informed decisions.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 bg-wh gap-x-4 gap-y-5 p-5">
                <VisualizeDataCard heading="Flight Tracking" para="Monitor your flights in real-time on an interactive map." data={weather} />
                <VisualizeDataCard heading="Route Analysis" para="Optimize your routes based on weather, airspace, and other factors." data={environment} />
                <VisualizeDataCard heading="Risk Assessment" para="Identify and mitigate potential challenges along your flight path." data={electronicSystem} />
                <VisualizeDataCard heading="Reporting and Analytics" para="Generate comprehensive reports and insights to support your decision-making." data={optimisedData} />

            </div>
        </div>
    )
}

function VisualizeDataCard({ heading, para, data }) {
    return (
        <div className="card p-4 w-[100%] mt-4 border bg-white border-gray-400 rounded-lg overflow-x-clip">
            <h1 className='text-xl font-mono font-semibold text-center'>{heading}</h1>
            <p className='text-sm text-gray-600 text-center'>{para}</p>
            <TalbeWithMultipleCols data={data} />
        </div>
    )
}

function TalbeWithMultipleCols({ data }) {
    const uniqueId = useId()
    if (!data[0]) return <></>
    return (
        <>
            <section className="mx-auto w-full max-w-full overflow-x-auto px-4 py-4">
                <div className="mt-6 flex flex-col">
                    <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            {Object.keys(data[0]).map((value, index) => {
                                                return (<th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                                    key={`table-${uniqueId}-col-${index}`}
                                                >
                                                    <span>{value}</span>
                                                </th>)
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {data.map((value, index) => (
                                            <tr key={`table-${uniqueId}-row-${index}`} >
                                                {Object.keys(data[index]).map((key, i) => (
                                                    <td key={`table-${uniqueId}-cell-${i}`} className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                                        {data[index][key]}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

