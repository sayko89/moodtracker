export const POINTS_PER_MOOD = 10;
export const DAILY_BONUS_POINTS = 20;

export interface Level {
  level: number;
  minPoints: number;
  maxPoints: number;
  label: string;
}

export const LEVELS: Level[] = [
  { level: 1, minPoints: 0, maxPoints: 49, label: 'Beginner Dev' },
  { level: 2, minPoints: 50, maxPoints: 99, label: 'Junior Dev' },
  { level: 3, minPoints: 100, maxPoints: 199, label: 'Mid-Level Dev' },
  { level: 4, minPoints: 200, maxPoints: Infinity, label: 'Senior Dev' },
];

export interface AchievementDef {
  id: string;
  label: string;
  description: string;
  icon: string;
}

export const ACHIEVEMENT_DEFS: AchievementDef[] = [
  {
    id: 'first_step',
    label: 'First Step',
    description: 'Made your first mood selection',
    icon: '🚀',
  },
  {
    id: 'consistent_developer',
    label: 'Consistent Developer',
    description: 'Maintained a 3-day streak',
    icon: '🔗',
  },
  {
    id: 'focus_master',
    label: 'Focus Master',
    description: 'Chose Focused mood 5 times',
    icon: '🎯',
  },
  {
    id: 'mood_explorer',
    label: 'Mood Explorer',
    description: 'Used at least 4 different moods',
    icon: '🗺️',
  },
  {
    id: 'hundred_club',
    label: '100 Club',
    description: 'Reached 100 points',
    icon: '💯',
  },
];

export const getLevelForPoints = (points: number): Level => {
  for (const lvl of LEVELS) {
    if (points >= lvl.minPoints && points <= lvl.maxPoints) return lvl;
  }
  return LEVELS[LEVELS.length - 1];
};

export const getLevelProgress = (points: number): number => {
  const current = getLevelForPoints(points);
  if (current.maxPoints === Infinity) return 1;
  const range = current.maxPoints - current.minPoints + 1;
  const earned = points - current.minPoints;
  return Math.min(earned / range, 1);
};

interface CheckState {
  achievements: string[];
  moodCounts: Record<string, number>;
  streak: number;
  totalPoints: number;
  history: { id: string; moodId: string; timestamp: string; pointsGained: number }[];
}

export const checkNewAchievements = (state: CheckState, _moodId: string): string[] => {
  const { achievements, moodCounts, streak, totalPoints, history } = state;
  const newlyUnlocked: string[] = [];

  const unlock = (id: string) => {
    if (!achievements.includes(id)) {
      newlyUnlocked.push(id);
    }
  };

  if (history.length >= 1) unlock('first_step');
  if (streak >= 3) unlock('consistent_developer');
  if ((moodCounts['focused'] || 0) >= 5) unlock('focus_master');

  const uniqueMoods = Object.keys(moodCounts).filter((k) => moodCounts[k] > 0);
  if (uniqueMoods.length >= 4) unlock('mood_explorer');
  if (totalPoints >= 100) unlock('hundred_club');

  return newlyUnlocked;
};
