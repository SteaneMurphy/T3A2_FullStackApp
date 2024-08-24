import React from "react";
import DisplayImage from "./DisplayImage";

const TripOverview = ({ trip }) => {
    const { title, notes } = trip;

    return (
        <>
            <div className="columns">
                <div className="column">
                    <DisplayImage />
                </div>
                <div className="column">
                    <h2>{title}</h2>
                    <p>{notes}</p>
                </div>
            </div>
        </>
    )
};

export default TripOverview;