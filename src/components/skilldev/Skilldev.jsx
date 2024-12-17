import React, { useEffect, useState } from 'react'
import './skilldev.css'
import Navbar from '../home/Navbar'
import { FaSearch } from "react-icons/fa";
import axios from 'axios'

function Skilldev() {
    const [type, setType] = useState('')
    const [name, setName] = useState('')
    const [totEvents, setTotEvents] = useState([])
    const [activeEvents, setActiveEvents] = useState([])
    const [pastEvents, setPastEvents] = useState([])
    const [upcomingEvents, setUpcomingEvents] = useState([])
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
        event.description && event.description.toLowerCase().includes(name.toLowerCase()) && event.status && event.status === 'active'))
        setPastEvents(totEvents.filter(event => event.type && event.type.toLowerCase().includes(type.toLowerCase()) && 
        event.description && event.description.toLowerCase().includes(name.toLowerCase()) && event.status && event.status === 'past'))
        setUpcomingEvents(totEvents.filter(event => event.type && event.type.toLowerCase().includes(type.toLowerCase()) && 
        event.description && event.description.toLowerCase().includes(name.toLowerCase()) && event.status && event.status === 'upcoming'))
      }
    }, [type, name, totEvents])
  
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
          <div className="eventBox relative">
            <h1 className='absolute top-0 w-11/12'>Active<hr /></h1>
            {
              activeEvents.length === 0 ? <center><h1 className='text-4xl font-bold'>No Events Found</h1></center> : 
              <div className=''>{
              activeEvents.map((event, key) => 
                <div className="event relative" key={key}>
                  <h2>{event.description}</h2>
                  <h2>{event.type}</h2>
                  <h2>{event.hostName}</h2>
                  <h2>{event.createdAt}</h2>
                  <h2>{event.scheduledAt}</h2>
                  <a href={`${sessionUrl}/${event.sessionId}`} rel='noreferrer' target='_blank'>Join Session</a>
                </div>)
              }</div>
          }</div>
          <div className="eventBox relative">
            <h1 className='absolute top-0 w-11/12'>Past<hr /></h1>
            {
            pastEvents.length === 0 ? <center><h1 className='text-4xl font-bold'>No Events Found</h1></center> : 
            <div className=''>{
              pastEvents.map((event, key) => 
                <div className="event relative" key={key}>
                  <h2>{event.description}</h2>
                  <h2>{event.type}</h2>
                  <h2>{event.hostName}</h2>
                  <h2>{event.createdAt}</h2>
                  <h2>{event.scheduledAt}</h2>
                </div>)
              }</div>
          }</div>
          <div className="eventBox relative">
            <h1 className='absolute top-0 w-11/12'>Upcoming<hr /></h1>
            {
            upcomingEvents.length === 0 ? <center><h1 className='text-4xl font-bold'>No Events Found</h1></center> : 
            <div className=''>{
              upcomingEvents.map((event, key) => 
                <div className="event relative" key={key}>
                  <h2>{event.description}</h2>
                  <h2>{event.type}</h2>
                  <h2>{event.hostName}</h2>
                  <h2>{event.createdAt}</h2>
                  <h2>{event.scheduledAt}</h2>
                </div>)
              }</div>
          }</div> 
        </div>
      </div>
    )
}

export default Skilldev
