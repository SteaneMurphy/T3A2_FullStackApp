// modules
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { CSSTransition } from "react-transition-group";
import VideoPlayer from "./components/VideoPlayer.jsx";
import Socials from "./components/Socials.jsx";
import EmailField from "./components/EmailField.jsx";
import PasswordField from "./components/PasswordField.jsx";
import SubmitButton from "./components/SubmitButton.jsx";
import ErrorField from "./components/ErrorField.jsx";
import { FirstNameField, LastNameField } from "./components/NameField.jsx";

const Register = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showLogin, setShowLogin] = useState(false);

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

    const handleAnimation = (e) => {
        e.preventDefault();
        setShowLogin(true);
    };

    const loginColumnRef = useRef(null);
    const registerColumnRef = useRef(null);

    useEffect(() => {
        if (showLogin) {
            gsap.to(registerColumnRef.current, {
                xPercent: -100,
                duration: 1,
                ease: "power2.inOut",
            });
            gsap.to(loginColumnRef.current, {
                xPercent: 100,
                duration: 1,
                ease: "power2.inOut",
                onComplete: () => navigate('/'),
            });
        }
    }, [showLogin]);

    return (
        <div className="columns">
            <CSSTransition
                in={!showLogin}
                timeout={4000}
                classNames="fade"
                unmountOnExit
            >
                <div className="column login-column-2" ref={loginColumnRef}>
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

            <CSSTransition
                in={!showLogin}
                timeout={4000}
                classNames="fade"
                unmountOnExit
            >
                <div className="column login-column-1" ref={registerColumnRef}>
                    <div className="video-parent">
                        <VideoPlayer />
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
};

export default Register;
