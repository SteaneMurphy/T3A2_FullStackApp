import React from "react";
import Video from "./assets/HeroVideo.mp4";
import Google from "./assets/google.svg";
import Twitter from "./assets/twitter.svg";
import Apple from "./assets/apple.svg";
import Logo from "./assets/logo.png"
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const CreateTrip = () => {
   
    return (
        <>      
            <NavBar />
            <h2>Create Itinerary</h2>
        </>
    )
};

export default CreateTrip;