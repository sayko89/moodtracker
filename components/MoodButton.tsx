import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { Mood } from '@/data/moods';

interface MoodButtonProps {
  mood: Mood;
  isSelected: boolean;
  onPress: (moodId: string) => void;
}

export default function MoodButton({ mood, isSelected, onPress }: MoodButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.93,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: isSelected ? 1.04 : 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 6,
    }).start();
  };

  return (
    <Animated.View style={[styles.wrapper, { transform: [{ scale: scaleAnim }] }]}>
      <Pressable
        onPress={() => onPress(mood.id)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.button,
          { backgroundColor: isSelected ? mood.darkColor : mood.color },
          isSelected && styles.selected,
        ]}
      >
        <Text style={styles.emoji}>{mood.emoji}</Text>
        <Text style={[styles.label, isSelected && styles.selectedLabel]}>{mood.label}</Text>
        <Text style={[styles.devLabel, isSelected && styles.selectedDevLabel]}>{mood.devLabel}</Text>
        {isSelected && <View style={styles.dot} />}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginHorizontal: 3,
  },
  button: {
    borderRadius: 16,
    paddingVertical: 13,
    paddingHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  selected: {
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  emoji: {
    fontSize: 24,
    marginBottom: 5,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: '#3a3a3a',
    fontFamily: 'Inter_700Bold',
  },
  selectedLabel: {
    color: '#fff',
  },
  devLabel: {
    fontSize: 8,
    color: '#777',
    fontFamily: 'Inter_400Regular',
    marginTop: 1,
    textAlign: 'center',
  },
  selectedDevLabel: {
    color: 'rgba(255,255,255,0.75)',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#fff',
    marginTop: 5,
    opacity: 0.85,
  },
});
