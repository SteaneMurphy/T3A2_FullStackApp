import React from "react";
import DisplayImage from "./DisplayImage";
import { useNavigate } from "react-router-dom";

const TripOverview = ({ trip }) => {
    const { title, notes, data } = trip;
    const navigate = useNavigate();

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