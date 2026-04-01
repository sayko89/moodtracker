import React from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HistoryItem from '@/components/HistoryItem';
import { useApp } from '@/context/AppContext';
import { MOODS } from '@/data/moods';
import { computeAnalytics } from '@/utils/analytics';

interface HistoryEntry {
  id: string;
  moodId: string;
  timestamp: string;
  pointsGained: number;
}

export default function HistoryScreen() {
  const { history, moodCounts, isLoaded } = useApp();
  const insets = useSafeAreaInsets();
  const analytics = computeAnalytics(history, moodCounts);

  if (!isLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const ListHeader = () => (
    <View>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Mood Summary</Text>
        <View style={styles.summaryGrid}>
          {MOODS.map((mood) => {
            const count = moodCounts[mood.id] || 0;
            return (
              <View
                key={mood.id}
                style={[styles.summaryItem, { backgroundColor: mood.color }]}
              >
                <Text style={styles.summaryEmoji}>{mood.emoji}</Text>
                <Text style={styles.summaryCount}>{count}</Text>
                <Text style={styles.summaryLabel}>{mood.label}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {analytics.totalCheckIns > 0 && (
        <View style={styles.statsBar}>
          <View style={styles.statPill}>
            <Text style={styles.statPillValue}>{analytics.totalCheckIns}</Text>
            <Text style={styles.statPillLabel}>total check-ins</Text>
          </View>
          <View style={styles.statPill}>
            <Text style={styles.statPillValue}>{analytics.uniqueMoodsUsed}</Text>
            <Text style={styles.statPillLabel}>moods used</Text>
          </View>
          {analytics.mostFrequentMood && (
            <View style={styles.statPill}>
              <Text style={styles.statPillValue}>{analytics.mostFrequentMood.emoji}</Text>
              <Text style={styles.statPillLabel}>top mood</Text>
            </View>
          )}
        </View>
      )}

      <View style={styles.listHeading}>
        <Text style={styles.listHeadingTitle}>All Entries</Text>
        <Text style={styles.listHeadingCount}>{history.length} total</Text>
      </View>
    </View>
  );

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📋</Text>
      <Text style={styles.emptyTitle}>No history yet</Text>
      <Text style={styles.emptySubtitle}>
        Select a mood on the Home tab to start tracking your days.
      </Text>
    </View>
  );

  return (
    <View style={styles.root}>
      <FlatList<HistoryEntry>
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HistoryItem entry={item} />}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={EmptyState}
        contentContainerStyle={[
          styles.listContent,
          {
            paddingTop: Platform.OS === 'web' ? insets.top + 67 : 16,
            paddingBottom:
              Platform.OS === 'web'
                ? insets.bottom + 34 + 84
                : insets.bottom + 100,
          },
        ]}
        showsVerticalScrollIndicator={false}
        scrollEnabled={history.length > 0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F7F5FF',
  },
  listContent: {
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F5FF',
  },
  loadingText: {
    fontSize: 16,
    color: '#888',
    fontFamily: 'Inter_400Regular',
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#7C6FF7',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A2E',
    fontFamily: 'Inter_700Bold',
    marginBottom: 12,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  summaryItem: {
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    minWidth: 56,
  },
  summaryEmoji: {
    fontSize: 20,
    marginBottom: 3,
  },
  summaryCount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A2E',
    fontFamily: 'Inter_700Bold',
  },
  summaryLabel: {
    fontSize: 9,
    color: '#555',
    fontFamily: 'Inter_500Medium',
    marginTop: 2,
  },
  statsBar: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  statPill: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  statPillValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#7C6FF7',
    fontFamily: 'Inter_700Bold',
  },
  statPillLabel: {
    fontSize: 9,
    color: '#AAA',
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
    textAlign: 'center',
  },
  listHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  listHeadingTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A2E',
    fontFamily: 'Inter_700Bold',
  },
  listHeadingCount: {
    fontSize: 12,
    color: '#AAA',
    fontFamily: 'Inter_400Regular',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 24,
  },
  emptyIcon: {
    fontSize: 44,
    marginBottom: 14,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A2E',
    fontFamily: 'Inter_700Bold',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999',
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    lineHeight: 20,
  },
});
