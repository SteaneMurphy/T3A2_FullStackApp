import React from 'react';
import { it, expect, describe, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TripOverview from '../../components/TripOverview.jsx';
import { useNavigate } from 'react-router-dom';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('TripOverview Component', () => {
  it('renders the TripOverview with title and notes and handles click', () => {
    const mockTrip = {
      _id: '1',
      title: 'Test Trip',
      notes: 'This is a test trip.',
      data: { data: [255, 216, 255] },
    };

    const mockNavigate = vi.fn();
    useNavigate.mockReturnValue(mockNavigate);

    render(<TripOverview trip={mockTrip} />);

    expect(screen.getByRole('heading', { name: /test trip/i })).toBeInTheDocument();
    expect(screen.getByText(/this is a test trip/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button'));
    expect(mockNavigate).toHaveBeenCalledWith('/trips/1');
  });
});
