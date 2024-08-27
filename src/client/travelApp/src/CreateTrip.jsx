import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { CountrySelectField, TripNameField } from "./components/NameField";
import DestinationList from "./components/DestinationList";
import ResultsBox from "./components/ResultsBox";
import MainImage from "./assets/createTripMainImage.webp";
import SecondImage from "./assets/createTripSecondImage.webp";
import SubmitButton from "./components/SubmitButton";
import { useGlobalStore } from "./store";
import { apiUrl } from './config.js';
import { useNavigate } from "react-router-dom";

const countryList = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
    "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
    "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
    "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso",
    "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic",
    "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia",
    "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
    "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini",
    "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
    "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras",
    "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
    "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North",
    "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho",
    "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi",
    "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius",
    "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco",
    "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand",
    "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan",
    "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland",
    "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
    "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
    "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
    "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan",
    "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan",
    "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago",
    "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
    "United Kingdom", "USA", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
    "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

const CreateTrip = () => {

    const [tripName, setTripName] = useState("");
    const [countryInput, setCountryInput] = useState("");
    const [filteredDestinations, setFilteredDestinations] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [selectedDestinations, setSelectedDestinations] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const fetchDestinations = useGlobalStore((state) => state.fetchDestinations);
    const destinations = useGlobalStore((state) => state.destinations);
    const getCurrentSession = useGlobalStore((state) => state.session_id);
    const fetchUserItineraries = useGlobalStore((state) => state.fetchUserItineraries);
    

    useEffect(() => {
        fetchDestinations();
    }, []);

    useEffect(() => {
        let result = [];
        if (countryInput.trim() === "") {
            result = [];
        } else {
            result = countryList.filter(country =>
                country.toLowerCase().includes(countryInput.toLowerCase())
            );
        }
        setFilteredCountries(result);
    }, [countryInput]);

    const filterDestinationsByCountry = (country) => {
        const destinationsArray = Object.values(destinations);
        const filtered = destinationsArray.filter(destination =>
            destination.country.toLowerCase() === country.toLowerCase()
        );
        setFilteredDestinations(filtered);
    };

    const handleSelectDestination = (destination) => {
        setSelectedDestinations((prevSelected) => [...prevSelected, destination]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const selectedDestinationIds = selectedDestinations.map(destination => destination._id);

        try {
            const response = await fetch(`${apiUrl}/trips`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCurrentSession}`
              },
              body: JSON.stringify(
                {
                    title: tripName, 
                    destinations: selectedDestinationIds,
                }),
            });
      
            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Server error: ${errorData}`);
            }
            
            const responseData = await response.json();

            await fetchUserItineraries();
            navigate('/trips');
      
          } catch (err) {
            setError(error);
          }
    };

    return (
        <>      
            <NavBar />
            <div className="columns">
                    <div className="column">
                        <h2>WHERE TO?</h2>
                            <p>Itinerary Name</p>
                            <TripNameField name={tripName} setTripName={setTripName} />
                            <p>Country</p>
                            <CountrySelectField input={countryInput} setInput={setCountryInput} />
                            <p>Destinations</p>
                            <ResultsBox array={filteredCountries} customFunc={filterDestinationsByCountry} />
                        <img src={MainImage}></img>
                    </div>
                    <div className="column">
                        <h2>WHAT TO DO?</h2>
                        <DestinationList destinations={filteredDestinations} onSelectDestination={handleSelectDestination} />
                    </div>
                    <div className="column">
                        <form onSubmit={handleSubmit}>
                            <img src={SecondImage}></img>
                            <h2>{tripName ? tripName : "New Itinerary"}</h2>
                            <DestinationList destinations={selectedDestinations} />
                            <SubmitButton buttonText={ "Finalise Itinerary!" } />
                        </form>
                    </div>
            </div>
        </>
    )
};

export default CreateTrip;