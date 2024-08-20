import React from "react";
import Video from "./baldurs.mp4";
import { Link } from "react-router-dom";

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
                    <video >
                        <source autoplay loop muted src={Video}/>
                    </video> 
                </div>
                <div class="column">
                    <h2 className="my-5 is-size-5">Welcome Back!</h2>
                    <h3>Please enter your details to sign in.</h3>
                    <p>Password</p>
                    <input
                    class="input is-rounded"
                    type="password"
                    placeholder="Enter your password..."
                    />
                    <p>E-mail Address</p>
                    <input
                    class="input is-rounded"
                    type="text"
                    placeholder="Enter your email..."
                    />
                </div>
            </div>
        </>
    )
};

export default Login;