import ReactNativeBiometrics from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics();

export const Biometric = {
  async isAvailable(): Promise<boolean> {
    try {
      const { available } = await rnBiometrics.isSensorAvailable();
      return available;
    } catch (error) {
      return false;
    }
  },

  async authenticate(): Promise<boolean> {
    try {
      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: 'Confirm fingerprint',
      });
      return success;
    } catch (error) {
      return false;
    }
  },

  async saveCredentials(userId: string, password: string): Promise<void> {
    // Store encrypted credentials for biometric login
    // Implementation depends on your security requirements
    // This is a placeholder - implement proper encryption
  },
};
