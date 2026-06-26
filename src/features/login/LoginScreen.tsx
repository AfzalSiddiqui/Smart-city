import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Input } from '../../common/components/Input';
import { Button } from '../../common/components/Button';
import { ErrorMessage } from '../../common/components/ErrorMessage';
import { BiometricAuth } from './components/BiometricAuth';
import { useLogin } from './hooks/useLogin';
import { Storage } from '../../utils/storage';
import { Biometric } from '../../utils/biometric';
import { Colors, Strings } from '../../constants';
import { RootStackParamList } from '../../navigation/AppNavigator';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useLogin();

  const handleLogin = async () => {
    if (!userId.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both User ID and Password');
      return;
    }

    const result = await login({ userId, password });

    if (result.success) {
      // Ask user if they want to enable biometric login
      const biometricAvailable = await Biometric.isAvailable();
      if (biometricAvailable) {
        Alert.alert(
          'Enable Face ID?',
          'Would you like to enable Face ID for faster login?',
          [
            { text: 'Not Now', style: 'cancel' },
            {
              text: 'Enable',
              onPress: async () => {
                await Storage.setItem('biometric_user_id', userId);
                await Storage.setItem('biometric_password', password);
              },
            },
          ]
        );
      }

      // Navigate to Home screen on success
      navigation.navigate('Home');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{Strings.LOGIN_TITLE}</Text>

      <ErrorMessage message={error || ''} visible={!!error} />

      <Input
        label={Strings.USER_ID}
        value={userId}
        onChangeText={setUserId}
        placeholder="Enter user ID"
        autoCapitalize="none"
      />

      <Input
        label={Strings.PASSWORD}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        secureTextEntry
      />

      <Button title={Strings.LOGIN} onPress={handleLogin} loading={loading} />

      <Button
        title="Create Account"
        onPress={() => navigation.navigate('Registration')}
        variant="secondary"
      />

      <BiometricAuth onSuccess={() => navigation.navigate('Home')} />

      <TouchableOpacity
        style={styles.forgotLink}
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        <Text style={styles.forgotText}>{Strings.FORGOT_PASSWORD}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.forgotLink}
        onPress={() => navigation.navigate('ForgotUserId')}
      >
        <Text style={styles.forgotText}>{Strings.FORGOT_USER_ID}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 20,
    textAlign: 'center',
  },
  forgotLink: {
    marginTop: 15,
    alignItems: 'center',
  },
  forgotText: {
    color: Colors.primary,
    fontSize: 14,
  },
});
