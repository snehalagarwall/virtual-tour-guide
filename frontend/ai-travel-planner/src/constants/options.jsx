export const SelectTravelesList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'Solo adventure seeker ready to explore the world',
        icon: '✈️',
        people: '1'
    },
    {
        id: 2,
        title: 'A Couple',
        desc: 'Romantic getaway for two lovebirds',
        icon: '🥂',
        people: '2 People'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'Unforgettable memories for the whole clan',
        icon: '🏠',
        people: '3 to 5 people'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'Epic adventure with your squad',
        icon: '⛵',
        people: '5 to 10 people'
    }    
]

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Budget-Friendly',
        desc: 'Maximum fun, minimum spend for the savvy traveler',
        icon: '💵'
    },
    {
        id: 2,
        title: 'Comfortable',
        desc: 'Balance of comfort and value for a great experience',
        icon: '💰'
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Indulge in the finest experiences without limits',
        icon: '💸'
    }
]

export const AI_PROMPT = 'Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget. Provide a list of hotel options including HotelName, Hotel address, Price, hotel image URL, geo coordinates, rating, and descriptions. Suggest an itinerary with placeName, Place Details, Place Image URL, Geo Coordinates, Ticket Pricing, and Travel Time for each location. Plan each day of the {totalDays} days trip with the best time to visit. Present the information in JSON format.';