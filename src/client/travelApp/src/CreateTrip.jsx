import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { CountrySelectField, TripNameField } from "./components/NameField";
import DestinationList from "./components/DestinationList";
import ResultsBox from "./components/ResultsBox";
import MainImage from "./assets/createTripMainImage.webp";
import SecondImage from "./assets/createTripSecondImage.webp";
import SubmitButton from "./components/SubmitButton";
import { useGlobalStore } from "./store";

const CreateTrip = () => {
    const fetchDestinations = useGlobalStore((state) => state.fetchDestinations);
    useEffect(() => {fetchDestinations();}, [fetchDestinations]);

    const [tripName, setTripname] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [matchingCountries, setMatchingCountries] = useState([]);
    useEffect(() => {
        console.log("Matching Countries updated:", matchingCountries);
    }, [matchingCountries]);

    const handleCountryChange = (input) => {
        const countries = [];
        setSelectedCountry(input);

        if (input.trim() === '') {
            setMatchingCountries([]);
        } else {
            const filteredCountries = countries.filter(country =>
                country.toLowerCase().includes(input.toLowerCase())
            );
            setMatchingCountries(filteredCountries);
        };

        setMatchingCountries(filteredCountries);
    };

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
                        <CountrySelectField name={selectedCountry} setCountryName={handleCountryChange} />
                        <p>Destinations</p>
                        <ResultsBox arrayOfResults={matchingCountries}/>
                    </form>
                    <img src={MainImage}></img>
                </div>
                <div className="column">
                    <h2>WHAT TO DO?</h2>
                    <DestinationList />
                </div>
                <div className="column">
                    <img src={SecondImage}></img>
                    <h2>{tripName ? tripName : "New Itinerary"}</h2>
                    <DestinationList />
                    <SubmitButton buttonText={ "Finalise Itinerary!" } />
                </div>
            </div>
        </>
    )
};

export default CreateTrip;