import React, { useEffect, useState } from 'react'
import './jobs.css'
import Navbar from '../home/Navbar'
import { FaSearch } from "react-icons/fa";
import axios from 'axios'
import Cookies from 'js-cookie'
import { GiDuration } from "react-icons/gi";
import { IoLocation } from "react-icons/io5";

function Jobs() {
    const [name, setName] = useState('')
    const [totJobs, setTotJobs] = useState([])
    const [activeJobs, setActiveJobs] = useState([])
    const email = Cookies.get('email') || null

    useEffect(() => {
      const getJobs = async () => {
        try {
          const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/jobs/getJobs`)
          setTotJobs(res.data.jobs)
        } catch (error) {
          console.log(error)
        }
      }
      getJobs()
    }, [])
  
    useEffect(() => {
      if(totJobs.length > 0){
        setActiveJobs(totJobs.filter(job => 
          (job.company && job.company.toLowerCase().includes(name.toLowerCase())) || 
          (job.role && job.role.toLowerCase().includes(name.toLowerCase()))
        ))
      }
    }, [name, totJobs]) 
  
    return (
      <div className="jobs">
        <Navbar/>
        <div className="flex justify-center relative m-8">
          <span className="relative w-full md:w-3/6 text-xl font-bold">
            <input type="text" id='searchArea' className='focus:border-none active:border-none w-full p-3 pr-6' value={name} onChange={(e) => {setName(e.target.value)}}/>
            <label htmlFor="searchArea" className='absolute bottom-3 right-1 text-2xl'><FaSearch/></label>
          </span>
        </div>
        <div className="jobHolder">   
          <div className="jobBox relative">
            {
              activeJobs.length === 0 ? <center><h1 className='text-4xl font-bold'>No Jobs Found</h1></center> : 
              <div className='flex flex-col md:flex-row gap-5 flex-wrap w-full'>{
                activeJobs.map((job, key) => {
                  return (
                    <div className="job w-full md:w-fit flex flex-col flex-wrap" key={key}>
                      <p className='text-2xl font-bold'>{job.company}</p>
                      <p className='text-xl font-bold'>{job.role}</p>
                      <p>{job.description}</p>
                      <span className='flex flex-row gap-1'><p className="font-semibold">Experience:</p><p>{job.experienceRange.from+' - '+job.experienceRange.to+' years'}</p></span>
                      <span className='flex flex-row gap-1'><p className="font-semibold">Salary:</p><p>{job.salaryRange.from+' - '+job.salaryRange.to+' LPA'}</p></span>
                      <p className='text-l flex mt-1 mb-1'><IoLocation className='text-xl'/>{job.location}</p>
                      <p className='flex mt-1 mb-1'><GiDuration className='text-xl'/>{job.applyBefore.slice(8,10)+'/'+job.applyBefore.slice(5,7)+'/'+job.applyBefore.slice(0,4)}
                        {job.applyBefore.slice(11, 13) > "12" ? "  "+(job.applyBefore.slice(11, 13)-'12')+job.applyBefore.slice(13,16)+'PM': "  "+job.applyBefore.slice(11,16)+'AM'}</p>
                      <center><br/><a href={email === null ? '/login' :job.applyLink}>Apply now</a><br/></center>
                    </div>
            )})}</div>
          }</div>
        </div>
      </div>
    )
}

export default Jobs
