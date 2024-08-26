import React, { useState } from "react";
import { useGlobalStore } from './store.js';
import { Link, useNavigate } from "react-router-dom";
import VideoPlayer from "./components/VideoPlayer.jsx";
import Socials from "./components/Socials.jsx";
import { FirstNameField, LastNameField } from "./components/NameField.jsx";
import EmailField from "./components/EmailField.jsx";
import PasswordField from "./components/PasswordField.jsx";
import SubmitButton from "./components/SubmitButton.jsx";
import ErrorField from "./components/ErrorField.jsx";

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const addUser = useGlobalStore((state) => state.addUser);
    const fetchUserItineraries = useGlobalStore((state) => state.fetchUserItineraries);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addUser(firstName, lastName, email, password);
            await fetchUserItineraries();
            navigate('/trips');
          } 
          catch (err) {
            setError('site could not be reached');
            console.error('Login error:', err);
          }
        
    };

    return (
        <div className="columns">
          <div className="column">
            <Socials />
            <form onSubmit={handleSubmit}>
              <FirstNameField name={firstName} setFirstName={setFirstName} />  
              <LastNameField name={lastName} setLastName={setLastName} /> 
              <EmailField email={email} setEmail={setEmail} />
              <PasswordField password={password} setPassword={setPassword} />
              <ErrorField error={error} />
              <SubmitButton buttonText={ "Sign Up" } />
              <p> Already have an account? <Link to="/login">Sign In</Link></p>
            </form>
          </div>
          <div className="column">
            <VideoPlayer />
          </div>
        </div>
    )
};

export default Register;