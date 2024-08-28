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
        <div className="box scrollable-box">
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
                <p>No destinations available</p>
            )}
        </div>
    )
};

export default DestinationList;