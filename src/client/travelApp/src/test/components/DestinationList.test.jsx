import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DestinationList from '../../components/DestinationList';

describe('DestinationList Component', () => {
  it('renders a list of destinations or a fallback message', () => {
    const mockDestinations = [
      { _id: '1', name: 'Destination 1' },
      { _id: '2', name: 'Destination 2' },
    ];
    render(<DestinationList destinations={mockDestinations} />);
    
    expect(screen.getByText(/destination 1/i)).toBeInTheDocument();
    expect(screen.getByText(/destination 2/i)).toBeInTheDocument();
  });

  it('renders a fallback message when no destinations are available', () => {
    render(<DestinationList destinations={[]} />);
    
    expect(screen.getByText(/Please choose some destinations/i)).toBeInTheDocument();
  });
});
