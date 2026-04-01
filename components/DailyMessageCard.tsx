import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getDailyMessage } from '@/data/messages';

export default function DailyMessageCard() {
  const message = getDailyMessage();

  return (
    <View style={styles.card}>
      <Text style={styles.quoteMarks}>"</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1A1A2E',
    borderRadius: 18,
    padding: 20,
    paddingLeft: 22,
    position: 'relative',
  },
  quoteMarks: {
    position: 'absolute',
    top: 8,
    left: 14,
    fontSize: 48,
    color: '#7C6FF7',
    opacity: 0.4,
    fontFamily: 'Inter_700Bold',
    lineHeight: 52,
  },
  message: {
    fontSize: 14,
    color: '#E8E4FF',
    fontFamily: 'Inter_500Medium',
    lineHeight: 22,
    paddingTop: 16,
    paddingLeft: 8,
  },
});
