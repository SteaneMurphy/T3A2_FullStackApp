import React from "react";

const ResultsBox = ({ arrayOfResults }) => {
    return (
        <div className="box scrollable-box">
            {arrayOfResults.length > 0 ? (
                arrayOfResults.map((result, index) => (
                    <p key={index}>{result}</p>
                ))
            ) : (
                <p>No destinations available</p>
            )}
        </div>
    )
};

export default ResultsBox;