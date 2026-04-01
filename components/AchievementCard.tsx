import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ACHIEVEMENT_DEFS } from '@/utils/gamification';

interface AchievementCardProps {
  achievementId: string;
  unlocked: boolean;
}

export default function AchievementCard({ achievementId, unlocked }: AchievementCardProps) {
  const def = ACHIEVEMENT_DEFS.find((a) => a.id === achievementId);
  if (!def) return null;

  return (
    <View style={[styles.card, !unlocked && styles.locked]}>
      <Text style={[styles.icon, !unlocked && styles.lockedIcon]}>{unlocked ? def.icon : '🔒'}</Text>
      <View style={styles.textContainer}>
        <Text style={[styles.label, !unlocked && styles.lockedText]}>{def.label}</Text>
        <Text style={[styles.description, !unlocked && styles.lockedDescription]}>{def.description}</Text>
      </View>
      {unlocked && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>✓</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#7C6FF7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderLeftWidth: 3,
    borderLeftColor: '#7C6FF7',
  },
  locked: {
    backgroundColor: '#F8F8F8',
    shadowOpacity: 0,
    borderLeftColor: '#DDD',
    elevation: 0,
  },
  icon: {
    fontSize: 26,
    marginRight: 12,
  },
  lockedIcon: {
    opacity: 0.4,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2D2D2D',
    fontFamily: 'Inter_600SemiBold',
  },
  lockedText: {
    color: '#AAA',
  },
  description: {
    fontSize: 11,
    color: '#888',
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  lockedDescription: {
    color: '#CCC',
  },
  badge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#7C6FF7',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
});
