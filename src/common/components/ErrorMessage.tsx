import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants';

interface ErrorMessageProps {
  message: string;
  visible?: boolean;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  visible = true,
}) => {
  if (!visible || !message) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.error + '20',
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
  },
  text: {
    color: Colors.error,
    fontSize: 14,
  },
});
