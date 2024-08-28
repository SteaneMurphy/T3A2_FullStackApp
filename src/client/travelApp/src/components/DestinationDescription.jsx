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
          <p>{destination.description}</p>
        </>
      ) 
      : 
      (
        <p>Please select a destination</p>
      )}
    </>
  );
};

export default DestinationDescription;
