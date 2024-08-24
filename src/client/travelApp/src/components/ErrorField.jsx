import React from "react";

const ErrorField = ({ error }) => { 
    return (
        <>
            {error && <p className="error has-text-danger">{error}</p>}
        </>
    )
};

export default ErrorField;