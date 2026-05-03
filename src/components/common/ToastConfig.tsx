import React from 'react';
import { StyleSheet } from 'react-native';
import {
  BaseToast,
  ErrorToast,
  ToastConfig,
} from 'react-native-toast-message';

export const toastConfig: ToastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={styles.successContainer}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.title}
      text2Style={styles.description}
      text2NumberOfLines={3}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      style={styles.errorContainer}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.title}
      text2Style={styles.description}
      text2NumberOfLines={3}
    />
  ),
};

const styles = StyleSheet.create({
  successContainer: {
    borderLeftColor: '#6366F1',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    minHeight: 68,
    shadowColor: '#0F172A',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
  errorContainer: {
    borderLeftColor: '#EF4444',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    minHeight: 68,
    shadowColor: '#0F172A',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
  contentContainer: {
    paddingHorizontal: 14,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  description: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7280',
  },
});
