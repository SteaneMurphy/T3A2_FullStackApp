//modules
import React, { useState, useEffect } from "react";
import { CountrySelectField, TripNameField } from "./components/NameField";
import { useGlobalStore } from "./store";
import { apiUrl } from './config.js';
import { useNavigate } from "react-router-dom";

//components
import NavBar from "./NavBar";
import DestinationList from "./components/DestinationList";
import ResultsBox from "./components/ResultsBox";
import MainImage from "./assets/createTripMainImage.webp";
import SecondImage from "./assets/createTripSecondImage.webp";
import SubmitButton from "./components/SubmitButton";

//temp country list - to add to database or backend
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
    //instances
    const navigate = useNavigate();

    //local state get/set
    const [tripName, setTripName] = useState("");                                               //user input - itinerary name
    const [countryInput, setCountryInput] = useState("");                                       //user input - country filter
    const [filteredDestinations, setFilteredDestinations] = useState([]);                       //destinations to display from filter
    const [filteredCountries, setFilteredCountries] = useState([]);                             //countries to display from filter
    const [selectedDestinations, setSelectedDestinations] = useState([]);                       //destinations added to unsaved itinerary
    const [error, setError] = useState("");                                                     //stored current error

    //global state
    const fetchUserItineraries = useGlobalStore((state) => state.fetchUserItineraries);         //fetchUserItineraries function
    const fetchDestinations = useGlobalStore((state) => state.fetchDestinations);               //fetchDestinations function
    const destinations = useGlobalStore((state) => state.destinations);                         //destinations list
    const getCurrentSession = useGlobalStore((state) => state.session_id);                      //stored auth token 
    
    //populate destination in global store, run once on first mount
    useEffect(() => {
        fetchDestinations();
    }, []);

    /* 
        This useEffect checks for any change in state in the 
            CountrySelectField component.
        This input looks for partial matches within the list of
            countries (countryList) and displays however many countries
            make a match.
        The trim function ensures that nothing is displayed in the ResultsBox
            component if input is empty.
    */
    useEffect(() => 
    {
        let result = [];

        if (countryInput.trim() === "") 
        {
            result = [];
        } 
        else 
        {
            result = countryList.filter(country =>
                country.toLowerCase().includes(countryInput.toLowerCase())
            );
        }

        setFilteredCountries(result);
    }, [countryInput]);

    /* 
        Function is called when a user clicks on a tile within the country
            results box.
        Country name is returned and checked against list of destinations
            (country property).
        The filteredDestination state is populated by each match on the country
            property and is displayed in the DestinationList component.
    */
    const filterDestinationsByCountry = (country) => {
        const destinationsArray = Object.values(destinations);
        const filtered = destinationsArray.filter(destination => destination.country.toLowerCase() === country.toLowerCase());
        setFilteredDestinations(filtered);
    };

    /*
        Callback function when a user clicks on a destination tile.
        The selectedDestinations local state is updated each time a time is clicked.
        The updated selectedDestinations state combines the existing state with the new destination
            to be added.
    */
    const handleSelectDestination = (destination) => {
        setSelectedDestinations((prevSelected) => [...prevSelected, destination]);
    };

    /* 
        Handles form submission.
        Takes all destinations selected by user stored in temp state.
        Send state as a POST request to itinerary creation API.
        New itinerary added to database.
        Form submission triggered by the 'Finalise Itinerary' button.
    */
    const handleSubmit = async (e) => 
    {
        e.preventDefault();

        const selectedDestinationIds = selectedDestinations.map(destination => destination._id);

        try 
        {
            const response = await fetch(`${apiUrl}/trips`, 
            {
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
      
            if (!response.ok) 
            {
                const errorData = await response.text();
                throw new Error(`Server error: ${errorData}`);
            }
            
            const responseData = await response.json();

            await fetchUserItineraries();
            navigate('/trips');
      
          } 
          catch (err) 
          {
            setError(error);
          }
    };

    return (
        <>      
            <NavBar />
            {/* Divide page into three columns */}
            <div className="columns">

                    {/* Country/destination select filter - Left side */}
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

                    {/* List of destinations based on country filter - Middle */}
                    <div className="column">
                        <h2>WHAT TO DO?</h2>
                        <DestinationList destinations={filteredDestinations} onSelectDestination={handleSelectDestination} />
                    </div>

                    {/* Unsaved Itinerary - Right side */}
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