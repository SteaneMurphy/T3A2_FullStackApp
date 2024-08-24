import React from "react";
import Image from "../assets/test1.jpg"

//images will be sent into this component, hardcoded for the time being
const DisplayImage = () => {
    return (
        <>
            <img src={Image} alt="destination" />
        </>
    )
};

export default DisplayImage;