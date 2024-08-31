//modules
import React from "react";

const ResultsBox = ({ array, customFunc }) => {

    //pass the country variable to the parent function 'filterDestinationsByCountry'
    const handleClick = (country) => {
        customFunc(country);
    };

    return (
        <div className="box scrollable-box">
            {array.length > 0 ? (
                array.map((country, index) => (
                    <div key={index} className="box" id="create-trip-results" onClick={() => handleClick(country)} role="button" tabIndex="0">
                        <h3 class="create-trip-results-text">{country}</h3>
                    </div>
                ))
            ) : (
                <p class="create-trip-results-text">Select a country</p>
            )}
        </div>
    )
};

export default ResultsBox;