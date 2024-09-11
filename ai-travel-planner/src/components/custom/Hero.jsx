import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-3' >
        <h2 className='font-extrabold text-[43px] text-center mt-10'><span className='text-[#0d692a]'>Discover Your Next Adventure with AI:</span><br></br>Personalized itineraris at your fingertips</h2>
        <p className='text-xl text-gray-900 text-center'>Your personal trip planner and travel curator, creating custom itenaries tailored to your interests and budget.</p>
        <Link to={'/create-trip'}>
        <Button className='mt-6'>Get Started,It's Free</Button>
        </Link>
    </div>
  )
}

export default Hero