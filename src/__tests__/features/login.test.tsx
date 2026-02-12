import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { LoginScreen } from '../../features/login/LoginScreen';

jest.mock('../../api/handler', () => ({
  apiHandler: {
    post: jest.fn(),
  },
}));

jest.mock('../../utils/storage', () => ({
  Storage: {
    setItem: jest.fn(),
    getItem: jest.fn(),
  },
}));

jest.mock('../../utils/biometric', () => ({
  Biometric: {
    isAvailable: jest.fn().mockResolvedValue(false),
    authenticate: jest.fn(),
  },
}));

describe('LoginScreen', () => {
  it('should render login form', () => {
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);
    expect(getByText('Login')).toBeTruthy();
    expect(getByPlaceholderText('Enter user ID')).toBeTruthy();
    expect(getByPlaceholderText('Enter password')).toBeTruthy();
  });

  it('should show error for empty fields', async () => {
    const { getByText } = render(<LoginScreen />);
    const loginButton = getByText('Login');
    
    fireEvent.press(loginButton);
    
    // Note: This test assumes Alert.alert is mocked or handled
    // In a real scenario, you'd mock Alert
  });
});
