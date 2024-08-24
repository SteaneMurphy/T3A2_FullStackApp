import React, { useEffect } from "react";
import { useStore } from "./store";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import SubmitButton from "./components/SubmitButton";
import DisplayImage from "./components/DisplayImage";
import TripOverview from "./components/TripOverview";

const ShowTrips = () => {   
    const loadTrips = useStore((state) => state.load);
    const trips = useStore((state) => state.trips);
    console.log(trips);
    // Fetch trips when the component mounts
    useEffect(() => {loadTrips();}, [loadTrips]);

    return (
        <>     
            <NavBar />
            <div className="columns">
                <div className="column">
                    <h2>Your Itineraries</h2>
                    {trips.length > 0 ? (
                        trips.map((trip) => (
                            <TripOverview key={trip._id} trip={trip} />
                        ))
                    ) 
                    : 
                    (
                        <p>No trips available</p>
                    )}
                </div>
                <div className="column">
                    <h2>LET'S GO PLACES!</h2>
                    <h2>Time to plan your next trip...</h2>
                    <SubmitButton buttonText={"Create an itinerary!"}/>
                    <DisplayImage />
                </div>
            </div>
        </>
    )
};

export default ShowTrips;