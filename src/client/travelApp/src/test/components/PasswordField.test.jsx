import React from 'react';
import { it, expect, describe } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import PasswordField from '../../components/PasswordField.jsx';

describe('PasswordField Component', () => {
  it('renders PasswordField and updates value', () => {
    const setPassword = vi.fn();
    const { getByPlaceholderText } = render(<PasswordField password="" setPassword={setPassword} />);
    fireEvent.change(getByPlaceholderText(/enter your password/i), { target: { value: 'mypassword' } });
    expect(setPassword).toHaveBeenCalledWith('mypassword');
  });
});
