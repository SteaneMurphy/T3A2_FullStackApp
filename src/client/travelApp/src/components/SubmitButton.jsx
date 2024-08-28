//modules
import React from "react";

const SubmitButton = ({ buttonText }) => {
    return (
        <div className="field">
            <p className="control">
                <button className="button is-success" type="submit">{buttonText}</button>
            </p>
        </div>
    )
};

export default SubmitButton;