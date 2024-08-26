import React, { useEffect } from "react";
import DestinationOverview from "./DestinationOverview";
import { useGlobalStore } from "../store";

const DestinationList = ({ destinations = [] }) => {

    return (
        <div className="box scrollable-box">
            {destinations.length > 0 ? (
                destinations.map((destination) => (
                    <div key={destination._id} className="box">
                        <DestinationOverview destination={destination} />
                    </div>
                ))
            ) : (
                <p>No destinations available</p>
            )}
        </div>
    )
};

export default DestinationList;