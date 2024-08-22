import React, { useState } from "react";
import Video from "./assets/HeroVideo.mp4";
import Google from "./assets/google.svg";
import Twitter from "./assets/twitter.svg";
import Apple from "./assets/apple.svg";
import Logo from "./assets/logo.png"
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from './AuthStore';

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
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (!response.ok) {
          throw new Error('Login failed');
        }
  
        const data = await response.json();
        setUser(data);
        navigate('/trips');
  
      } catch (err) {
        setError(err.message);
        console.error('Login error:', err);
      }
    };
    
    return (
        <div className="columns">
          <div className="column">
            <video autoPlay muted loop preload="auto">
              <source src={Video} />
            </video> 
          </div>
          <div className="column">
            <img src={Logo} alt="Logo" />
            <h2 className="my-5 is-size-5">Welcome Back!</h2>
            <h3>Please enter your details to sign in.</h3>
            <div className="columns">
              <div className="column signin">
                <img src={Apple} alt="Sign in with Apple" />
              </div>
              <div className="column signin">
                <img src={Google} alt="Sign in with Google" />
              </div>
              <div className="column signin">
                <img src={Twitter} alt="Sign in with Twitter" />
              </div>
            </div>
            <form onSubmit={handleSubmit}>
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
              {error && <p className="error has-text-danger">{error}</p>}
              <div className="field">
                <p className="control">
                  <button className="button is-success" type="submit">Sign In</button>
                </p>
                <p> Don't have an account yet? <Link to="/register">Sign Up</Link></p>
              </div>
            </form>
          </div>
        </div>
      );
    }