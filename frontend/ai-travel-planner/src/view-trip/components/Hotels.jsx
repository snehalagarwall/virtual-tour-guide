import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Hotels({trip}) {
  const [selectedHotel, setSelectedHotel] = useState(null)

  const handleHotelClick = (hotel) => {
    setSelectedHotel(hotel)
  }

  return (
    <div>
        <h2 className='text-xl font-bold mt-5'>Hotel Recommendations</h2>
        {selectedHotel && (
          <div className='my-4 p-4 bg-blue-100 rounded-lg'>
            <h3 className='text-lg font-semibold'>Selected Hotel: {selectedHotel.hotelName}</h3>
          </div>
        )}
        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
            {trip?.tripData?.hotels?.map((hotel,index)=>(
                <div key={index} onClick={() => handleHotelClick(hotel)}>
                    <Link to={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotelName}+${encodeURIComponent(hotel['hotelAddress'])}`} target='_blank'>
                        <div className='hover:scale-105 transition-all duration-300 cursor-pointer'>
                            <img src="/placeholder.jpg" alt={hotel.hotelName} className='rounded-lg'  />
                            <div className='my-2 '> 
                                <h2 className='text-lg font-semibold'>{hotel?.hotelName}</h2>
                                <h2 className='text-xs text-gray-500'>📍{hotel['hotelAddress']}</h2>
                                <h2 className='text-sm '>💰{hotel?.price} per night</h2>
                                <h2 className='text-sm '>⭐{hotel?.rating} rating</h2>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Hotels