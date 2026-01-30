import React, { useState } from 'react'
import { FcSearch } from "react-icons/fc";

function Myapp() {

      const [search, setSearch] = useState('')
      const [data, setData] = useState()
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
          alert('Enter the city name');
        }
      }

  return (
    <>
      <div className='component flex flex-con item-center justify-center  pt-6 bg-gray-400'>

        <div className='gap-2 input flex item-center'>
          <input className='px-2 py-1 border border-gray-400 rounded-md outline-none focus:ring-2 focus:ring-blue-400' type="text" onChange={input_handle} placeholder='Enter City, Country' />
          <button onClick={myfun}>
            <FcSearch  className="text-gray-600 cursor-pointer" />
            </button>
        </div> 
        <div className=''>
          {
            data && data.weather ?
            <div className='my-4 '>
              <h2>{data.name}</h2>
              <h2>{Math.trunc(data.main.temp)}°C</h2>
              <p>{data.weather[0].description}</p>
            </div> : ""
          }
        </div>

      </div>
    </>
  )
}

export default Myapp