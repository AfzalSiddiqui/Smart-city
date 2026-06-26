import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Biometric } from '../../../utils/biometric';
import { Storage } from '../../../utils/storage';
import { useLogin } from '../hooks/useLogin';
import { Colors, Strings } from '../../../constants';

interface BiometricAuthProps {
  onSuccess?: () => void;
}

export const BiometricAuth: React.FC<BiometricAuthProps> = ({ onSuccess }) => {
  const [available, setAvailable] = useState(false);
  const [hasStoredCredentials, setHasStoredCredentials] = useState(false);
  const { login } = useLogin();

  useEffect(() => {
    checkBiometricAvailability();
    checkStoredCredentials();
  }, []);

  const checkBiometricAvailability = async () => {
    const isAvailable = await Biometric.isAvailable();
    setAvailable(isAvailable);
  };

  const checkStoredCredentials = async () => {
    const userId = await Storage.getItem('biometric_user_id');
    const password = await Storage.getItem('biometric_password');
    setHasStoredCredentials(!!(userId && password));
  };

  const handleBiometricLogin = async () => {
    if (!available) {
      Alert.alert('Error', 'Biometric authentication is not available on this device');
      return;
    }

    const success = await Biometric.authenticate();
    if (success) {
      // Retrieve stored credentials
      const userId = await Storage.getItem('biometric_user_id');
      const password = await Storage.getItem('biometric_password');

      if (userId && password) {
        const result = await login({ userId, password });
        if (result.success && onSuccess) {
          onSuccess();
        }
      } else {
        Alert.alert('Error', 'No stored credentials found. Please login with User ID and Password first.');
      }
    }
  };

  if (!available || !hasStoredCredentials) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleBiometricLogin}>
        <Text style={styles.buttonText}>{Strings.USE_FACE_ID}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  button: {
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});
