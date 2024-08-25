import React from "react";
import NavBar from "./NavBar";
import { CountrySelectField, TripNameField } from "./components/NameField";
import DestinationList from "./components/DestinationList";
import ResultsBox from "./components/ResultsBox";
import MainImage from "./assets/createTripMainImage.webp";
import SecondImage from "./assets/createTripSecondImage.webp";

const CreateTrip = () => {
   
    return (
        <>      
            <NavBar />
            <div className="columns">
                <div className="column">
                    <h2>WHERE TO?</h2>
                    <p>Itinerary Name</p>
                    <TripNameField />
                    <p>Country</p>
                    <CountrySelectField />
                    <p>Destintations</p>
                    <ResultsBox />
                    <img src={MainImage}></img>
                </div>
                <div className="column">
                    <h2>WHAT TO DO?</h2>
                    <DestinationList />
                </div>
                <div className="column">
                    <img src={SecondImage}></img>
                    <h2>Itinerary Name</h2>
                    <DestinationList />
                </div>
            </div>
        </>
    )
};

export default CreateTrip;