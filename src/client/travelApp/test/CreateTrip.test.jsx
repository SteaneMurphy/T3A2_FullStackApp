import React from 'react';
import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CreateTrip from '../src/CreateTrip.jsx';

it('renders CreateTrip component with necessary elements', () => {
  render(
    <MemoryRouter>
      <CreateTrip />
    </MemoryRouter>
  );

  expect(screen.getByRole('navigation')).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/enter itinerary name/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/type to select country/i)).toBeInTheDocument();
  expect(screen.getByText(/finalise itinerary!/i)).toBeInTheDocument();
});
