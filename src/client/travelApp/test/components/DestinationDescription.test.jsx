import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DestinationDescription from '../../src/components/DestinationDescription';

describe('DestinationDescription Component', () => {
  it('renders the DestinationDescription component with an image or fallback text and description', () => {
    render(<DestinationDescription />);
    
    const imageOrFallback = screen.queryByRole('img') || screen.getByText(/no image data available/i);
    expect(imageOrFallback).toBeInTheDocument();
    
    expect(screen.getByText(/destination description/i)).toBeInTheDocument();
  });
});
