//modules
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalStore } from './store.js';
import { apiUrl } from './config.js';

//components
import VideoPlayer from "./components/VideoPlayer.jsx";
import Socials from "./components/Socials.jsx";
import EmailField from "./components/EmailField.jsx";
import PasswordField from "./components/PasswordField.jsx";
import SubmitButton from "./components/SubmitButton.jsx";
import ErrorField from "./components/ErrorField.jsx";

const Login = () => {
    //instances
    const navigate = useNavigate();  

    //local state get/set
    const [email, setEmail] = useState("");               //user input - email
    const [password, setPassword] = useState("");         //user input - password
    const [error, setError] = useState("");               //stored current error

    //global state
    const setUser = useGlobalStore((state) => state.setUserSession);                        //setUserSession function
    const fetchUserItineraries = useGlobalStore((state) => state.fetchUserItineraries);     //fetchUserItineraries function
    const fetchDestinations = useGlobalStore((state) => state.fetchDestinations);           //fetchDestinations function

    /* 
        Handles form submission.
        Takes the user input (email/password) and sends it 
          in the body via a POST request to the login API.
        The API responds and if a match is found the setUser
          function in the global state updates the user
          information.
        The API returns a session_id (JWT Auth Token) and this
          is stored also via the setUser function.
    */
    const handleSubmit = async (e) => 
    {
      e.preventDefault();
  
      //validation
      if (!email || !password) 
      {
        setError('Please fill in both fields');
        return;
      }
  
      try 
      {
        const response = await fetch(`${apiUrl}/login`, 
        {
          method: 'POST',
          headers: 
          {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (!response.ok) 
        {
          throw new Error('invalid username of password');
        }
  
        const { token, user } = await response.json();
        setUser(token, user);

        //loads the current user's itineraries to global state
        //loads all destinations offered by the app to global state
        await fetchUserItineraries();
        await fetchDestinations();
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
            <VideoPlayer />
          </div>
          <div className="column">
            <Socials />
            <form onSubmit={handleSubmit}>
              <EmailField email={email} setEmail={setEmail} />
              <PasswordField password={password} setPassword={setPassword} />
              <ErrorField error={error} />
              <SubmitButton buttonText={ "Sign In" } />
              <p> Don't have an account yet? <Link to="/register">Sign Up</Link></p>
            </form>
          </div>
        </div>
     )
  };
  
export default Login;