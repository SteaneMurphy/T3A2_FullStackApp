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

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showRegister, setShowRegister] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

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
            await fetchUserItineraries();
            await fetchDestinations();
            navigate('/trips');
        } catch (err) {
            setError('Site could not be reached');
            console.error('Login error:', err);
        }
    };

    const handleAnimation = (e) => {
        e.preventDefault();
        setShowRegister(true);
    };

    const loginColumnRef = useRef(null);
    const registerColumnRef = useRef(null);

    useEffect(() => {
        if (showRegister) {
            gsap.to(loginColumnRef.current, {
                xPercent: 100,
                duration: 1,
                ease: "power2.inOut",
            });
            gsap.to(registerColumnRef.current, {
                xPercent: -100,
                duration: 1,
                ease: "power2.inOut",
                onComplete: () => navigate('/register'),
            });
        }
    }, [showRegister]);

    return (
        <div className="columns">
            <CSSTransition
                in={!showRegister}
                timeout={4000}
                classNames="fade"
                unmountOnExit
            >
                <div className="column login-column-1" ref={loginColumnRef}>
                    <div className="video-parent">
                        <VideoPlayer />
                    </div>
                </div>
            </CSSTransition>

            <CSSTransition
                in={!showRegister}
                timeout={4000}
                classNames="fade"
                unmountOnExit
            >
                <div className="column login-column-2" ref={registerColumnRef}>
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
