import React from 'react';
import { render, screen } from '@testing-library/react';
import { it, expect, describe } from 'vitest';
import ErrorField from '../../components/ErrorField.jsx';

describe('ErrorField Component', () => {
  it('displays the error message when error is provided', () => {
    const errorMessage = "This is an error.";

    render(<ErrorField error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('does not render anything when there is no error', () => {
    render(<ErrorField error="" />);

    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });
});
