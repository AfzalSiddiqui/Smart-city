import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Alert, Linking } from 'react-native';
import { Button } from '../../../common/components/Button';
import { ErrorMessage } from '../../../common/components/ErrorMessage';
import { apiHandler } from '../../../api/handler';
import { API_ENDPOINTS } from '../../../api/endpoints';
import { Storage } from '../../../utils/storage';
import { Colors, Strings } from '../../../constants';

interface LinkedInRegistrationProps {
  onBack: () => void;
  onSuccess?: () => void;
}

export const LinkedInRegistration: React.FC<LinkedInRegistrationProps> = ({
  onBack,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLinkedInLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      // LinkedIn OAuth implementation
      // Note: You'll need to configure LinkedIn OAuth credentials and implement OAuth flow
      // This is a placeholder - implement proper LinkedIn OAuth flow
      // For production, use a proper OAuth library or implement OAuth flow with WebView
      
      const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=YOUR_LINKEDIN_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&state=YOUR_STATE&scope=r_liteprofile%20r_emailaddress`;
      
      // Open LinkedIn OAuth in browser or WebView
      const canOpen = await Linking.canOpenURL(linkedInAuthUrl);
      if (canOpen) {
        await Linking.openURL(linkedInAuthUrl);
        // Handle OAuth callback - this would typically be handled via deep linking
        // For now, showing a message
        Alert.alert(
          'LinkedIn OAuth',
          'Please complete authentication in the browser. After authentication, you will be redirected back to the app.',
          [{ text: 'OK' }]
        );
      } else {
        setError('Unable to open LinkedIn authentication');
      }

      // Note: In a real implementation, you would:
      // 1. Open OAuth URL in WebView or browser
      // 2. Handle the callback with authorization code
      // 3. Exchange code for access token on backend
      // 4. Send token to your backend API
      
    } catch (err: any) {
      setError(err.message || 'LinkedIn authentication failed');
      Alert.alert('Error', err.message || 'LinkedIn authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{Strings.REGISTER_WITH_LINKEDIN}</Text>

      <ErrorMessage message={error || ''} visible={!!error} />

      <Text style={styles.description}>
        Register using your LinkedIn account. This will allow you to quickly
        create an account using your LinkedIn profile information.
      </Text>

      <Button
        title={Strings.REGISTER_WITH_LINKEDIN}
        onPress={handleLinkedInLogin}
        loading={loading}
      />

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
  description: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 20,
  },
});
