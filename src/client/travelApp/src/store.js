import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  clearUser: () => set({ user: null }),
}));

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
      const response = await fetch('http://localhost:4000/trips');
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
      const response = await fetch(`http://localhost:4000/trips/${id}`);
      const trip = await response.json();
      set((state) => ({
        trips: { ...state.trips, [id]: trip },
      }));
    } catch (error) {
      console.error(`Failed to fetch trip with id ${id}:`, error);
    }
  },
}));

export { useAuthStore, useTripStore };
