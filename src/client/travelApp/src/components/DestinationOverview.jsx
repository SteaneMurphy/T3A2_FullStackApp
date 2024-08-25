import React from "react";
import DisplayImage from "./DisplayImage";

const DestinationOverview = () => {
    return (
        <>
            <div className="columns">
                <div className="column">
                    <DisplayImage />
                </div>
                <div className="column">
                    <h2>Destination Title</h2>
                    <p>Destination Location</p>
                </div>
            </div>
        </>
    )
};

export default DestinationOverview;