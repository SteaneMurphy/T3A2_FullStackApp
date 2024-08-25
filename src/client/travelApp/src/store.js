import { create } from 'zustand';

const apiBase = "http://localhost:4000";

const useGlobalStore = create((set) => ({
    session_id: null,
    user: {},
    itineraries: {},

    setUserSession: (token, user) => set({ session_id: token, user: user }),

    clearUserSession: () => set({ session_id: null, user: null }),

    fetchUserItineraries: async () => {
      const { session_id, user } = useGlobalStore.getState();

      if (!session_id) {
        console.error('No session available, user might not be authenticated');
        return;
      }
  
      try {
        const response = await fetch(`${apiBase}/trips`, {
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

      const response = await fetch(`${apiBase}/register`, {
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
    }
}));

export { useGlobalStore };
