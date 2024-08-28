//modules
import React from "react";

const PasswordField = ({ password, setPassword }) => {
    return (
        <div className="field">
            <p className="control has-icons-left">
            <input
                className="input"
                type="password"
                placeholder="Enter your password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
            </span>
            </p>
        </div>
    )
};

export default PasswordField;