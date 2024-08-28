//modules
import React, { useState, useEffect } from "react";

/*
    This helper function converts binary into a base64 string.
    The binary is passed as an 8bit array and processed to base64.
    Due to the large character size of the file, it is split into
        multiple parts until the array is empty.
    Window.btoa returns the base64 format or data type.
*/
const bufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};

const DisplayImage = ({ data }) => 
{
    //local state get/set
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => 
    {
        const convertToBase64 = async () => 
        {
            if (data && data.data && Array.isArray(data.data)) 
            {
                //call the helper function and set its output to the local state variable
                //as a base64 string
                const base64String = bufferToBase64(data.data);
                setImageUrl(`data:image/jpeg;base64,${base64String}`);
            }
        };

        convertToBase64();
    }, [data]);

    //display image if imageUrl is not empty
    return (
        <>
            {imageUrl ? <img src={imageUrl} alt="destination" /> : <div>No image data available</div>}
        </>
    );
};

export default DisplayImage;
