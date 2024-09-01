import React from 'react'; 
import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import NavBar from '../src/NavBar.jsx'; 

it('renders the brand name and navigation links', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/travel mate/i)).toBeInTheDocument();
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/create new/i)).toBeInTheDocument();
  });