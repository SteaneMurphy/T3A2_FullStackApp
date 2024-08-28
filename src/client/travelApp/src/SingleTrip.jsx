import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import DestinationList from "./components/DestinationList";
import DestinationDescription from "./components/DestinationDescription";
import TravelMap from "./components/Map";
import SubmitButton from "./components/SubmitButton";
import { useGlobalStore } from './store';
import { useParams } from 'react-router-dom';

const SingleTrip = () => {
  const { id } = useParams();
  const { currentItinerary, setCurrentItinerary, session_id } = useGlobalStore(state => ({
    currentItinerary: state.currentItinerary,
    setCurrentItinerary: state.setCurrentItinerary,
    session_id: state.session_id,
  }));

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchItinerary = async () => {
      if (!currentItinerary || currentItinerary._id !== id) {
        try {
          const response = await fetch(`http://localhost:4000/trips/${id}`, {
            headers: {
              "Authorization": `Bearer ${session_id}`,
              "Content-Type": "application/json",
            },
          });
          if (response.ok) {
            const itinerary = await response.json();
            setCurrentItinerary(itinerary);
            // Fetch coordinates
            fetchCoordinates(itinerary.destinations);
          } else {
            console.error('Failed to fetch itinerary:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching itinerary:', error);
        }
      }
    };

    fetchItinerary();
  }, [id, currentItinerary, setCurrentItinerary, session_id]);

  const fetchCoordinates = async (destinations) => {
    const coordinatesPromises = destinations.map(async (city) => {
      // Replace `YOUR_GEOCODING_API_URL` with your geocoding API URL
      const response = await fetch(`https://api.geocoding.com/geocode?address=${city.name}`);
      const data = await response.json();
      return {
        ...city,
        lat: data.results[0].geometry.location.lat,
        lng: data.results[0].geometry.location.lng,
      };
    });
    const locationsWithCoordinates = await Promise.all(coordinatesPromises);
    setLocations(locationsWithCoordinates);
  };

  if (!currentItinerary) return <div>Loading...</div>;

  return (
    <>
      <NavBar />
      <div className="columns single-trip-page">
        <div className="column is-one-quarter itinerary-column">
          <h2 className="itinerary-title">{currentItinerary.name}</h2>
          <DestinationList destinations={currentItinerary.destinations} />
        </div>
        <div className="column is-half destination-column">
          <h2 className="destination-title">Destination Details</h2>
          <DestinationDescription destinations={currentItinerary.destinations} />
        </div>
        <div className="column is-one-quarter map-column">
          <TravelMap locations={locations} />
          <div className="edit-itinerary">
            <SubmitButton buttonText={"Edit Itinerary!"} />
          </div>
        </div>
      </div>
    </>
  );
};


export default SingleTrip;
