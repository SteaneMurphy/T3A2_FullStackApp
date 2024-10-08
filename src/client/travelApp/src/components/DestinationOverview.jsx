//modules
import React from "react";
import DisplayImage from "./DisplayImage";

const DestinationOverview = ({ destination, onSelectDestination }) => {
    
    //when user clicks this component
    //call the 'onSelectDestination' function in the parent component
    const handleClick = () => {
        onSelectDestination(destination);
    };

    return (
        <div onClick={() => handleClick()} role="button" tabIndex="0">
            <div className="columns">
                <div className="column">
                    <DisplayImage data={destination.data} />
                </div>
                <div className="column destination-overview-text">
                    <h2>{destination.name}</h2>
                </div>
            </div>
        </div>
    )
};

export default DestinationOverview;