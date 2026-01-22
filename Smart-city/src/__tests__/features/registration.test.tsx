import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { RegistrationScreen } from '../../features/registration/RegistrationScreen';
import { EmailRegistration } from '../../features/registration/components/EmailRegistration';

jest.mock('../../api/handler', () => ({
  apiHandler: {
    post: jest.fn(),
  },
}));

describe('RegistrationScreen', () => {
  it('should render registration options', () => {
    const { getByText } = render(<RegistrationScreen />);
    expect(getByText('Create Account')).toBeTruthy();
    expect(getByText('Register with Email')).toBeTruthy();
    expect(getByText('Register with Phone')).toBeTruthy();
  });

  it('should navigate to email registration', () => {
    const { getByText } = render(<RegistrationScreen />);
    fireEvent.press(getByText('Register with Email'));
    expect(getByText('Register with Email')).toBeTruthy();
  });
});

describe('EmailRegistration', () => {
  it('should validate email format', async () => {
    const mockOnBack = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <EmailRegistration onBack={mockOnBack} />
    );

    const emailInput = getByPlaceholderText('Enter email');
    const submitButton = getByText('Submit');

    fireEvent.changeText(emailInput, 'invalid-email');
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(getByText('Invalid email address')).toBeTruthy();
    });
  });

  it('should validate password length', async () => {
    const mockOnBack = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <EmailRegistration onBack={mockOnBack} />
    );

    const passwordInput = getByPlaceholderText('Enter password');
    const submitButton = getByText('Submit');

    fireEvent.changeText(passwordInput, 'short');
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(getByText(/Password must be at least 8 characters/)).toBeTruthy();
    });
  });
});
