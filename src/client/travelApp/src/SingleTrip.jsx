import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import DestinationList from "./components/DestinationList";
import DestinationDescription from "./components/DestinationDescription";
import TravelMap from "./components/Map";
import SubmitButton from "./components/SubmitButton";
import { useGlobalStore } from './store';
import { useParams } from 'react-router-dom';
import { apiUrl } from './config.js';

const SingleTrip = () => {
  const { id } = useParams();
  const fetchItineraries = useGlobalStore((state) => state.itineraries);
  const fetchDestinations = useGlobalStore((state) => state.destinations);
  
  const [selectedDestination, setSelectedDestination] = useState({});

  const handleSelectDestination = (destination) => {
    setSelectedDestination(() => destination);
  };

  // Find the current itinerary
  const currentItinerary = Object.values(fetchItineraries).find(itinerary => itinerary._id === id);

  let displayDestinations = currentItinerary.destinations.map((x) => 
    Object.values(fetchDestinations).find((y) => y._id === x)
  );

  return (
    <>
      <NavBar />
      <div className="columns">
        <div className="column">
          <h2>{currentItinerary.title}</h2>
          <DestinationList destinations={displayDestinations} onSelectDestination={handleSelectDestination} />
        </div>
        <div className="column">
          <h2>Destination Details</h2>
          <DestinationDescription destination={selectedDestination} />
        </div>
        <div className="column">
          {/*<TravelMap locations={locations} />*/}
          <SubmitButton buttonText={"Edit Itinerary!"} />
        </div>
      </div>
    </>
  );
};

export default SingleTrip;
