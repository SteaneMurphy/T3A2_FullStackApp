import React, { useState, useEffect } from "react";

const bufferToBase64 = (buffer) => {
    const binary = String.fromCharCode(...new Uint8Array(buffer));
    return window.btoa(binary);
};

//function needs reworking
const DisplayImage = ({ data }) => {
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        const convertToBase64 = async () => {
            if (data && data.data && Array.isArray(data.data)) {
                const base64String = bufferToBase64(data.data);
                setImageUrl(`data:image/jpeg;base64,${base64String}`);
            }
        };

        convertToBase64();
    }, [data]);

    return (
        <>
            {imageUrl ? <img src={imageUrl} alt="destination" /> : <div>No image data available</div>}
        </>
    );
};

export default DisplayImage;