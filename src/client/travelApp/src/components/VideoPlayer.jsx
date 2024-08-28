//modules
import React from "react";
import Video from "../assets/HeroVideo.mp4";

//video autoplays muted
const VideoPlayer = () => {
    return (
        <>
            <video autoPlay muted loop preload="auto">
              <source src={Video} />
            </video> 
        </>
    )
};

export default VideoPlayer;