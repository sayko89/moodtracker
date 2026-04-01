export interface Mood {
  id: string;
  label: string;
  devLabel: string;
  emoji: string;
  color: string;
  darkColor: string;
  bgGradient: string;
  accentColor: string;
  message: string;
  suggestions: string[];
}

export const MOODS: Mood[] = [
  {
    id: 'tired',
    label: 'Tired',
    devLabel: 'Low Battery Mode',
    emoji: '😴',
    color: '#C8D6E5',
    darkColor: '#8BA3BF',
    bgGradient: '#E8F0F8',
    accentColor: '#8BA3BF',
    message: 'Take it slow today. Small steps still move you forward.',
    suggestions: [
      'Take a short walk before starting work.',
      'Drink water and begin with one small task.',
      'Try a 25-minute focus sprint.',
    ],
  },
  {
    id: 'relaxed',
    label: 'Relaxed',
    devLabel: 'Chill Flow',
    emoji: '😎',
    color: '#B8F0E0',
    darkColor: '#5DCFAA',
    bgGradient: '#E4F9F3',
    accentColor: '#5DCFAA',
    message: 'Stay balanced and keep your rhythm.',
    suggestions: [
      'Keep your rhythm and continue with steady progress.',
      'This is a good time for medium-difficulty tasks.',
      'Use your calm energy wisely.',
    ],
  },
  {
    id: 'focused',
    label: 'Focused',
    devLabel: 'In the Zone',
    emoji: '🔥',
    color: '#FFD6A5',
    darkColor: '#F9A03F',
    bgGradient: '#FFF3E4',
    accentColor: '#F9A03F',
    message: 'Do the hardest task first.',
    suggestions: [
      'Start the hardest task first.',
      'Disable distractions and stay in the zone.',
      'Use this momentum to finish deep work.',
    ],
  },
  {
    id: 'stressed',
    label: 'Stressed',
    devLabel: 'Debug Pressure',
    emoji: '😵',
    color: '#FFBDBD',
    darkColor: '#F47C7C',
    bgGradient: '#FFF0F0',
    accentColor: '#F47C7C',
    message: 'Take a short break, then come back stronger.',
    suggestions: [
      'Pause for 5 minutes and reset.',
      'Break your work into smaller steps.',
      'Take one small action instead of chasing everything.',
    ],
  },
  {
    id: 'happy',
    label: 'Happy',
    devLabel: 'Deploy Success',
    emoji: '🥳',
    color: '#D6CCFF',
    darkColor: '#9B8FF5',
    bgGradient: '#F0EDFF',
    accentColor: '#9B8FF5',
    message: 'Use this energy to build something great.',
    suggestions: [
      'Channel this energy into building something meaningful.',
      'This is a great moment for creative work.',
      'Capture your momentum before it fades.',
    ],
  },
];

export const getMoodById = (id: string | null): Mood | null => {
  if (!id) return null;
  return MOODS.find((m) => m.id === id) || null;
};
