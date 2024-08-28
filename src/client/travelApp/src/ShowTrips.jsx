import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalStore } from "./store";
import NavBar from "./NavBar";
import SubmitButton from "./components/SubmitButton";
import MainImage from "./assets/allTripsMainImage.webp";
import TripOverview from "./components/TripOverview";

const ShowTrips = () => {   
    const allTrips = useGlobalStore((state) => state.itineraries);

    return (
        <>
          <NavBar />
          <div className="container mt-5">
            <div className="columns">
              <div className="column is-two-thirds">
                <h2 className="title is-4">Your Itineraries</h2>
                {Object.keys(allTrips).length > 0 ? (
                  Object.keys(allTrips).map((id) => (
                    <TripOverview key={id} trip={allTrips[id]} />
                  ))
                ) : (
                  <p>No trips available</p>
                )}
              </div>
    
              <div className="column is-one-third">
                <div className="box has-text-centered">
                  <h2 className="title is-3">LET'S GO PLACES!</h2>
                  <p className="subtitle is-5">Time to plan your next trip...</p>
                  <Link to="/create">
                    <SubmitButton buttonText={"Create an itinerary!"} />
                  </Link>
                </div>
                <div className="box mt-4">
                    <div className="custom-image-container">
                        < img src={MainImage} alt="Main Visual" />
                    </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    };

export default ShowTrips;