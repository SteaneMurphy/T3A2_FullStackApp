import React from 'react'; 
import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import NavBar from '../NavBar.jsx'; 

it('renders the brand name and navigation links', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/My Itineraries/i)).toBeInTheDocument();
    expect(screen.getByText(/New Itinerary/i)).toBeInTheDocument();
    expect(screen.getByText(/My Account/i)).toBeInTheDocument();
  });