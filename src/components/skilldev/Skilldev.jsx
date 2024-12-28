import React, { useEffect, useState } from 'react'
import './skilldev.css'
import Navbar from '../home/Navbar'
import { FaSearch } from "react-icons/fa";
import axios from 'axios'
import { PiChalkboardTeacherDuotone } from "react-icons/pi";
import { MdDateRange, MdUpdate } from "react-icons/md";

function Skilldev() {
  const [type, setType] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState('active')
  const [totEvents, setTotEvents] = useState([])
  const [activeEvents, setActiveEvents] = useState([])
  const sessionUrl = process.env.REACT_APP_SESSION_URL

  useEffect(() => {
    const getEvents = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/event/getEvents`)
        setTotEvents(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getEvents()
  }, [])

  useEffect(() => {
    if(totEvents.length > 0){
      setActiveEvents(totEvents.filter(event => event.type && event.type.toLowerCase().includes(type.toLowerCase()) && 
      event.title && event.title.toLowerCase().includes(name.toLowerCase()) && event.status && event.status === status))
    }
  }, [type, name, totEvents, status]) 

  return (
    <div className="skilldev">
      <Navbar/>
      <div className="flex justify-center relative m-12 mb-8">
        <select id="roleSelect" onChange={(e) => {setType(e.target.value)}} className='text-xl font-bold p-3'>  
          <option value="">All</option>       
          <option value="Webinar">Webinars</option>       
          <option value="Workshop">Workshops</option>       
          <option value="Mock Interview">Mock Interviews</option>       
        </select>
        <span className="relative w-3/6 text-xl font-bold">
          <input type="text" id='searchArea' className='focus:border-none active:border-none w-full  p-3 pr-6' value={name} onChange={(e) => {setName(e.target.value)}}/>
          <label htmlFor="searchArea" className='absolute bottom-3 right-1 text-2xl'><FaSearch/></label>
        </span>
      </div>
      <div className="eventHolder">         
        <div className='w-fit text-2xl font-semibold'>
          <select id='statusSelect' onChange={e => setStatus(e.target.value)}>
            <option value="active">Active</option>
            <option value="past">Past</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div><br /><br />
        <div className="eventBox relative ">
          {
            activeEvents.length === 0 ? <center><h1 className='text-4xl font-bold'>No Events Found</h1></center> : 
            <div className='flex flex-row gap-5 flex-wrap w-full'>{
              activeEvents.map((event, key) => {
                return (
                <div className="event flex flex-row justify-center items-center align-middle gap-20 w-fit" key={key}>
                  <span>
                    <p className='text-2xl font-semibold'>{event.title}</p>
                    <p className='flex'>{event.type} <p className='ml-4 mr-4 font-bold'>|</p>{event.hostName}<PiChalkboardTeacherDuotone className='text-2xl'/></p>
                    <p>{event.description}</p>
                    <p className='flex mt-1 mb-1'><MdDateRange className='text-2xl'/>{event.scheduledAt.slice(8,10)+'/'+event.scheduledAt.slice(5,7)+'/'+event.scheduledAt.slice(0,4)}
                      {event.scheduledAt.slice(11, 13) > "12" ? "  "+(event.scheduledAt.slice(11, 13)-'12')+event.scheduledAt.slice(13,16)+'PM': "  "+event.scheduledAt.slice(11,16)+'AM'}</p>
                    <p className='flex'><MdUpdate className='text-2xl'/>{event.period} mins</p>
                  </span>
                  <span className='flex h-full bg-blue min-w-fit text-xl font-semibold align-middle items-center'>{event.status === 'active' && <a href={`${sessionUrl}/${event.sessionId}`} rel='noreferrer' target='_blank'>Join Session</a>}</span>
                </div>
              )})
            }</div>
        }</div>
      </div>
    </div>
  )
}

export default Skilldev
