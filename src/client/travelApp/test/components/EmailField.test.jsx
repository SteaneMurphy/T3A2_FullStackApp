import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { it, expect, describe } from 'vitest';
import EmailField from '../../src/components/EmailField.jsx';

describe('EmailField Component', () => {
  it('renders the email input field and allows typing', () => {
    const mockSetEmail = vi.fn();
    const mockEmail = "test@example.com";

    render(<EmailField email={mockEmail} setEmail={mockSetEmail} />);

    const emailInput = screen.getByPlaceholderText('Enter your email...');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput.value).toBe(mockEmail);

    fireEvent.change(emailInput, { target: { value: 'new@example.com' } });

    expect(mockSetEmail).toHaveBeenCalledWith('new@example.com');
  });
});
