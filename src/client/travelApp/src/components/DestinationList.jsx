import React from "react";
import DestinationOverview from "./DestinationOverview";

const DestinationList = ({ destinations = [], onSelectDestination }) => {

    return (
        <div className="box scrollable-box">
            {destinations.length > 0 ? (
                destinations.map((destination) => (
                    <div key={destination._id} className="box">
                        <DestinationOverview destination={destination} onSelectDestination={onSelectDestination} />
                    </div>
                ))
            ) : (
                <p>No destinations available</p>
            )}
        </div>
    )
};

export default DestinationList;