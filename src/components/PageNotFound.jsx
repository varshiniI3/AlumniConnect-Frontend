import React from 'react'
import headBack from '../assets/headBack.jpg'

function PageNotFound() {
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center text-white' style={{backgroundImage : `url(${headBack})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
      <h1 className='text-5xl font-bold' >Error : 404</h1><br /><br />
      <h1 className='text-5xl font-bold' >Page not Found</h1>
    </div>
  )
}

export default PageNotFound
