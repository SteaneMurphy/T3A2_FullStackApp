import React from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const SingleTrip = () => {
   
    return (
        <>      
            <NavBar />
            <div className="columns">
                <div className="column">
                    <h2>Your Itineraries</h2>
                </div>
                <div className="column">
                    <h2>LET'S GO PLACES!</h2>
                </div>
                <div className="column">
                    <h2>LET'S GO PLACES!</h2>
                </div>
            </div>
        </>
    )
};

export default SingleTrip;