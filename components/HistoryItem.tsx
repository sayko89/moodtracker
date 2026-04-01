import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getMoodById } from '@/data/moods';
import { formatTimestamp } from '@/utils/dateHelpers';

interface HistoryEntry {
  id: string;
  moodId: string;
  timestamp: string;
  pointsGained: number;
}

interface HistoryItemProps {
  entry: HistoryEntry;
}

export default function HistoryItem({ entry }: HistoryItemProps) {
  const mood = getMoodById(entry.moodId);
  if (!mood) return null;

  return (
    <View style={[styles.container, { borderLeftColor: mood.darkColor }]}>
      <View style={[styles.emojiContainer, { backgroundColor: mood.color }]}>
        <Text style={styles.emoji}>{mood.emoji}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.moodLabel}>{mood.label}</Text>
        <Text style={styles.time}>{formatTimestamp(entry.timestamp)}</Text>
      </View>
      <View style={styles.pointsTag}>
        <Text style={styles.pointsText}>+{entry.pointsGained || 10}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  emojiContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  emoji: {
    fontSize: 22,
  },
  info: {
    flex: 1,
  },
  moodLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A2E',
    fontFamily: 'Inter_600SemiBold',
  },
  time: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  pointsTag: {
    backgroundColor: '#EDE9FF',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  pointsText: {
    fontSize: 12,
    color: '#7C6FF7',
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },
});
