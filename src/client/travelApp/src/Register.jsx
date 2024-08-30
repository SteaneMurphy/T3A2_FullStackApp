// modules
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { FirstNameField, LastNameField } from "./components/NameField.jsx";

const Register = () => {
    //instances
    const navigate = useNavigate();

    //locat state get/set
    const [firstName, setFirstName] = useState("");                                        //user input - first name
    const [lastName, setLastName] = useState("");                                          //user input - last name
    const [email, setEmail] = useState("");                                                //user input - email
    const [password, setPassword] = useState("");                                          //user input - password
    const [animationState, runAnimation] = useState(false);                                //animation state boolean
    const [error, setError] = useState("");                                                //current stored error

    //global state
    const fetchUserItineraries = useGlobalStore((state) => state.fetchUserItineraries);   //fetchUserItineraries function
    const addUser = useGlobalStore((state) => state.addUser);                             //addUser function

    /*
        Handles form submission.
        Calls addUser function in the global state
          this function creates a new user in the database
          and sets user global state.
    */
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addUser(firstName, lastName, email, password);
            await fetchUserItineraries();
            navigate('/trips');
        } catch (err) {
            setError('Site could not be reached');
            console.error('Register error:', err);
        }
    };

    /* 
        Handles animation transition when user clicks on the 'Sign In'
            link.
        The animation swtiches the x position and adjusts the opacity of each
            column.
    */
    const handleAnimation = (e) => {
        e.preventDefault();
        runAnimation(true);
    };

    const columnTwo = useRef(null);
    const columnOne = useRef(null);

    useEffect(() => {
        if (animationState) {
            gsap.to(columnOne.current, {
                xPercent: -100,
                duration: 1,
                ease: "power2.inOut",
            });
            gsap.to(columnTwo.current, {
                xPercent: 100,
                duration: 1,
                ease: "power2.inOut",
                onComplete: () => navigate('/'),
            });
        }
    }, [animationState]);

    return (
        <div className="columns">
            <CSSTransition in={!animationState} timeout={4000} classNames="fade" unmountOnExit>
                <div className="column login-column-2" ref={columnTwo}>
                    <div className="register-right-side-parent">
                        <Socials headerText={"ADVENTURE AWAITS!"} subHeaderText={"Please enter your details to create an account."} />
                        <form onSubmit={handleSubmit}>
                            <div className="input-container-parent">
                                <div className="input-container">
                                    <p>First Name</p>
                                    <FirstNameField name={firstName} setFirstName={setFirstName} />
                                    <p>Last Name</p>
                                    <LastNameField name={lastName} setLastName={setLastName} />
                                    <p>E-mail Address</p>
                                    <EmailField email={email} setEmail={setEmail} />
                                    <p>Password</p>
                                    <PasswordField password={password} setPassword={setPassword} />
                                    <ErrorField error={error} />
                                </div>
                            </div>
                            <SubmitButton buttonText={"Sign Up"} />
                            <p>Already have an account? <a href="#" onClick={handleAnimation}>Sign In</a></p>
                        </form>
                    </div>
                </div>
            </CSSTransition>

            <CSSTransition in={!animationState} timeout={4000} classNames="fade" unmountOnExit>
                <div className="column login-column-1" ref={columnOne}>
                    <div className="video-parent">
                        <VideoPlayer />
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
};

export default Register;
