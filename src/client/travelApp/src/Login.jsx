import React from "react";
import Video from "./assets/HeroVideo.mp4";
import Google from "./assets/google.svg";
import Twitter from "./assets/twitter.svg";
import Apple from "./assets/apple.svg";
import { Link } from "react-router-dom";
import NavBar from './NavBar';

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
    
    return (
        <>      
            <div class="columns">
                <div class="column">
                    <video autoplay="autoplay" muted loop preload="auto">
                        <source src={Video}/>
                    </video> 
                </div>
                <div class="column">
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
                    <p>E-mail Address</p>
                    <input
                    class="input is-rounded"
                    type="text"
                    placeholder="Enter your email..."
                    />
                    <p>Password</p>
                    <input
                    class="input is-rounded"
                    type="password"
                    placeholder="Enter your password..."
                    />
                </div>
            </div>
        </>
    )
};

export default Login;