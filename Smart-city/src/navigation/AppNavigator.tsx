import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RegistrationScreen } from '../features/registration/RegistrationScreen';
import { LoginScreen } from '../features/login/LoginScreen';
import { ForgotPasswordScreen } from '../features/forgotPassword/ForgotPasswordScreen';
import { ForgotUserIdScreen } from '../features/forgotPassword/ForgotUserIdScreen';
import { HomeScreen } from '../features/home/HomeScreen';

export type RootStackParamList = {
  Login: undefined;
  Registration: undefined;
  ForgotPassword: undefined;
  ForgotUserId: undefined;
  Home: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ title: 'Create Account' }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{ title: 'Reset Password' }}
        />
        <Stack.Screen
          name="ForgotUserId"
          component={ForgotUserIdScreen}
          options={{ title: 'Recover User ID' }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home', headerLeft: () => null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
