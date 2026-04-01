import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

import {
  DAILY_BONUS_POINTS,
  POINTS_PER_MOOD,
  checkNewAchievements,
  getLevelForPoints,
} from '@/utils/gamification';
import { clearAll, loadData, saveData } from '@/utils/storage';
import { getTodayString, getYesterdayString } from '@/utils/dateHelpers';

interface MoodCounts {
  tired: number;
  relaxed: number;
  focused: number;
  stressed: number;
  happy: number;
  [key: string]: number;
}

interface HistoryEntry {
  id: string;
  moodId: string;
  timestamp: string;
  pointsGained: number;
}

interface AppContextValue {
  selectedMoodId: string | null;
  totalPoints: number;
  level: number;
  streak: number;
  achievements: string[];
  history: HistoryEntry[];
  moodCounts: MoodCounts;
  isLoaded: boolean;
  checkedInToday: boolean;
  newlyUnlockedAchievements: string[];
  selectMood: (moodId: string) => Promise<{ pointsGained: number; getsBonus: boolean; newlyUnlocked: string[] }>;
  dismissAchievements: () => void;
  resetProgress: () => Promise<void>;
}

const AppContext = createContext<AppContextValue | null>(null);

const DEFAULT_MOOD_COUNTS: MoodCounts = {
  tired: 0,
  relaxed: 0,
  focused: 0,
  stressed: 0,
  happy: 0,
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [selectedMoodId, setSelectedMoodId] = useState<string | null>(null);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [streak, setStreak] = useState<number>(0);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [moodCounts, setMoodCounts] = useState<MoodCounts>({ ...DEFAULT_MOOD_COUNTS });
  const [lastUsageDate, setLastUsageDate] = useState<string | null>(null);
  const [dailyBonusDate, setDailyBonusDate] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [newlyUnlockedAchievements, setNewlyUnlockedAchievements] = useState<string[]>([]);

  const stateRef = useRef({
    selectedMoodId,
    totalPoints,
    level,
    streak,
    achievements,
    history,
    moodCounts,
    lastUsageDate,
    dailyBonusDate,
  });

  useEffect(() => {
    stateRef.current = {
      selectedMoodId,
      totalPoints,
      level,
      streak,
      achievements,
      history,
      moodCounts,
      lastUsageDate,
      dailyBonusDate,
    };
  });

  useEffect(() => {
    const load = async () => {
      const [smi, tp, st, ach, hist, mc, lud, dbd] = await Promise.all([
        loadData('SELECTED_MOOD', null),
        loadData('TOTAL_POINTS', 0),
        loadData('STREAK', 0),
        loadData('ACHIEVEMENTS', []),
        loadData('HISTORY', []),
        loadData('MOOD_COUNTS', { ...DEFAULT_MOOD_COUNTS }),
        loadData('LAST_USAGE_DATE', null),
        loadData('DAILY_BONUS_DATE', null),
      ]);
      const lvlObj = getLevelForPoints(tp as number);
      setSelectedMoodId(smi as string | null);
      setTotalPoints(tp as number);
      setLevel(lvlObj.level);
      setStreak(st as number);
      setAchievements(ach as string[]);
      setHistory(hist as HistoryEntry[]);
      setMoodCounts(mc as MoodCounts);
      setLastUsageDate(lud as string | null);
      setDailyBonusDate(dbd as string | null);
      setIsLoaded(true);
    };
    load();
  }, []);

  const checkedInToday = lastUsageDate === getTodayString();

  const selectMood = useCallback(async (moodId: string) => {
    const today = getTodayString();
    const yesterday = getYesterdayString();
    const cur = stateRef.current;

    let newStreak = cur.streak;
    if (cur.lastUsageDate !== today) {
      if (cur.lastUsageDate === yesterday) {
        newStreak = cur.streak + 1;
      } else if (cur.lastUsageDate === null) {
        newStreak = 1;
      } else {
        newStreak = 1;
      }
    }

    let pointsGained = POINTS_PER_MOOD;
    let getsBonus = false;
    if (cur.dailyBonusDate !== today) {
      pointsGained += DAILY_BONUS_POINTS;
      getsBonus = true;
    }

    const newTotal = cur.totalPoints + pointsGained;
    const newLevel = getLevelForPoints(newTotal).level;

    const newCounts: MoodCounts = {
      ...cur.moodCounts,
      [moodId]: (cur.moodCounts[moodId] || 0) + 1,
    };

    const entry: HistoryEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      moodId,
      timestamp: new Date().toISOString(),
      pointsGained,
    };
    const newHistory = [entry, ...cur.history].slice(0, 100);

    const updatedState = {
      achievements: cur.achievements,
      moodCounts: newCounts,
      streak: newStreak,
      totalPoints: newTotal,
      history: newHistory,
    };
    const newlyUnlocked = checkNewAchievements(updatedState, moodId);
    const newAchievements = [...new Set([...cur.achievements, ...newlyUnlocked])];

    setSelectedMoodId(moodId);
    setTotalPoints(newTotal);
    setLevel(newLevel);
    setStreak(newStreak);
    setAchievements(newAchievements);
    setHistory(newHistory);
    setMoodCounts(newCounts);
    setLastUsageDate(today);
    if (getsBonus) setDailyBonusDate(today);
    if (newlyUnlocked.length > 0) setNewlyUnlockedAchievements(newlyUnlocked);

    await Promise.all([
      saveData('SELECTED_MOOD', moodId),
      saveData('TOTAL_POINTS', newTotal),
      saveData('LEVEL', newLevel),
      saveData('STREAK', newStreak),
      saveData('ACHIEVEMENTS', newAchievements),
      saveData('HISTORY', newHistory),
      saveData('MOOD_COUNTS', newCounts),
      saveData('LAST_USAGE_DATE', today),
      ...(getsBonus ? [saveData('DAILY_BONUS_DATE', today)] : []),
    ]);

    return { pointsGained, getsBonus, newlyUnlocked };
  }, []);

  const dismissAchievements = useCallback(() => {
    setNewlyUnlockedAchievements([]);
  }, []);

  const resetProgress = useCallback(async () => {
    await clearAll();
    setSelectedMoodId(null);
    setTotalPoints(0);
    setLevel(1);
    setStreak(0);
    setAchievements([]);
    setHistory([]);
    setMoodCounts({ ...DEFAULT_MOOD_COUNTS });
    setLastUsageDate(null);
    setDailyBonusDate(null);
    setNewlyUnlockedAchievements([]);
  }, []);

  const value: AppContextValue = {
    selectedMoodId,
    totalPoints,
    level,
    streak,
    achievements,
    history,
    moodCounts,
    isLoaded,
    checkedInToday,
    newlyUnlockedAchievements,
    selectMood,
    dismissAchievements,
    resetProgress,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
