import React, { useEffect } from "react";
import NavBar from "./NavBar";
import DestinationList from "./components/DestinationList";
import DestinationDescription from "./components/DestinationDescription";
import TravelMap from "./components/Map";
import SubmitButton from "./components/SubmitButton";
import { useGlobalStore } from './store';
import { useParams } from 'react-router-dom';

const SingleTrip = () => {
  const { id } = useParams(); // Gets the trip ID from the URL
  const { currentItinerary, setCurrentItinerary, session_id } = useGlobalStore(state => ({
    currentItinerary: state.currentItinerary,
    setCurrentItinerary: state.setCurrentItinerary,
    session_id: state.session_id,
  }));

  useEffect(() => {
    const fetchItinerary = async () => {
      if (!currentItinerary || currentItinerary._id !== id) { // Check if the itinerary needs to be fetched
        try {
          const response = await fetch(`http://localhost:4000/trips/${id}`, {
            headers: {
              "Authorization": `Bearer ${session_id}`, // Send the session ID for authentication
              "Content-Type": "application/json",
            },
          });
          if (response.ok) {
            const itinerary = await response.json(); // Parse the JSON response
            setCurrentItinerary(itinerary); // Update the global store with the fetched itinerary
          } else {
            console.error('Failed to fetch itinerary:', response.statusText); // Handle errors if the fetch fails
          }
        } catch (error) {
          console.error('Error fetching itinerary:', error); // Catch any errors during the fetch
        }
      }
    };

    fetchItinerary(); // Call the fetch function when the component mounts or dependencies change
  }, [id, currentItinerary, setCurrentItinerary, session_id]);

  if (!currentItinerary) return <div>Loading...</div>; // Show a loading state if the itinerary is not yet available

  return (
    <>      
      <NavBar />
      <div className="columns">
        <div className="column">
          <h2>{currentItinerary.name}</h2> {/* Display the itinerary name */}
          <DestinationList destinations={currentItinerary.destinations} /> {/* Display the list of destinations */}
        </div>
        <div className="column">
          <h2>Destination Details</h2>
          <DestinationDescription destinations={currentItinerary.destinations} /> {/* Display details for each destination */}
        </div>
        <div className="column">
          <TravelMap locations={currentItinerary.destinations} /> {/* Display the map with the destinations */}
          <SubmitButton buttonText={"Edit Itinerary!"} /> {/* Button to edit the itinerary */}
        </div>
      </div>
    </>
  );
};

export default SingleTrip;
