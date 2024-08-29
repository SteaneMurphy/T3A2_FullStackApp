//modules
import React from "react";

const SubmitButton = ({ buttonText }) => {
    return (
        <div className="field login-submit-button">
            <p className="control">
                <button className="button" type="submit">{buttonText}</button>
            </p>
        </div>
    )
};

export default SubmitButton;