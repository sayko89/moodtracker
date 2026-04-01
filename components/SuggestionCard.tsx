import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getMoodById } from '@/data/moods';

interface SuggestionCardProps {
  moodId: string;
}

export default function SuggestionCard({ moodId }: SuggestionCardProps) {
  const mood = getMoodById(moodId);
  if (!mood) return null;

  const suggestion = mood.suggestions[0];

  return (
    <View style={[styles.card, { borderLeftColor: mood.darkColor }]}>
      <View style={[styles.iconBadge, { backgroundColor: mood.color }]}>
        <Text style={styles.iconText}>💡</Text>
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.label}>Smart Suggestion</Text>
        <Text style={styles.suggestion}>{suggestion}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  iconBadge: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 18,
  },
  textBlock: {
    flex: 1,
  },
  label: {
    fontSize: 10,
    color: '#AAA',
    fontFamily: 'Inter_500Medium',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 3,
  },
  suggestion: {
    fontSize: 13,
    color: '#2D2D2D',
    fontFamily: 'Inter_400Regular',
    lineHeight: 18,
  },
});
