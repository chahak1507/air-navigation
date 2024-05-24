import React, { useEffect, useState, useId } from 'react';
import axios from 'axios';
import calculateOptimalPath from './pathfinding';

export default function VisualizeData({optimalPath, setOptimalPath}) {
    return (
        <>
            <div id='flight-dashboard' className="section-3 bg-[#111827] text-gray-300 flex flex-col mt-10 mb-10 gap-8 py-10">
                <FLightDashboard />
                <VisualizeAndAnaylyzeFlightData optimalPath={optimalPath} setOptimalPath={setOptimalPath} />
            </div>
        </>
    )
}

function FLightDashboard() {
    return (
        <div className="left mx-10">
            <h1 className='font-semibold text-4xl font-mono w-[80%]'>Flight Dashboard</h1>
            <div className="grid grid-cols-3 justify-around mt-4 text-black p-4 border-gray-500 rounded-xl ">
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

function VisualizeAndAnaylyzeFlightData({optimalPath, setOptimalPath}) {
    const [weather, setWeather] = useState([])
    const [environment, setEnvironment] = useState([])
    const [electronicSystem, setElectronicSystem] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const weatherResponse = await axios.get('/weather.json');
            const environmentResponse = await axios.get('/environment.json');
            const systemFailuresResponse = await axios.get('/electronic-system.json');
            const routesResponse = await axios.get('/routes.json');
            const obstaclesResponse = await axios.get('/obstacles.json');

            const routesData = routesResponse.data;
            const weatherData = weatherResponse.data;
            const environmentData = environmentResponse.data;
            const systemFailuresData = systemFailuresResponse.data;
            const obstaclesData = obstaclesResponse.data;

            const combinedData = routesData.map(rd => {
                const weather = weatherData.find(wd => wd.route_id === rd.route_id);
                const environment = environmentData.find(ed => ed.route_id === rd.route_id);
                const systemFailures = systemFailuresData.find(sd => sd.route_id === rd.route_id);
                const obstacles = obstaclesData.find(od => od.route_id === rd.route_id);

                return {
                    ...rd,
                    temperature: weather?.weather.temperature || 'unknown',
                    wind_speed: weather?.weather.wind_speed || 'unknown',
                    visibility: weather?.weather.visibility || 'unknown',
                    precipitation: weather?.weather.precipitation || 'unknown',
                    turbulence: environment?.environment.turbulence || 'unknown',
                    bird_strike_risk: environment?.environment.bird_strike_risk || 'unknown',
                    volcanic_ash: environment?.environment.volcanic_ash || 'unknown',
                    avionics_status: systemFailures?.system_failures.avionics_status || 'unknown',
                    navigation_system: systemFailures?.system_failures.navigation_system || 'unknown',
                    communication_system: systemFailures?.system_failures.communication_system || 'unknown',
                    mountains: obstacles?.obstacles.mountains || 'unknown',
                    restricted_airspace: obstacles?.obstacles.restricted_airspace || 'unknown',
                    urban_areas: obstacles?.obstacles.urban_areas || 'unknown'
                };
            });

            setWeather(weatherData)
            setEnvironment(environmentData)
            setElectronicSystem(systemFailuresData)
            setOptimalPath(calculateOptimalPath(combinedData));
        };

        fetchData();
    }, [])

    const [hiddenOptimalPath, setHiddenOptimalPath] = useState(true)

    return (
        <div className="right max-w-full mx-auto">
            <h1 className='font-mono text-5xl mb-4 text-center'>Visualize and Analyze Your Flight Data</h1>
            <p className='text-xl text-gray-600 mb-4 text-center'>Our interactive map and comprehensive data analysis tools provide you with the insights you need to make informed decisions.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 bg-wh gap-x-4 gap-y-5 p-5">
                <VisualizeDataCard name="weather" heading="Weather" para="Monitor your flights in real-time on an interactive map." data={weather} />
                <VisualizeDataCard name="environment" heading="Environment" para="Optimize your routes based on weather, airspace, and other factors." data={environment} />
                <VisualizeDataCard name="system_failures" heading="Electronic system failure" para="Identify and mitigate potential challenges along your flight path." data={electronicSystem} /> 
                <VisualizeDataCard heading="Reporting and Analytics" para="Generate comprehensive reports and insights to support your decision-making." data={optimalPath} />
            </div>
            <div className="flex justify-center items-center mt-5">
            <button onMouseDown={() => setHiddenOptimalPath(false)} className='mx-auto px-5 py-3 rounded-md bg-yellow-300 text-black hover:opacity-90 font-bold text-lg'>Get optimal path</button>

            </div>
            <OpticamlPathDisplayer data={optimalPath[optimalPath.length-1]} hidden={hiddenOptimalPath} />
        </div>
    )
}

function OpticamlPathDisplayer({data, hidden}) {
    if(hidden) return <></>
  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl  text-center">
          <p className="mx-auto mt-6 max-w-xl font-bold text-base md:mt-10 lg:text-xl">
            The <span className="border-b-4 border-yellow-300">optimal path</span> is:
          </p>
          <h2 className="mt-8 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            {data?.path}
          </h2>

          <p
            className="inline-block mt-8 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Score: {data?.score}
          </p>
        </div>
      </div>
    </section>
  )
}


function VisualizeDataCard({ heading, para, data, name=null }) {
    return (
        <div className="card p-4 w-[100%] mt-4 border bg-white border-gray-800 rounded-lg overflow-x-clip">
            <h1 className='text-xl font-mono font-semibold text-black text-center'>{heading}</h1>
            <p className='text-sm text-gray-900 text-center'>{para}</p>
            {!name? <TableForOptimisedPath data={data} />: <TableForData name={name} data={data} />}
        </div>
    )
}

function TableForOptimisedPath({ data }) {
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

function TableForData({ data, name }) {
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
                                        <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                                >
                                                    <span>Route Id</span>
                                                </th>
                                            {Object.keys(data[0][name]).map((value, index) => {
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
                                                <td key={`table-${uniqueId}-cell-${index}`} className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                                        {value.route_id}
                                                    </td>
                                                {Object.keys(value[name]).map((key, i) => (
                                                    <td key={`table-${uniqueId}-cell-${i}`} className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                                        {value[name][key]}
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