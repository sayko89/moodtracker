import React, { useEffect, useRef } from 'react';
import { Animated, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { ACHIEVEMENT_DEFS } from '@/utils/gamification';
import { useApp } from '@/context/AppContext';

export default function AchievementModal() {
  const { newlyUnlockedAchievements, dismissAchievements } = useApp();
  const visible = newlyUnlockedAchievements.length > 0;

  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      scaleAnim.setValue(0.85);
      fadeAnim.setValue(0);
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          speed: 14,
          bounciness: 8,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={dismissAchievements}
    >
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <Animated.View style={[styles.modal, { transform: [{ scale: scaleAnim }] }]}>
          <View style={styles.headerRow}>
            <Text style={styles.starEmoji}>🏆</Text>
            <View>
              <Text style={styles.title}>Achievement Unlocked</Text>
              <Text style={styles.subtitle}>
                {newlyUnlockedAchievements.length === 1
                  ? 'You earned a new badge!'
                  : `You earned ${newlyUnlockedAchievements.length} new badges!`}
              </Text>
            </View>
          </View>

          {newlyUnlockedAchievements.map((id) => {
            const def = ACHIEVEMENT_DEFS.find((a) => a.id === id);
            if (!def) return null;
            return (
              <View key={id} style={styles.achievementRow}>
                <View style={styles.iconCircle}>
                  <Text style={styles.icon}>{def.icon}</Text>
                </View>
                <View style={styles.achievementText}>
                  <Text style={styles.achievementLabel}>{def.label}</Text>
                  <Text style={styles.achievementDesc}>{def.description}</Text>
                </View>
                <View style={styles.checkBadge}>
                  <Text style={styles.checkText}>✓</Text>
                </View>
              </View>
            );
          })}

          <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            onPress={dismissAchievements}
          >
            <Text style={styles.buttonText}>Awesome!</Text>
          </Pressable>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(10,10,30,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 28,
    padding: 24,
    width: '100%',
    shadowColor: '#7C6FF7',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 32,
    elevation: 14,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  starEmoji: {
    fontSize: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A2E',
    fontFamily: 'Inter_700Bold',
  },
  subtitle: {
    fontSize: 12,
    color: '#888',
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  achievementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F0FF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    gap: 12,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7C6FF7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  icon: {
    fontSize: 22,
  },
  achievementText: {
    flex: 1,
  },
  achievementLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A2E',
    fontFamily: 'Inter_700Bold',
  },
  achievementDesc: {
    fontSize: 11,
    color: '#888',
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
    lineHeight: 15,
  },
  checkBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#7C6FF7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  button: {
    backgroundColor: '#7C6FF7',
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },
});
