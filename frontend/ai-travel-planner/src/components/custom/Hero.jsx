import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-20 '>
        <h2 className='font-extrabold text-[50px] text-center mt-16'><span className='text-[#20881c]'>Discover Your Next Adventure with AI:</span> Personalised Itineraries at Your FingerTips</h2>
        <p className='text-xl text-gray-700 text-center'>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>
        <Link to={'/create-trip'}>
        <Button className='hover:bg-[#20881c] mb-12'>Get Started , It's Free</Button>
        </Link>
    </div>
  )
}

export default Hero