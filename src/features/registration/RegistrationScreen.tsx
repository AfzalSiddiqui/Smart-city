import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from '../../common/components/Button';
import { EmailRegistration } from './components/EmailRegistration';
import { PhoneRegistration } from './components/PhoneRegistration';
import { LinkedInRegistration } from './components/LinkedInRegistration';
import { Colors, Strings } from '../../constants';
import { RootStackParamList } from '../../navigation/AppNavigator';

type RegistrationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Registration'>;

type RegistrationType = 'email' | 'phone' | 'linkedin' | null;

export const RegistrationScreen: React.FC = () => {
  const navigation = useNavigation<RegistrationScreenNavigationProp>();
  const [registrationType, setRegistrationType] = useState<RegistrationType>(null);

  const handleSuccess = () => {
    navigation.navigate('Home');
  };

  if (registrationType === 'email') {
    return (
      <EmailRegistration
        onBack={() => setRegistrationType(null)}
        onSuccess={handleSuccess}
      />
    );
  }

  if (registrationType === 'phone') {
    return (
      <PhoneRegistration
        onBack={() => setRegistrationType(null)}
        onSuccess={handleSuccess}
      />
    );
  }

  if (registrationType === 'linkedin') {
    return (
      <LinkedInRegistration
        onBack={() => setRegistrationType(null)}
        onSuccess={handleSuccess}
      />
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{Strings.REGISTRATION_TITLE}</Text>

      <Button
        title={Strings.REGISTER_WITH_EMAIL}
        onPress={() => setRegistrationType('email')}
      />

      <Button
        title={Strings.REGISTER_WITH_PHONE}
        onPress={() => setRegistrationType('phone')}
        variant="secondary"
      />

      <Button
        title={Strings.REGISTER_WITH_LINKEDIN}
        onPress={() => setRegistrationType('linkedin')}
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
    marginBottom: 30,
    marginTop: 20,
    textAlign: 'center',
  },
});
