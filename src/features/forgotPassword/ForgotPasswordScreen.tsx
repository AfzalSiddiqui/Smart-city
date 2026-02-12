import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Input } from '../../common/components/Input';
import { Button } from '../../common/components/Button';
import { ErrorMessage } from '../../common/components/ErrorMessage';
import { useForgotPassword } from './hooks/useForgotPassword';
import { Colors, Strings } from '../../constants';
import { RootStackParamList } from '../../navigation/AppNavigator';

type ForgotPasswordScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ForgotPassword'>;

export const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();
  const [userId, setUserId] = useState('');
  const { resetPassword, loading, error, success } = useForgotPassword();

  const handleReset = async () => {
    if (!userId.trim()) {
      Alert.alert('Error', 'Please enter your User ID');
      return;
    }

    const result = await resetPassword({ userId });

    if (result.success) {
      Alert.alert(
        Strings.SUCCESS,
        'Password reset instructions have been sent to your registered email/phone.',
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
      <Text style={styles.title}>{Strings.RESET_PASSWORD_TITLE}</Text>

      <Text style={styles.description}>
        Enter your User ID and we'll send you instructions to reset your password.
      </Text>

      <ErrorMessage message={error || ''} visible={!!error && !success} />

      {success && (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>
            Password reset instructions have been sent!
          </Text>
        </View>
      )}

      <Input
        label={Strings.USER_ID}
        value={userId}
        onChangeText={setUserId}
        placeholder="Enter user ID"
        autoCapitalize="none"
      />

      <Button
        title={Strings.RESET_PASSWORD}
        onPress={handleReset}
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
