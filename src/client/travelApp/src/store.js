import { create } from 'zustand';

const apiBase = "http://localhost:4000";

//store user session token
const useAuthStore = create((set) => ({
  session_id: null,
  setUser: (token) => set({ session_id: token }),
  clearUser: () => set({ session_id: null }),
}));

const useStore = create((set) => ({
    user: {},

    addUser: async (_firstName, _lastName, _email, _password) => {
      const newUserEntry = { firstName: _firstName, lastName: _lastName, 
                             email: _email, password: _password };
                             console.log(newUserEntry);
      const response = await fetch(`${apiBase}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserEntry),
      })
      const returnedEntry = await response.json();
      console.log(returnedEntry);
    }
  }
));

const useTripStore = create((set) => ({
  trips: {},

  setTrips: (tripsArray) => {
    const tripsObject = {};
    for (let i = 0; i < tripsArray.length; i++) {
      const trip = tripsArray[i];
      tripsObject[trip.id] = trip;
    }
    set({ trips: tripsObject });
  },

  fetchTrips: async () => {
    try {
      const response = await fetch(`${apiBase}/trips`);
      const tripsArray = await response.json();
      const tripsObject = {};
      for (let i = 0; i < tripsArray.length; i++) {
        const trip = tripsArray[i];
        tripsObject[trip.id] = trip;
      }
      set({ trips: tripsObject });
    } catch (error) {
      console.error('Failed to fetch trips:', error);
    }
  },

  fetchTrip: async (id) => {
    try {
      const response = await fetch(`${apiBase}/trips/${id}`);
      const trip = await response.json();
      set((state) => ({
        trips: { ...state.trips, [id]: trip },
      }));
    } catch (error) {
      console.error(`Failed to fetch trip with id ${id}:`, error);
    }
  },
}));

export { useAuthStore, useTripStore, useStore };
