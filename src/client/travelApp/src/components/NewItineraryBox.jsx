//modules
import React from "react";
import DestinationOverview from "./DestinationOverview";

const DestinationList = ({ destinations = [], onSelectDestination }) => {

    /* 
        If destinations array is not empty,
        for each destination entry,
        instantiate a new DestinationOverview component
    */
    return (
        <div className="box" id="scrollable-box-two">
            {destinations.length > 0 ? 
            (
                destinations.map((destination) => 
                (
                    <div key={destination._id} className="box">
                        <DestinationOverview destination={destination} onSelectDestination={onSelectDestination} />
                    </div>
                ))
            ) 
            : 
            (
                <p class="destination-list-text">Please choose some destinations</p>
            )}
        </div>
    )
};

export default DestinationList;