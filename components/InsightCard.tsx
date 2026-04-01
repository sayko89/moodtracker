import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { computeAnalytics } from '@/utils/analytics';

interface HistoryEntry {
  id: string;
  moodId: string;
  timestamp: string;
  pointsGained: number;
}

interface InsightCardProps {
  history: HistoryEntry[];
  moodCounts: Record<string, number>;
}

interface InsightTileProps {
  icon: string;
  value: string | number;
  label: string;
  color: string;
}

function InsightTile({ icon, value, label, color }: InsightTileProps) {
  return (
    <View style={styles.tile}>
      <Text style={styles.tileIcon}>{icon}</Text>
      <Text style={[styles.tileValue, { color }]}>{value}</Text>
      <Text style={styles.tileLabel}>{label}</Text>
    </View>
  );
}

export default function InsightCard({ history, moodCounts }: InsightCardProps) {
  const analytics = computeAnalytics(history, moodCounts);

  if (analytics.totalCheckIns === 0) {
    return (
      <View style={styles.emptyCard}>
        <Text style={styles.emptyIcon}>📊</Text>
        <Text style={styles.emptyTitle}>No insights yet</Text>
        <Text style={styles.emptySubtitle}>Select your mood to start building analytics.</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Your Insights</Text>
      <View style={styles.grid}>
        <InsightTile icon="📈" value={analytics.totalCheckIns} label="Total Check-ins" color="#7C6FF7" />
        <InsightTile icon="🧩" value={analytics.uniqueMoodsUsed} label="Moods Used" color="#5DCFAA" />
        <InsightTile icon="🔥" value={analytics.focusedCount} label="Focus Sessions" color="#F9A03F" />
        <InsightTile icon="🎯" value={`${analytics.focusPercentage}%`} label="Focus Rate" color="#F47C7C" />
      </View>
      {analytics.mostFrequentMood && (
        <View style={styles.highlight}>
          <Text style={styles.highlightText}>
            {analytics.mostFrequentMood.emoji}{' '}
            <Text style={styles.highlightBold}>{analytics.mostFrequentMood.label}</Text>{' '}
            is your most frequent mood ({analytics.mostFrequentCount}×)
          </Text>
        </View>
      )}
      {analytics.weekMood && analytics.weekEntryCount > 1 && (
        <View style={[styles.highlight, { backgroundColor: '#F0EDFF' }]}>
          <Text style={styles.highlightText}>
            This week you mostly felt{' '}
            <Text style={styles.highlightBold}>{analytics.weekMood.label}</Text>{' '}
            {analytics.weekMood.emoji}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    shadowColor: '#7C6FF7',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A2E',
    fontFamily: 'Inter_700Bold',
    marginBottom: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 12,
  },
  tile: {
    width: '46%',
    backgroundColor: '#F8F7FF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  tileIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  tileValue: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },
  tileLabel: {
    fontSize: 10,
    color: '#AAA',
    fontFamily: 'Inter_500Medium',
    marginTop: 2,
    textAlign: 'center',
  },
  highlight: {
    backgroundColor: '#FFF8ED',
    borderRadius: 10,
    padding: 10,
    marginTop: 4,
  },
  highlightText: {
    fontSize: 12,
    color: '#555',
    fontFamily: 'Inter_400Regular',
  },
  highlightBold: {
    fontFamily: 'Inter_600SemiBold',
    fontWeight: '600',
    color: '#1A1A2E',
  },
  emptyCard: {
    backgroundColor: '#F8F7FF',
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#AAA',
    fontFamily: 'Inter_700Bold',
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 12,
    color: '#CCC',
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },
});
