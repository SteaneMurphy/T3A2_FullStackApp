import React, { useState } from "react";
import NavBar from "./NavBar";
import { CountrySelectField, TripNameField } from "./components/NameField";
import DestinationList from "./components/DestinationList";
import ResultsBox from "./components/ResultsBox";
import MainImage from "./assets/createTripMainImage.webp";
import SecondImage from "./assets/createTripSecondImage.webp";
import SubmitButton from "./components/SubmitButton";

const CreateTrip = () => {
    const [tripName, setTripname] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();


    };

    return (
        <>      
            <NavBar />
            <div className="columns">
                    <div className="column">
                        <h2>WHERE TO?</h2>
                        <form onSubmit={handleSubmit}>
                            <p>Itinerary Name</p>
                            <TripNameField name={tripName} setTripName={setTripname} />
                            <p>Country</p>
                            <CountrySelectField />
                            <p>Destintations</p>
                            <ResultsBox />
                        </form>
                        <img src={MainImage}></img>
                    </div>
                    <div className="column">
                        <h2>WHAT TO DO?</h2>
                        <DestinationList />
                    </div>
                    <div className="column">
                        <img src={SecondImage}></img>
                        <h2>Current Itinerary</h2>
                        <DestinationList />
                        <SubmitButton buttonText={ "Finalise Itinerary!" } />
                    </div>
            </div>
        </>
    )
};

export default CreateTrip;