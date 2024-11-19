import React, {useEffect} from 'react';
import axios from 'axios';

const ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

function BackgroundChanger(){
    // fetching a random spooky image from unsplash
    const fetchBackgroundImage = async() => {
        try{
            const response = await axios.get("https://api.unsplash.com/photos/random", {
                params: {query: "spooky", orientation: "landscape"},
                headers: {
                    Authorization: `Client-ID ${ACCESS_KEY}`
                },
            });

            document.body.style.backgroundImage = `url(${response.data.urls.full})`;
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundPosition = "center";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.height = "100vh";
            document.body.style.width = "100vw";
            document.body.style.margin = "0";
            document.body.style.overflow = "hidden"; // Prevents scrollbars
            document.documentElement.style.height = "100vh";
            document.documentElement.style.overflow = "hidden"; // Prevents scrollbars

        }catch(error){
            console.log("Error fetching image: ", error);
        }
    };

    // changing background every 30 seconds
    useEffect(() => {
        fetchBackgroundImage();

        const imageInterval = setInterval(() => {
            fetchBackgroundImage();
        }, 30000);

        return () => clearInterval(imageInterval);
    }, []);

    return (
        <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black color
        zIndex: 1,
        pointerEvents: "none", // Allow click events to pass through
      }}
    />
    );
}

export default BackgroundChanger;