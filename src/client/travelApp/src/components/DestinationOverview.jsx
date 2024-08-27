import React from "react";
import DisplayImage from "./DisplayImage";

const DestinationOverview = ({ destination, onSelectDestination }) => {
    
    const handleClick = () => {
        onSelectDestination(destination);
    };

    return (
        <div onClick={() => handleClick()} role="button" tabIndex="0">
            <div className="columns">
                <div className="column">
                    <DisplayImage data={destination.data} />
                </div>
                <div className="column">
                    <h2>{destination.name}</h2>
                </div>
            </div>
        </div>
    )
};

export default DestinationOverview;