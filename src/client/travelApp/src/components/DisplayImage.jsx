import React, { useState, useEffect } from "react";

const bufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};

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
