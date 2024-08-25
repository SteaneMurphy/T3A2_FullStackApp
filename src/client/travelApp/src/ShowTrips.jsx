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
            <div className="columns">
                <div className="column">
                    <h2>Your Itineraries</h2>
                    {Object.keys(allTrips).length > 0 ? (
                        Object.keys(allTrips).map((id) => (
                            <TripOverview key={id} trip={allTrips[id]} />
                        ))
                    ) : (
                        <p>No trips available</p>
                    )}
                </div>
                <div className="column">
                    <h2>LET'S GO PLACES!</h2>
                    <h2>Time to plan your next trip...</h2>
                    <Link to="/create"><SubmitButton buttonText={"Create an itinerary!"}/></Link>
                    <img src={MainImage}></img>
                </div>
            </div>
        </>
    )
};

export default ShowTrips;