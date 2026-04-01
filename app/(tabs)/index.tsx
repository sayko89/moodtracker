import React from 'react';
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AchievementCard from '@/components/AchievementCard';
import AchievementModal from '@/components/AchievementModal';
import DailyMessageCard from '@/components/DailyMessageCard';
import InsightCard from '@/components/InsightCard';
import MoodButton from '@/components/MoodButton';
import MoodHeroCard from '@/components/MoodHeroCard';
import StatCard from '@/components/StatCard';
import SuggestionCard from '@/components/SuggestionCard';
import { useApp } from '@/context/AppContext';
import { getMoodById, MOODS } from '@/data/moods';
import { ACHIEVEMENT_DEFS, getLevelForPoints } from '@/utils/gamification';
import { getStreakMessage } from '@/utils/analytics';

export default function HomeScreen() {
  const {
    selectedMoodId,
    totalPoints,
    level,
    streak,
    achievements,
    history,
    moodCounts,
    isLoaded,
    checkedInToday,
    selectMood,
    resetProgress,
  } = useApp();

  const insets = useSafeAreaInsets();
  const levelInfo = getLevelForPoints(totalPoints);
  const selectedMood = getMoodById(selectedMoodId);

  const bgColor = selectedMood ? selectedMood.bgGradient : '#F7F5FF';
  const accentColor = selectedMood ? selectedMood.accentColor : '#7C6FF7';

  const handleSelectMood = async (moodId: string) => {
    await selectMood(moodId);
  };

  const handleReset = () => {
    Alert.alert(
      'Reset Progress',
      'This will permanently clear your streak, points, achievements, and mood history. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset Everything', style: 'destructive', onPress: resetProgress },
      ]
    );
  };

  if (!isLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const recentHistory = history.slice(0, 3);
  const streakMessage = getStreakMessage(streak);
  const levelProgress =
    levelInfo.maxPoints === Infinity
      ? 1
      : (totalPoints - levelInfo.minPoints) / (levelInfo.maxPoints - levelInfo.minPoints + 1);

  return (
    <View style={[styles.root, { backgroundColor: bgColor }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: Platform.OS === 'web' ? insets.top + 67 : 16,
            paddingBottom:
              Platform.OS === 'web'
                ? insets.bottom + 34 + 84
                : insets.bottom + 100,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.appTitle}>DevMood</Text>
            <Text style={styles.appSubtitle}>Track your daily developer mood</Text>
          </View>
          <View style={[styles.levelBadge, { backgroundColor: accentColor }]}>
            <Text style={styles.levelText}>Lv.{level}</Text>
          </View>
        </View>

        <View
          style={[
            styles.checkInBanner,
            checkedInToday ? styles.checkInDone : styles.checkInPending,
          ]}
        >
          <Text style={styles.checkInEmoji}>{checkedInToday ? '✅' : '📌'}</Text>
          <Text style={styles.checkInText}>
            {checkedInToday
              ? "You've checked in today — great job!"
              : "Complete today's mood check-in"}
          </Text>
        </View>

        <MoodHeroCard moodId={selectedMoodId} />

        {selectedMoodId && (
          <View style={styles.suggestionWrap}>
            <SuggestionCard moodId={selectedMoodId} />
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How are you feeling?</Text>
          <View style={styles.moodRow}>
            {MOODS.map((mood) => (
              <MoodButton
                key={mood.id}
                mood={mood}
                isSelected={selectedMoodId === mood.id}
                onPress={handleSelectMood}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Stats</Text>
          <View style={styles.statsRow}>
            <StatCard label="Points" value={totalPoints} icon="⚡" color={accentColor} />
            <StatCard
              label="Level"
              value={levelInfo.label.split(' ').pop() ?? ''}
              icon="🏅"
              color="#F9A03F"
            />
            <StatCard label="Streak" value={`${streak}d`} icon="🔥" color="#F47C7C" />
          </View>
          <Text style={styles.streakMessage}>{streakMessage}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.progressHeader}>
            <Text style={styles.sectionTitle}>Level Progress</Text>
            <Text style={[styles.levelName, { color: accentColor }]}>{levelInfo.label}</Text>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${Math.round(Math.min(levelProgress, 1) * 100)}%`,
                  backgroundColor: accentColor,
                },
              ]}
            />
          </View>
          {levelInfo.maxPoints !== Infinity && (
            <Text style={styles.progressHint}>
              {totalPoints} / {levelInfo.maxPoints + 1} pts to next level
            </Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Motivation</Text>
          <DailyMessageCard />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Analytics</Text>
          <InsightCard history={history} moodCounts={moodCounts} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          {ACHIEVEMENT_DEFS.map((def) => (
            <AchievementCard
              key={def.id}
              achievementId={def.id}
              unlocked={achievements.includes(def.id)}
            />
          ))}
        </View>

        {recentHistory.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            {recentHistory.map((entry) => {
              const mood = MOODS.find((m) => m.id === entry.moodId);
              if (!mood) return null;
              return (
                <View
                  key={entry.id}
                  style={[styles.recentItem, { borderLeftColor: mood.darkColor }]}
                >
                  <Text style={styles.recentEmoji}>{mood.emoji}</Text>
                  <View style={styles.recentInfo}>
                    <Text style={styles.recentLabel}>{mood.label}</Text>
                    <Text style={styles.recentDevLabel}>{mood.devLabel}</Text>
                  </View>
                  <Text style={[styles.recentPoints, { color: accentColor }]}>
                    +{entry.pointsGained ?? 10} pts
                  </Text>
                </View>
              );
            })}
          </View>
        )}

        <Pressable
          style={({ pressed }) => [styles.resetBtn, pressed && styles.resetBtnPressed]}
          onPress={handleReset}
        >
          <Text style={styles.resetText}>Reset Progress</Text>
        </Pressable>
      </ScrollView>

      <AchievementModal />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  appTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1A1A2E',
    fontFamily: 'Inter_700Bold',
  },
  appSubtitle: {
    fontSize: 12,
    color: '#888',
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  levelBadge: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  levelText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
    fontFamily: 'Inter_700Bold',
  },
  checkInBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 14,
    gap: 8,
  },
  checkInDone: {
    backgroundColor: '#E4F9F3',
  },
  checkInPending: {
    backgroundColor: '#FFF3E4',
  },
  checkInEmoji: {
    fontSize: 16,
  },
  checkInText: {
    fontSize: 13,
    color: '#2D2D2D',
    fontFamily: 'Inter_500Medium',
    fontWeight: '500',
    flex: 1,
  },
  suggestionWrap: {
    marginTop: 12,
  },
  section: {
    marginTop: 22,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A2E',
    fontFamily: 'Inter_700Bold',
    marginBottom: 10,
  },
  moodRow: {
    flexDirection: 'row',
  },
  statsRow: {
    flexDirection: 'row',
  },
  streakMessage: {
    fontSize: 12,
    color: '#888',
    fontFamily: 'Inter_400Regular',
    marginTop: 8,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  levelName: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    fontWeight: '600',
  },
  progressBar: {
    height: 9,
    backgroundColor: '#E8E4FF',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
  },
  progressHint: {
    fontSize: 11,
    color: '#AAA',
    fontFamily: 'Inter_400Regular',
    marginTop: 5,
    textAlign: 'right',
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 6,
    borderLeftWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  recentEmoji: {
    fontSize: 20,
    marginRight: 10,
  },
  recentInfo: {
    flex: 1,
  },
  recentLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2D2D2D',
    fontFamily: 'Inter_600SemiBold',
  },
  recentDevLabel: {
    fontSize: 10,
    color: '#AAA',
    fontFamily: 'Inter_400Regular',
    marginTop: 1,
  },
  recentPoints: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },
  resetBtn: {
    marginTop: 28,
    marginBottom: 8,
    alignItems: 'center',
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: '#F47C7C',
    borderRadius: 14,
  },
  resetBtnPressed: {
    opacity: 0.65,
  },
  resetText: {
    fontSize: 13,
    color: '#F47C7C',
    fontFamily: 'Inter_500Medium',
    fontWeight: '500',
  },
});
