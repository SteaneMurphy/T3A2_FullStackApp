import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalStore } from './store.js';
import VideoPlayer from "./components/VideoPlayer.jsx";
import Socials from "./components/Socials.jsx";
import EmailField from "./components/EmailField.jsx";
import PasswordField from "./components/PasswordField.jsx";
import SubmitButton from "./components/SubmitButton.jsx";
import ErrorField from "./components/ErrorField.jsx";
import { apiUrl } from './config.js';

const Login = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const setUser = useGlobalStore((state) => state.setUserSession);
    const fetchUserItineraries = useGlobalStore((state) => state.fetchUserItineraries);
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!email || !password) {
        setError('Please fill in both fields');
        return;
      }
  
      try {
        const response = await fetch(`${apiUrl}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (!response.ok) {
          throw new Error('Invalid username or password');
        }
  
        const { token, user } = await response.json();
        setUser(token, user);
        await fetchUserItineraries();
        navigate('/trips');
  
      } catch (err) {
        setError('Site could not be reached');
        console.error('Login error:', err);
      }
    };
    
    return (
      <div className="columns is-vcentered is-fullheight login-page">
        <div className="column is-half is-hidden-touch custom-tablet-hide">
          <div className="video-container">
            <VideoPlayer />
          </div>
        </div>
        <div className="column is-half is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
          <Socials />
          <div className="divider">
            <span className="or-text">OR</span>
          </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="field">
            <label className="label">E-Mail Address</label>
            <EmailField email={email} setEmail={setEmail} />
          </div>
          <div className="field">
            <label className="label">Password</label>
            <PasswordField password={password} setPassword={setPassword} />
          </div>
          <ErrorField error={error} />
          <SubmitButton buttonText={"Sign In"} />
        </form>
          <p className="mt-4">
            Don&apos;t have an account yet? <Link to="/register" className="has-text-primary">Sign Up</Link>
          </p>
        </div>
      </div>
   );
};

export default Login;
