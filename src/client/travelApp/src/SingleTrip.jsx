import React, { useEffect } from "react";
import NavBar from "./NavBar";
import DestinationList from "./components/DestinationList";
import DestinationDescription from "./components/DestinationDescription";
import TravelMap from "./components/Map";
import SubmitButton from "./components/SubmitButton";
import { useGlobalStore } from './store';
import { useParams } from 'react-router-dom';

const SingleTrip = () => {
  const { trip_id } = useParams();
  const { currentItinerary, setCurrentItinerary, session_id } = useGlobalStore(state => ({
    currentItinerary: state.currentItinerary,
    setCurrentItinerary: state.setCurrentItinerary,
    session_id: state.session_id,
  }));

  useEffect(() => {
    const fetchItinerary = async () => {
      if (!currentItinerary || currentItinerary._id !== trip_id) {
        try {
          const response = await fetch(`/api/itineraries/${trip_id}`, {
            headers: {
              "Authorization": `Bearer ${session_id}`,
            },
          });
          if (response.ok) {
            const itinerary = await response.json();
            setCurrentItinerary(itinerary);
          } else {
            console.error('Failed to fetch itinerary');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    fetchItinerary();
  }, [trip_id, currentItinerary, setCurrentItinerary, session_id]);

  if (!currentItinerary) return <div>Loading...</div>;

  return (
    <>      
      <NavBar />
      <div className="columns">
        <div className="column">
          <h2>{currentItinerary.name}</h2>
          <DestinationList destinations={currentItinerary.destinations} />
        </div>
        <div className="column">
          <h2>Destination Details</h2>
          <DestinationDescription destinations={currentItinerary.destinations} />
        </div>
        <div className="column">
          <TravelMap locations={currentItinerary.destinations} />
          <SubmitButton buttonText={"Edit Itinerary!"} />
        </div>
      </div>
    </>
  );
};

export default SingleTrip;
