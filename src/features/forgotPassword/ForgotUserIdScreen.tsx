import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Input } from '../../common/components/Input';
import { Button } from '../../common/components/Button';
import { ErrorMessage } from '../../common/components/ErrorMessage';
import { useForgotPassword } from './hooks/useForgotPassword';
import { Validation } from '../../utils';
import { Colors, Strings } from '../../constants';
import { RootStackParamList } from '../../navigation/AppNavigator';

type ForgotUserIdScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ForgotUserId'>;

export const ForgotUserIdScreen: React.FC = () => {
  const navigation = useNavigation<ForgotUserIdScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { recoverUserId, loading, error, success } = useForgotPassword();

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!email.trim() && !phone.trim()) {
      newErrors.general = 'Please enter either email or phone number';
    }

    if (email.trim() && !Validation.isEmail(email)) {
      newErrors.email = 'Invalid email address';
    }

    if (phone.trim() && !Validation.isPhone(phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRecover = async () => {
    if (!validate()) {
      return;
    }

    const result = await recoverUserId({
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
    });

    if (result.success) {
      Alert.alert(
        Strings.SUCCESS,
        'Your User ID has been sent to your registered email/phone.',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{Strings.FORGOT_USER_ID_TITLE}</Text>

      <Text style={styles.description}>
        Enter your registered email or phone number and we'll send you your User ID.
      </Text>

      <ErrorMessage message={error || errors.general || ''} visible={!!(error || errors.general) && !success} />

      {success && (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>
            Your User ID has been sent!
          </Text>
        </View>
      )}

      <Input
        label={Strings.EMAIL}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter email"
        keyboardType="email-address"
        error={errors.email}
      />

      <Text style={styles.orText}>OR</Text>

      <Input
        label={Strings.PHONE}
        value={phone}
        onChangeText={setPhone}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        error={errors.phone}
      />

      <Button
        title={Strings.SUBMIT}
        onPress={handleRecover}
        loading={loading}
        disabled={success}
      />

      <Button
        title={Strings.BACK}
        onPress={() => navigation.goBack()}
        variant="secondary"
      />
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
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 20,
  },
  orText: {
    textAlign: 'center',
    color: Colors.gray,
    marginVertical: 10,
    fontWeight: '600',
  },
  successContainer: {
    backgroundColor: Colors.success + '20',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  successText: {
    color: Colors.success,
    fontSize: 14,
    textAlign: 'center',
  },
});
