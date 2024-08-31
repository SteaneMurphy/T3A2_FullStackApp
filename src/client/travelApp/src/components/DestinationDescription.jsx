//modules
import React from "react";
import DisplayImage from "./DisplayImage";

const DestinationDescription = ({ destination }) => {
  return (
    <>
      {/* 
          If a variable was passed and it has entries.
          Instiantiate an image (for associated destination)
            and a text description
      */}
      {destination && Object.keys(destination).length > 0 ? 
      (
        <>
          <DisplayImage data={destination.data} />
          <p class="destination-description-text">{destination.description}</p>
        </>
      ) 
      : 
      (
        <p class="destination-description-text">Select a destination from the itinerary</p>
      )}
    </>
  );
};

export default DestinationDescription;
