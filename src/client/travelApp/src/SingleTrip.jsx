import React from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import DestinationList from "./components/DestinationList";
import DestinationDescription from "./components/DestinationDescription";
import Map from "./components/Map";

const SingleTrip = () => {
   
    return (
        <>      
            <NavBar />
            <div className="columns">
                <div className="column">
                    <h2>Itinerary Name</h2>
                    <DestinationList />
                </div>
                <div className="column">
                    <h2>Destination</h2>
                    <DestinationDescription />
                </div>
                <div className="column">
                    <Map />
                    <h2>NOT QUITE RIGHT...</h2>
                    <h2>Want to edit your itinerary?</h2>
                </div>
            </div>
        </>
    )
};

export default SingleTrip;