import { Console } from 'console';
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

function CreateTrip() {
  const [place, setPlace] = useState();
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl text-green-800'>Tell us your travel preferenes</h2>
      <p className='mt-3 text-gray-700 text-xl font-medium'>Just provide some basic information, and out trip planner will generate a customized itinerary based on your preferences.</p>
      <div className='mt-20'>
        <div>
          <h3 className='text-xl my-3 font-medium'>What is destination of your choice?</h3>
          <input placeholder='eg-Agra' className='bg-slate-50 mt-3'></input>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}  //to be continued
            selectProps={{
              place, onchange: (v) => { setPlace(v); Console.log(v) }
            }}
          />
        </div>
      </div>
    </div>
    
  )
}

export default CreateTrip