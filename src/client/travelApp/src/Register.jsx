//modules
import React, { useState } from "react";
import { useGlobalStore } from './store.js';
import { Link, useNavigate } from "react-router-dom";
import { FirstNameField, LastNameField } from "./components/NameField.jsx";

//components
import VideoPlayer from "./components/VideoPlayer.jsx";
import Socials from "./components/Socials.jsx";
import EmailField from "./components/EmailField.jsx";
import PasswordField from "./components/PasswordField.jsx";
import SubmitButton from "./components/SubmitButton.jsx";
import ErrorField from "./components/ErrorField.jsx";

const Register = () => {
    //instances
    const navigate = useNavigate();

    //global state
    const fetchUserItineraries = useGlobalStore((state) => state.fetchUserItineraries);   //fetchUserItineraries function
    const addUser = useGlobalStore((state) => state.addUser);                             //addUser function

    //local state get/set
    const [firstName, setFirstName] = useState("");           //user input - first name
    const [lastName, setLastName] = useState("");             //user input - last name
    const [email, setEmail] = useState("");                   //user input - email
    const [password, setPassword] = useState("");             //user input - password
    const [error, setError] = useState("");                   //stored current error

    /*
        Handles form submission.
        Calls addUser function in the global state
          this function creates a new user in the database
          and sets user global state.
    */
    const handleSubmit = async (e) => 
    {
        e.preventDefault();

        try 
        {
          await addUser(firstName, lastName, email, password);
          await fetchUserItineraries();
          navigate('/trips');
        } 
        catch (err) 
        {
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
              <p> Already have an account? <Link to="/">Sign In</Link></p>
            </form>
          </div>
          <div className="column">
            <VideoPlayer />
          </div>
        </div>
    )
};

export default Register;