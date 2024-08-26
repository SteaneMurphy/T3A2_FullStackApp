import React, { useEffect } from "react";
import DestinationOverview from "./DestinationOverview";
import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "../store";

const DestinationList = () => {
    //const fetchDestinations = useGlobalStore((state) => state.fetchDestinations);
    const destinations = useGlobalStore((state) => state.destinations);
    const navigate = useNavigate();

    //useEffect(() => {fetchDestinations();}, [fetchDestinations]);

    const HandleClick = () => {
        navigate(`/create`);
    };

    return (
        <>
            <div className="box scrollable-box">
                <div className="box" onClick={HandleClick} role="button" tabIndex="0">
                    {Object.keys(destinations).length > 0 ? (
                        Object.values(destinations).map((destination) => (
                            <DestinationOverview key={destination._id} destination={destination} />
                        ))
                    ) : (
                        <p>No destinations available</p>
                    )}  
                </div>
            </div>
        </>
    )
};

export default DestinationList;