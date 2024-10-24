import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({ trip }) {
  if (!trip || !trip.tripData || !trip.tripData.itinerary) {
    return <div>No itinerary data available.</div>
  }

  return (
    <div >
      <h2 className='font-bold text-2xl mb-4'>Places to Visit</h2>
      <div>
        {trip?.tripData?.itinerary?.map((item, index) => (
          
            <div className='mt-5' >
              <h2 className='text-lg font-medium'>Day {item?.day}</h2>
              <div className='grid md:grid-cols-2 gap-5'>
                {item.activities.map((place, index) => (
                  <div className=''>
                    <h2 className='font-medium text-sm text-orange-600'>Ideal Travel time-{place.bestTime}</h2>
                    <PlaceCardItem place={place} />
                  </div>

                ))}
              </div>
            </div>

        
        ))}
      </div>
    </div>
  )
}

export default PlacesToVisit