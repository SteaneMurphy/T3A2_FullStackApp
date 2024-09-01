import React from 'react';
import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import SubmitButton from '../../components/SubmitButton.jsx';

describe('SubmitButton Component', () => {
  it('renders the SubmitButton with the correct text', () => {
    const buttonText = 'Submit';
    render(<SubmitButton buttonText={buttonText} />);

    expect(screen.getByRole('button', { name: buttonText })).toBeInTheDocument();
  });
});
