import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from './store.js';
import VideoPlayer from "./components/VideoPlayer.jsx";
import Socials from "./components/Socials.jsx";
import EmailField from "./components/EmailField.jsx";
import PasswordField from "./components/PasswordField.jsx";
import SubmitButton from "./components/SubmitButton.jsx";
import ErrorField from "./components/ErrorField.jsx";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const setUser = useAuthStore((state) => state.setUser);
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!email || !password) {
        setError('Please fill in both fields');
        return;
      }
  
      try {
        const response = await fetch(`http://localhost:4000/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (!response.ok) {
          throw new Error('invalid username of password');
        }
  
        //set session_id in auth store
        const { token } = await response.json();
        setUser(token);
        navigate('/trips');
  
      } catch (err) {
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