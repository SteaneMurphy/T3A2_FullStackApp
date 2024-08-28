//modules
import React from "react";
import { useNavigate } from "react-router-dom";

//components
import DisplayImage from "./DisplayImage";

const TripOverview = ({ trip }) => 
{
    //instances
    const navigate = useNavigate();

    //destructure trip properties
    const { title, notes, data } = trip;
    
    //when user clicks this tile, navigate 
    //to the single itinerary page with this
    //trip ID
    const handleClick = () => {
        navigate(`/trips/${trip._id}`);
    };

    return (
        <div className="box" onClick={handleClick} role="button" tabIndex="0">
            <div className="columns">
                <div className="column">
                    <DisplayImage data={data} />
                </div>
                <div className="column">
                    <h2>{title}</h2>
                    <p>{notes}</p>
                </div>
            </div>
        </div>
    )
};

export default TripOverview;