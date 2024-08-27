import React from "react";

const ResultsBox = ({ array, customFunc }) => {
    const handleClick = (country) => {
        customFunc(country);
    };

    return (
        <div className="box scrollable-box">
            {array.length > 0 ? (
                array.map((country, index) => (
                    <div key={index} className="box" onClick={() => handleClick(country)} role="button" tabIndex="0">
                        <h3>{country}</h3>
                    </div>
                ))
            ) : (
                <p>No destinations available</p>
            )}
        </div>
    )
};

export default ResultsBox;