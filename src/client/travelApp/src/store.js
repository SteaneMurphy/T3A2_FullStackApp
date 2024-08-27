import { create } from 'zustand';
import { apiUrl } from './config.js';

const useGlobalStore = create((set) => ({
    session_id: null,
    user: {},
    itineraries: {},
    destinations: {},

    setUserSession: (token, user) => set({ session_id: token, user: user }),

    clearUserSession: () => set({ session_id: null, user: null }),

    setCurrentItinerary: (itinerary) => set({ currentItinerary: itinerary }),
    
    clearCurrentItinerary: () => set({ currentItinerary: null }),

    fetchUserItineraries: async () => {
      const { session_id, user } = useGlobalStore.getState();

      if (!session_id) {
        console.error('No session available, user might not be authenticated');
        return;
      }
  
      try {
        const response = await fetch(`${apiUrl}/trips`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session_id}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch itineraries');
        }
  
        const itinerariesArray = await response.json();
        const userItineraries = itinerariesArray.filter(itinerary => itinerary.user === user._id);

        const itinerariesObject = userItineraries.reduce((acc, itinerary) => {
          acc[itinerary._id] = itinerary;
          return acc;
        }, {});
  
        set({ itineraries: itinerariesObject });
      } 
      catch (error) {
        console.error('Failed to fetch itineraries:', error);
      }
    },

    addUser: async (firstName, lastName, email, password) => {
      const newUserEntry = { firstName, lastName, email, password };

      const response = await fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserEntry),
      })

      if (response.ok) {
        const { token, user } = await response.json();
        useGlobalStore.getState().setUserSession(token, user);
      } 
      else {
          console.error("Failed to register user");
      }
    },

    fetchDestinations: async () => {
      const { session_id } = useGlobalStore.getState();

      try {
        const response = await fetch(`${apiUrl}/destinations`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session_id}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch destinations');
        }
  
        const destinationsArray = await response.json();

        const destinationsObject = destinationsArray.reduce((acc, destination) => {
          acc[destination._id] = destination;
          return acc;
        }, {});
  
        set({ destinations: destinationsObject });
      } 
      catch (error) {
        console.error('Failed to fetch destinations:', error);
      }
    },
}));

export { useGlobalStore };
