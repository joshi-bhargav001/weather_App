import React, { useState } from 'react'
import { FcSearch } from "react-icons/fc";
import cloude from '../images/cloude.jpg'
import clear from '../images/clear.jpg'
import mist from '../images/mist.png'
import rain from '../images/rain.jpg'
import smoke from '../images/smoke.png'
import errors from '../images/error.jpg'

function Myapp() {

      const [search, setSearch] = useState('')
      const [data, setData] = useState()
      const [error, setError] = useState()
      const key = "ba55de13a7547027607bcc88069e83f3"

      const input_handle = (e) => {
        setSearch(e.target.value)
        console.log(e.target.value)
      }

      const myfun = async () => {
        const get = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${key}`)
        const jsondata = await get.json()
        console.log(jsondata)
        setData(jsondata)

        if(search == "") {
          setError('Enter the city name');
        } else if(jsondata.cod == '404') {
          setError('Please Enter the valid name');
        } else {
          setError('')
        }

        setSearch('')
      }

  return (
    <>
    <div className="min-h-screen bg-blue-300 flex justify-center pt-10"> 
      <div className='w-[320px] h-[580px] bg-blue-200 rounded-2xl shadow-xl p-6 mb-2'>
            <h1 className="text-3xl font-bold text-blue-500 mb-2 pb-1"> Weather App </h1>

        <div className='flex items-center bg-sky-100 rounded-full px-4 py-2'>
          <input className='bg-transparent outline-none flex-1 text-sm' value={search} type="text" onChange={input_handle} placeholder='Enter City, Country' />
          <button onClick={myfun}>
            <FcSearch  className="text-gray-600 cursor-pointer" />
            </button>
        </div> 

        <div className=''>
          {
            error ? 
            <div className='mt-6'>
              <p className='mt-5 mb-5 text-lg'>{error}</p>
              <img className='' src={errors} alt="" />
            </div> : ""
          }
          {
            data && data.weather ?
            <div className='my-4 '>
              <h2 className="text-center text-lg font-semibold mt-4">{data.name}</h2>
              <div className="my-3 mx-3">
                <img src={data.weather[0].main == "Clouds" ? cloude : ""} />
                <img src={data.weather[0].main == "Rain" ? rain : ""} />
                <img src={data.weather[0].main == "Clear" ? clear : ""} />
                <img src={data.weather[0].main == "Mist" ? mist : ""} />
                <img src={data.weather[0].main == "Haze" ? cloude : ""} />
                <img src={data.weather[0].main == "Smoke" ? smoke : ""} />
              </div>
              <h2 className="text-center text-3xl font-bold">{Math.trunc(data.main.temp)}°C</h2>
              <p  className="text-center text-gray-500 capitalize mt-1">{data.weather[0].description}</p>
            </div> : ""
          }
        </div>

      </div>
      </div>
    </>
  )
}

export default Myapp