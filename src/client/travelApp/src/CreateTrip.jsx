import React from "react";
import NavBar from "./NavBar";
import { CountrySelectField, TripNameField } from "./components/NameField";
import DestinationList from "./components/DestinationList";
import DisplayImage from "./components/DisplayImage";
import ResultsBox from "./components/ResultsBox";

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
                    <p>Desintations</p>
                    <ResultsBox />
                    <DisplayImage />
                </div>
                <div className="column">
                    <h2>WHAT TO DO?</h2>
                    <DestinationList />
                </div>
                <div className="column">
                    <DisplayImage />
                    <h2>Itinerary Name</h2>
                    <DestinationList />
                </div>
            </div>
        </>
    )
};

export default CreateTrip;