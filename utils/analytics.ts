import { getMoodById, Mood } from '@/data/moods';

interface HistoryEntry {
  id: string;
  moodId: string;
  timestamp: string;
  pointsGained: number;
}

interface Analytics {
  totalCheckIns: number;
  mostFrequentMood: Mood | null;
  mostFrequentCount: number;
  uniqueMoodsUsed: number;
  focusedCount: number;
  focusPercentage: number;
  weekMood: Mood | null;
  weekEntryCount: number;
}

export const computeAnalytics = (history: HistoryEntry[], moodCounts: Record<string, number>): Analytics => {
  const totalCheckIns = history.length;

  let mostFrequentMoodId: string | null = null;
  let maxCount = 0;
  for (const [id, count] of Object.entries(moodCounts)) {
    if (count > maxCount) {
      maxCount = count;
      mostFrequentMoodId = id;
    }
  }
  const mostFrequentMood = mostFrequentMoodId ? getMoodById(mostFrequentMoodId) : null;

  const uniqueMoodsUsed = Object.values(moodCounts).filter((c) => c > 0).length;
  const focusedCount = moodCounts['focused'] || 0;
  const focusPercentage =
    totalCheckIns > 0 ? Math.round((focusedCount / totalCheckIns) * 100) : 0;

  const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const weekEntries = history.filter((e) => new Date(e.timestamp).getTime() > oneWeekAgo);
  const weekCounts: Record<string, number> = {};
  for (const e of weekEntries) {
    weekCounts[e.moodId] = (weekCounts[e.moodId] || 0) + 1;
  }
  let weekMoodId: string | null = null;
  let weekMax = 0;
  for (const [id, count] of Object.entries(weekCounts)) {
    if (count > weekMax) {
      weekMax = count;
      weekMoodId = id;
    }
  }
  const weekMood = weekMoodId ? getMoodById(weekMoodId) : null;

  return {
    totalCheckIns,
    mostFrequentMood,
    mostFrequentCount: maxCount,
    uniqueMoodsUsed,
    focusedCount,
    focusPercentage,
    weekMood,
    weekEntryCount: weekEntries.length,
  };
};

export const getStreakMessage = (streak: number): string => {
  if (streak === 0) return 'Start your streak today.';
  if (streak === 1) return 'Nice start.';
  if (streak < 3) return 'Keep it going.';
  if (streak === 3) return 'You are building consistency.';
  if (streak < 7) return 'Solid habit forming.';
  if (streak === 7) return 'Strong habit forming.';
  if (streak < 14) return 'You are on a roll!';
  if (streak === 14) return 'You are unstoppable.';
  if (streak < 30) return 'Incredible consistency!';
  return 'This is real momentum.';
};
