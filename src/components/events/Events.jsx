import React, { useEffect, useState } from 'react'
import './events.css'
import Navbar from '../home/Navbar'
import { FaSearch } from "react-icons/fa";
import axios from 'axios'
import { MdDateRange } from "react-icons/md"

function Events() {
  const [name, setName] = useState('')
  const [totEvents, setTotEvents] = useState([])
  const [activeEvents, setActiveEvents] = useState([])
  const [imgIndex, setImgIndex] = useState(0)

  setTimeout(() => {
    setImgIndex(imgIndex+1)
  }, 10000)

  const coordinators = (event, desig)=>{
    return(
      event.coordinators.filter(cord => cord.designation === desig).map((fcord, k)=> 
        <span key={k} className='flex flex-row gap-2'>
          <p>{fcord.name}</p>
          <p>{fcord.contact}</p>
          <p>{fcord.email}</p>
        </span>
      )
    )
  }

  useEffect(() => {
    const getEvents = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/offEvent/getOffEvents`)
        setTotEvents(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getEvents()
  }, [])

  useEffect(() => {
    if(totEvents.length > 0){
      setActiveEvents(totEvents.filter(event => event.title && event.title.toLowerCase().includes(name.toLowerCase())))
    }
  }, [name, totEvents]) 

  return (
    <div className="eventsPage">
      <Navbar/>
      <div className="flex justify-center relative m-8">
        <span className="relative w-3/6 text-xl font-bold">
          <input type="text" id='searchArea' className='focus:border-none active:border-none w-full  p-3 pr-6' value={name} onChange={(e) => {setName(e.target.value)}}/>
          <label htmlFor="searchArea" className='absolute bottom-3 right-1 text-2xl'><FaSearch/></label>
        </span>
      </div>
      <div className="eventHolder">   
        <div className="eventBox relative ">
          {
            activeEvents.length === 0 ? <center><h1 className='text-4xl font-bold'>No Events Found</h1></center> : 
            <div className='flex flex-row gap-5 flex-wrap w-full'>{
              activeEvents.map((event, key) => {
                return (
                  <div className="event w-full flex flex-row flex-wrap" key={key}>
                    <span>
                      <p className='text-2xl font-bold'>{event.title}</p>
                      <p className='text-l font-semibold'>Faculty Coordniators:</p>{coordinators(event, 'Faculty')}
                      <p className='text-l font-semibold'>Student Coordniators:</p>{coordinators(event, 'Student')}<br/>
                      <p>{event.description}</p>
                      <p className='flex mt-1 mb-1'><MdDateRange className='text-2xl'/>{event.date.slice(8,10)+'/'+event.date.slice(5,7)+'/'+event.date.slice(0,4)}
                        {event.date.slice(11, 13) > "12" ? "  "+(event.date.slice(11, 13)-'12')+event.date.slice(13,16)+'PM': "  "+event.date.slice(11,16)+'AM'}</p>
                      <span className="flex flex-row gap-1"><p className='font-bold'>Venue:</p><p>{event.venue}</p></span>
                    </span>
                    <span style={{backgroundImage: `url(${event.images[(imgIndex % event.images.length)]})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}} id='imgSpan'></span>
                  </div>
          )})}</div>
        }</div>
      </div>
    </div>
  )
}

export default Events
