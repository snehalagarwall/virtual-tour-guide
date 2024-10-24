import React from 'react'
import { Link } from 'react-router-dom'
import { MdLocationPin } from "react-icons/md"
import { Button } from '@/components/ui/button'

function PlaceCardItem({place}) {
  return (
    <Link to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.placeName)}`} target='_blank' rel="noopener noreferrer">
      <div className='border-2 border-gray-300 rounded-xl p-5 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        <img src='/placeholder.jpg' alt={place.placeName} className='w-[130px] h-[130px] rounded-xl'/>
        <div> 
          <h2 className='font-bold text-lg'>{place.placeName}</h2>
          <p className='text-sm text-gray-400'>{place['placeDetails']}</p>
          <h2 className='mt-2'>🕙 {place['travelTime']}</h2>
          <h2 className='mt-2'>Ticket pricing💰 -{place.ticketPricing}</h2>
        </div>
      </div>
    </Link>
  )
}

export default PlaceCardItem