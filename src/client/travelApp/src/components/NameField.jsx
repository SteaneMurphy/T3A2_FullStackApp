import React from "react";

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

export { FirstNameField, LastNameField };