import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { getMoodById } from '@/data/moods';

interface MoodHeroCardProps {
  moodId: string | null;
}

export default function MoodHeroCard({ moodId }: MoodHeroCardProps) {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!moodId) return;
    fadeAnim.setValue(0.7);
    scaleAnim.setValue(0.97);
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 20,
        bounciness: 5,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, [moodId]);

  const mood = getMoodById(moodId);

  if (!mood) {
    return (
      <View style={[styles.container, styles.empty]}>
        <Text style={styles.emptyEmoji}>🧑‍💻</Text>
        <Text style={styles.prompt}>How are you feeling today?</Text>
        <Text style={styles.sub}>Select a mood below to get started</Text>
      </View>
    );
  }

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: mood.bgGradient },
        { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
      ]}
    >
      <View style={[styles.emojiCircle, { backgroundColor: mood.color }]}>
        <Text style={styles.emoji}>{mood.emoji}</Text>
      </View>
      <Text style={styles.label}>{mood.label}</Text>
      <Text style={[styles.devLabel, { color: mood.darkColor }]}>{mood.devLabel}</Text>
      <Text style={styles.message}>{mood.message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 16,
    elevation: 4,
    marginBottom: 4,
  },
  empty: {
    backgroundColor: '#F0EDFF',
    paddingVertical: 28,
  },
  emptyEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  emojiCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  emoji: {
    fontSize: 36,
  },
  label: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A2E',
    fontFamily: 'Inter_700Bold',
    marginBottom: 2,
  },
  devLabel: {
    fontSize: 11,
    fontFamily: 'Inter_500Medium',
    fontWeight: '500',
    marginBottom: 10,
    opacity: 0.8,
  },
  message: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: 'Inter_400Regular',
    paddingHorizontal: 8,
  },
  prompt: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4A3D8F',
    textAlign: 'center',
    fontFamily: 'Inter_700Bold',
    marginBottom: 6,
  },
  sub: {
    fontSize: 13,
    color: '#8878C3',
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
  },
});
