import React from 'react';
import { it, expect, describe } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import {
  FirstNameField,
  LastNameField,
  TripNameField,
  CountrySelectField
} from '../../components/NameField.jsx';

describe('NameField Components', () => {
  
  it('renders FirstNameField and updates value', () => {
    const setFirstName = vi.fn();
    const { getByPlaceholderText } = render(<FirstNameField name="" setFirstName={setFirstName} />);
    fireEvent.change(getByPlaceholderText(/first name/i), { target: { value: 'Bob' } });
    expect(setFirstName).toHaveBeenCalledWith('Bob');
  });

  it('renders LastNameField and updates value', () => {
    const setLastName = vi.fn();
    const { getByPlaceholderText } = render(<LastNameField name="" setLastName={setLastName} />);
    fireEvent.change(getByPlaceholderText(/last name/i), { target: { value: 'Smith' } });
    expect(setLastName).toHaveBeenCalledWith('Smith');
  });

  it('renders TripNameField and updates value', () => {
    const setTripName = vi.fn();
    const { getByPlaceholderText } = render(<TripNameField name="" setTripName={setTripName} />);
    fireEvent.change(getByPlaceholderText(/itinerary name/i), { target: { value: 'Vacation' } });
    expect(setTripName).toHaveBeenCalledWith('Vacation');
  });

  it('renders CountrySelectField and updates value', () => {
    const setInput = vi.fn();
    const { getByPlaceholderText } = render(<CountrySelectField input="" setInput={setInput} />);
    fireEvent.change(getByPlaceholderText(/select country/i), { target: { value: 'Australia' } });
    expect(setInput).toHaveBeenCalledWith('Australia');
  });

});
