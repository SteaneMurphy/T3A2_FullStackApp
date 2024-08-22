import React from "react";
import Video from "./assets/HeroVideo.mp4";
import Google from "./assets/google.svg";
import Twitter from "./assets/twitter.svg";
import Apple from "./assets/apple.svg";
import Logo from "./assets/logo.png"
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    //   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setError('Please fill in both fields');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:3000/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         throw new Error('Login failed');
//       }

//       const data = await response.json();
//       console.log('Login successful:', data);

//     } catch (err) {
//       setError(err.message);
//       console.error('Login error:', err);
//     }
    const nav = useNavigate()
    const submitHandler = (e) => {
        e.preventDefault()
        nav(`/trips`)
    };
    
    return (
        <>      
            <div class="columns">
                <div class="column">
                    <video autoplay="autoplay" muted loop preload="auto">
                        <source src={Video}/>
                    </video> 
                </div>
                <div class="column">
                    <img src={Logo}></img>
                    <h2 className="my-5 is-size-5">Welcome Back!</h2>
                    <h3>Please enter your details to sign in.</h3>
                    <div class="columns">
                        <div class="column signin">
                        <img src={Apple}></img>
                        </div>
                        <div class="column signin">
                        <img src={Google}></img>
                        </div>
                        <div class="column signin">
                        <img src={Twitter}></img>
                        </div>
                    </div>
                        <div class="field">
                            <p class="control has-icons-left has-icons-right">
                                <input class="input" type="email" placeholder="Enter your email..."/>
                                <span class="icon is-small is-left">
                                <i class="fas fa-envelope"></i>
                                </span>
                            </p>
                            </div>
                            <div class="field">
                            <p class="control has-icons-left">
                                <input class="input" type="password" placeholder="Enter your password..."/>
                                <span class="icon is-small is-left">
                                <i class="fas fa-lock"></i>
                                </span>
                            </p>
                            </div>
                            <div class="field">
                            <form onSubmit={submitHandler}>
                                <p class="control">
                                    <button class="button is-success">Sign In</button>
                                </p>
                                <p>Don't have an account yet?<Link to="register"> Sign Up</Link></p>
                            </form>
                        </div>
                </div>
            </div>
        </>
    )
};

export default Login;