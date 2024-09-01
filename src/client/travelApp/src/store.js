//modules
import { create } from 'zustand';
import { apiUrl } from './config.js';

/* 
    The global state stores information across the application for use in multiple components.
    It is similar to a singleton pattern. This store is split into functions and state variables.
*/
const useGlobalStore = create((set) => 
({
    //global state variables
    session_id: null,                 //user auth token
    user: {},                         //user specific information
    itineraries: {},                  //user specific itinerary information
    destinations: {},                 //all destinations offered by the app

    //takes the auth token and user information sent by the API and stores it
    setUserSession: (token, user) => set({ session_id: token, user: user }),

    //clears the user global state
    clearUserSession: () => set({ session_id: null, user: null }),

    //map specific variables (may not be needed)
    setCurrentItinerary: (itinerary) => set({ currentItinerary: itinerary }),
    clearCurrentItinerary: () => set({ currentItinerary: null }),

    /* 
        This function queries the database for any itineraries linked
          to the current logged in user.
        The user state is retrieved and used in a GET request to the API.
        A successful response will return an array of itineraries.
        The returned array contains all itineraries in the database and
          the comparison check should probably be handled by the API.
          Due to this, the comparison is handled in this state. All itineraries
          that match the user ID are split out.
        These itineraries then stored in the global state 'itineraries'.
    */
    fetchUserItineraries: async () => 
    {
      const { session_id, user } = useGlobalStore.getState();

      if (!session_id) 
      {
        console.error('No session available, user might not be authenticated');
        return;
      }
  
      try 
      {
        const response = await fetch(`${apiUrl}/trips`, 
        {
          method: "GET",
          headers: 
          {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session_id}`
          }
        });

        if (!response.ok) 
        {
          throw new Error('Failed to fetch itineraries');
        }
  
        const itinerariesArray = await response.json();
        const userItineraries = itinerariesArray.filter(itinerary => itinerary.user === user._id);

        //the reduce function accumlates the results of the callback function.
        //in this case each itinerary is using its own ID as a key and the
        //rest of the itinerary as the object value.
        const itinerariesObject = userItineraries.reduce((acc, itinerary) => 
        {
          acc[itinerary._id] = itinerary;
          return acc;
        }, {});
  
        set({ itineraries: itinerariesObject });
      } 
      catch (error) 
      {
        console.error('Failed to fetch itineraries:', error);
      }
    },

    /* 
        Takes in user inputted information from Register.jsx and
          sends it to the registration API.
        This is a POST request and a auth token and user information
          object is returned.
        This information is then set in the global state by the 
          function 'setUserSession'.
    */
    addUser: async (firstName, lastName, email, password) => {
      const newUserEntry = { firstName, lastName, email, password };

      const response = await fetch(`${apiUrl}/register`, 
      {
        method: "POST",
        headers: 
        {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserEntry),
      })

      if (response.ok) 
      {
        const { token, newUser } = await response.json();
        useGlobalStore.getState().setUserSession(token, newUser);
      } 
      else 
      {
          console.error("Failed to register user");
      }
    },

    /* 
        This function sends a request to the API to return
          all destinations stored in the database.
        The database object is returned and destination is changed and
          stored in a new object. This is acheived using the reduce function
          whereby each destination ID is made a key and the rest of the
          destination object set to an object value.
        This destinations object is set in the global store using the
          'set' function with the 'destination' variable.
    */
    fetchDestinations: async () => {
      const { session_id } = useGlobalStore.getState();

      try 
      {
        const response = await fetch(`${apiUrl}/destinations`, 
        {
          method: "GET",
          headers: 
          {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session_id}`
          }
        });

        if (!response.ok) 
        {
          throw new Error('Failed to fetch destinations');
        }
  
        const destinationsArray = await response.json();

        const destinationsObject = destinationsArray.reduce((acc, destination) => 
        {
          acc[destination._id] = destination;
          return acc;
        }, {});
  
        set({ destinations: destinationsObject });
      } 
      catch (error) 
      {
        console.error('Failed to fetch destinations:', error);
      }
    },
}));

export { useGlobalStore };
