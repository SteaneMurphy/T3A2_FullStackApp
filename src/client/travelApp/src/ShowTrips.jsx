//modules
import React from "react";
import { Link } from "react-router-dom";
import { useGlobalStore } from "./store";

//components
import NavBar from "./NavBar";
import SubmitButton from "./components/SubmitButton";
import MainImage from "./assets/allTripsMainImage.webp";
import TripOverview from "./components/TripOverview";
import LargeImage from "./components/LargeImage";

const ShowTrips = () => {

    /*
        Retrieves the stored user itineraries from the global state
            and displays them.
        For each itinerary found in allTrips, the TripOverview component
            is instantiated, and the itinerary information passed to
            this component.
    */
    const allTrips = useGlobalStore((state) => state.itineraries);

    return (
        <>     
            <NavBar />
            <div className="columns">
                <div className="column all-trips-left-spacing">
                    <div className="all-trips-left-container">
                        <h2>Your Itineraries</h2>
                        {/* If allTrips is not empty */}
                        {Object.keys(allTrips).length > 0 ? 
                        (
                            //For each itinerary in allTrips
                            Object.keys(allTrips).map((id) => 
                            (
                                //Display the itinerary
                                <TripOverview key={id} trip={allTrips[id]} />
                            ))
                        ) : 
                        (
                            <>
                                <p>You have not made an intinerary</p>
                                <div className="all-trips-right-spacing">
                                    <h2>LET'S GO PLACES!</h2>
                                    <p>Time to plan your next trip...</p>
                                    <Link to="/create"><SubmitButton buttonText={"Create an itinerary!"}/></Link>
                                </div>
                            </>
                            
                        )}
                    </div>
                </div>
                <div className="column">
                    <div class="all-trips-right-container">
                        <div className="all-trips-right-spacing">
                            <h2>LET'S GO PLACES!</h2>
                            <p>Time to plan your next trip...</p>
                            <Link to="/create"><SubmitButton buttonText={"Create an itinerary!"}/></Link>
                        </div>
                        <LargeImage image={MainImage}/>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ShowTrips;