const DAILY_MESSAGES: string[] = [
  'Consistency beats intensity.',
  'One good session is better than endless planning.',
  'Start small, finish strong.',
  'Momentum grows when you begin.',
  'Progress is built through repetition.',
  'Show up every day. The work compounds.',
  'Done is better than perfect.',
  'The best code is the code you actually ship.',
  'Small wins build unstoppable momentum.',
  'Every great engineer started with one commit.',
  'Focus on the next step, not the entire staircase.',
  'Rest is part of the process.',
  'Clarity comes from doing, not thinking.',
  'Debug your mindset before your code.',
  'Your streak is proof that habits work.',
];

export const getDailyMessage = (): string => {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return DAILY_MESSAGES[dayOfYear % DAILY_MESSAGES.length];
};

export default DAILY_MESSAGES;
