// modules
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from './config.js';
import gsap from "gsap";
import { CSSTransition } from "react-transition-group";
import { useGlobalStore } from "./store.js";

//components
import VideoPlayer from "./components/VideoPlayer.jsx";
import Socials from "./components/Socials.jsx";
import EmailField from "./components/EmailField.jsx";
import PasswordField from "./components/PasswordField.jsx";
import SubmitButton from "./components/SubmitButton.jsx";
import ErrorField from "./components/ErrorField.jsx";

const Login = () => {
    //instance
    const navigate = useNavigate();

    //local state set/get
    const [email, setEmail] = useState("");                                                 //user input - email
    const [password, setPassword] = useState("");                                           //user input - password
    const [animationState, runAnimation] = useState(false);                                 //animation state boolean
    const [error, setError] = useState("");                                                 //current stored error

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
    const handleSubmit = async (e) => {
        e.preventDefault();

        //validation
        if (!email || !password) {
            setError('Please fill in both fields');
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Invalid username or password');
            }

            const { token, user } = await response.json();
            setUser(token, user);

            //loads the current user's itineraries to global state
            //loads all destinations offered by the app to global state
            await fetchUserItineraries();
            await fetchDestinations();
            navigate('/trips');
        } catch (err) {
            setError('Site could not be reached');
            console.error('Login error:', err);
        }
    };

    /* 
        Handles animation transition when user clicks on the 'Sign Up'
            link.
        The animation swtiches the x position and adjusts the opacity of each
            column.
    */
    const handleAnimation = (e) => {
        e.preventDefault();
        runAnimation(true);
    };

    const columnOne = useRef(null);
    const columnTwo = useRef(null);

    useEffect(() => {
        if (animationState) {
            gsap.to(columnOne.current, {
                xPercent: 100,
                duration: 1,
                ease: "power2.inOut",
            });
            gsap.to(columnTwo.current, {
                xPercent: -100,
                duration: 1,
                ease: "power2.inOut",
                onComplete: () => navigate('/register'),
            });
        }
    }, [animationState]);

    return (
        <div className="columns">
            <CSSTransition in={!animationState} timeout={4000} classNames="fade" unmountOnExit>
                <div className="column login-column-1" ref={columnOne}>
                    <div className="video-parent">
                        <VideoPlayer />
                    </div>
                </div>
            </CSSTransition>

            <CSSTransition in={!animationState} timeout={4000} classNames="fade" unmountOnExit>
                <div className="column login-column-2" ref={columnTwo}>
                    <div className="login-right-side-parent">
                        <Socials headerText={"WELCOME BACK!"} subHeaderText={"Please enter your details to sign in."} />
                        <form onSubmit={handleSubmit}>
                            <div className="input-container-parent">
                                <div className="input-container">
                                    <p>E-mail Address</p>
                                    <EmailField email={email} setEmail={setEmail} />
                                    <p>Password</p>
                                    <PasswordField password={password} setPassword={setPassword} />
                                    <ErrorField error={error} />
                                </div>
                            </div>
                            <SubmitButton buttonText={"Sign In"} />
                            <p>Don't have an account yet? <a href="#" onClick={handleAnimation}>Sign Up</a></p>
                        </form>
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
};

export default Login;
