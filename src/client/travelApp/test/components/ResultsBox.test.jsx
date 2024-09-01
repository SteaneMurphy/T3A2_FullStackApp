import React from 'react';
import { it, expect, describe } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import ResultsBox from '../../src/components/ResultsBox.jsx';

describe('ResultsBox Component', () => {
  it('calls custom function on click', () => {
    const customFunc = vi.fn();
    const { getByText } = render(<ResultsBox array={['Country 1']} customFunc={customFunc} />);
    fireEvent.click(getByText(/country 1/i));
    expect(customFunc).toHaveBeenCalledWith('Country 1');
  });

  it('shows a message when no destinations are available', () => {
    const { getByText } = render(<ResultsBox array={[]} customFunc={() => {}} />);
    expect(getByText(/no destinations available/i)).toBeInTheDocument();
  });
});
