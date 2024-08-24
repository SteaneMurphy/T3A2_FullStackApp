import React from "react";

const EmailField = ({ email, setEmail }) => {

    return (
        <div className="field">
            <p className="control has-icons-left has-icons-right">
            <input
                className="input"
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
            </span>
            </p>
        </div>
    )
};

export default EmailField;