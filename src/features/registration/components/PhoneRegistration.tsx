import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Input } from '../../../common/components/Input';
import { Button } from '../../../common/components/Button';
import { ErrorMessage } from '../../../common/components/ErrorMessage';
import { useRegistration } from '../hooks/useRegistration';
import { Validation } from '../../../utils';
import { Colors, Strings } from '../../../constants';

interface PhoneRegistrationProps {
  onBack: () => void;
  onSuccess?: () => void;
}

export const PhoneRegistration: React.FC<PhoneRegistrationProps> = ({
  onBack,
  onSuccess,
}) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { register, loading, error } = useRegistration();

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!Validation.isPhone(phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    if (!Validation.isPasswordValid(password)) {
      newErrors.password = `Password must be at least 8 characters`;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (validate()) {
      const result = await register({
        phone,
        password,
        firstName,
        lastName,
      });

      if (result.success && onSuccess) {
        onSuccess();
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{Strings.REGISTER_WITH_PHONE}</Text>

      <ErrorMessage message={error || ''} visible={!!error} />

      <Input
        label={Strings.FIRST_NAME}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="Enter first name"
        error={errors.firstName}
      />

      <Input
        label={Strings.LAST_NAME}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Enter last name"
        error={errors.lastName}
      />

      <Input
        label={Strings.PHONE}
        value={phone}
        onChangeText={setPhone}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        error={errors.phone}
      />

      <Input
        label={Strings.PASSWORD}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        secureTextEntry
        error={errors.password}
      />

      <Input
        label={Strings.CONFIRM_PASSWORD}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm password"
        secureTextEntry
        error={errors.confirmPassword}
      />

      <Button title={Strings.SUBMIT} onPress={handleRegister} loading={loading} />

      <Button title={Strings.BACK} onPress={onBack} variant="secondary" />
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});
