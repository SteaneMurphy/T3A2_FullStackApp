//modules
import React from "react";

//first name input
const FirstNameField = ({ name, setFirstName }) => {
    return (
        <>
            <div className="field">
                <p>
                <input
                    className="input"
                    type="text"
                    placeholder={`Enter your first name...`}
                    value={name}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                </p>
            </div>
        </>
    )
};

//last name input
const LastNameField = ({ name, setLastName }) => {
    return (
        <>
            <div className="field">
                <p>
                <input
                    className="input"
                    type="text"
                    placeholder={`Enter your last name...`}
                    value={name}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                </p>
            </div>
        </>
    )
};

//itinerary name input
const TripNameField = ({ name, setTripName }) => {
    return (
        <>
            <div className="field">
                <p>
                <input
                    className="input"
                    type="text"
                    placeholder={`Enter itinerary name...`}
                    value={name}
                    onChange={(e) => setTripName(e.target.value)}
                    required
                />
                </p>
            </div>
        </>
    )
};

//country name input
const CountrySelectField = ({ input, setInput }) => {
    return (
        <>
            <div className="field">
                <p>
                <input
                    className="input"
                    type="text"
                    placeholder={`Type to select country...`}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    required
                />
                </p>
            </div>
        </>
    )
};

export { FirstNameField, LastNameField, TripNameField, CountrySelectField };