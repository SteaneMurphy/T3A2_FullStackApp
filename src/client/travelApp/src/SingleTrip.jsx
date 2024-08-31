//modules
import React, { useState } from "react";
import { useGlobalStore } from './store';
import { useParams } from 'react-router-dom';

//components
import NavBar from "./NavBar";
import DestinationList from "./components/DestinationList";
import DestinationDescription from "./components/DestinationDescription";
import TravelMap from "./components/Map";
import SubmitButton from "./components/SubmitButton";


const SingleTrip = () => {

  //store the current itinerary ID from the URL
  const { id } = useParams();

  //global state
  const fetchItineraries = useGlobalStore((state) => state.itineraries);      //fetchItineraries function
  const fetchDestinations = useGlobalStore((state) => state.destinations);    //fetchDestinations function
  
  //local state get/set
  const [selectedDestination, setSelectedDestination] = useState({});         //current clicked destination tile

  /* 
      Callback function for when a user clicks on a destination tile.
      This function sends the destination object to selectedDestination local
        state. The DestinationDescription component updates based on this variable. 
      The goal of this functionality is to display a detailed description
        of the selected destination in the itinerary.
  */
  const handleSelectDestination = (destination) => 
  {
    setSelectedDestination(() => destination);
  };

  //using the ID from params, find the correct itinerary object from the global state that matches
  const currentItinerary = Object.values(fetchItineraries).find(itinerary => itinerary._id === id);

  /* 
      Searches the destinations global state for matching destination IDs.
      When found, the destination object is stored and sent to DestinationList
        component for display.
  */
  let displayDestinations = currentItinerary.destinations.map((x) => 
    Object.values(fetchDestinations).find((y) => y._id === x)
  );

  return (
    <>
      <NavBar />
      <h1 class="single-trip-heading">{currentItinerary.title}</h1>
      <div className="columns">
        <div className="column" id="single-trip-left">
          <DestinationList destinations={displayDestinations} onSelectDestination={handleSelectDestination} />
        </div>
        <div className="column" id="single-trip-middle">
          <h1>Destination Details</h1>
          <DestinationDescription destination={selectedDestination} />
        </div>
        <div className="column" id="travel-map-container">
            <TravelMap locations={displayDestinations} />
        </div>
      </div>
    </>
  );
};

export default SingleTrip;
