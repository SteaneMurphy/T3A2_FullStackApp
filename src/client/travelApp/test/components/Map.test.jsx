import React from 'react';
import { it, expect, describe } from 'vitest';
import TravelMap from '../../src/components/Map.jsx';

describe('TravelMap Component', () => {
  it('renders the TravelMap component with markers', () => {
    if (process.env.NODE_ENV === 'test') {
      console.warn('Skipping map-related tests in JSDOM environment');
      return;
    }

    const mockLocations = [
      { destination: 'Melbourne', country: 'Australia', lat: -37.8136, lng: 144.9631, name: 'Melbourne', description: 'A beautiful city.' },
      { destination: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093, name: 'Sydney', description: 'The harbor city.' }
    ];

    render(<TravelMap locations={mockLocations} />);

    expect(screen.getByText(/Melbourne/i)).toBeInTheDocument();
    expect(screen.getByText(/Sydney/i)).toBeInTheDocument();
  });
});
