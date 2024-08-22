import React from "react";
import Video from "./assets/HeroVideo.mp4";
import Google from "./assets/google.svg";
import Twitter from "./assets/twitter.svg";
import Apple from "./assets/apple.svg";
import Logo from "./assets/logo.png"
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

const ShowTrips = () => {   
    return (
        <>     
            <NavBar />
            <h2>Show all Itineraries</h2>
        </>
    )
};

export default ShowTrips;