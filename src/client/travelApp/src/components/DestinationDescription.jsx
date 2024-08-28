import React from "react";
import DisplayImage from "./DisplayImage";

const DestinationDescription = ({ destination }) => {
  return (
    <>
      {destination && Object.keys(destination).length > 0 ? (
        <>
          <DisplayImage data={destination.data} />
          <p>{destination.description}</p>
        </>
      ) : (
        <p>Please select a destination</p>
      )}
    </>
  );
};

export default DestinationDescription;
