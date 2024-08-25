import React from "react";
import DestinationOverview from "./DestinationOverview";
import { useNavigate } from "react-router-dom";

const DestinationList = () => {
    const loadTrips = useStore((state) => state.load);
    const trips = useStore((state) => state.trips);

    // Fetch trips when the component mounts
    useEffect(() => {loadTrips();}, [loadTrips]);
    
    const navigate = useNavigate();

    const HandleClick = () => {
        navigate(`/create`);
    };

    return (
        <>
            <div className="box scrollable-box">
                <div className="box" onClick={HandleClick} role="button" tabIndex="0">
                    {trips.length > 0 ? (
                        trips.map((trip) => (
                            <DestinationOverview /> 
                        ))) 
                        :(
                            <p>No destinations available</p>
                    )}  
                </div>
            </div>
        </>
    )
};

export default DestinationList;