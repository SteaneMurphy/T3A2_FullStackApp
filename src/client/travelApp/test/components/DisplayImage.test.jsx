import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DisplayImage from '../../src/components/DisplayImage';

describe('DisplayImage Component', () => {
  it('renders an image when data is provided', () => {
    const mockData = { data: [255, 216, 255] };
    render(<DisplayImage data={mockData} />);
    
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('renders a fallback message when no data is provided', () => {
    render(<DisplayImage data={null} />);
    
    expect(screen.getByText(/no image data available/i)).toBeInTheDocument();
  });
});
