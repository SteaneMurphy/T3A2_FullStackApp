//modules
import React from "react";

//images
import Google from "../assets/google.svg";
import Twitter from "../assets/twitter.svg";
import Apple from "../assets/apple.svg";
import Logo from "../assets/logo.PNG";

const Socials = () => {
    return (
        <>
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
        </>
    )
};

export default Socials;