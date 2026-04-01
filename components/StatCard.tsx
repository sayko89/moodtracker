import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  color?: string;
}

export default function StatCard({ label, value, icon, color = '#7C6FF7' }: StatCardProps) {
  return (
    <View style={[styles.card, { borderTopColor: color }]}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={[styles.value, { color }]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    marginHorizontal: 4,
    borderTopWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  icon: {
    fontSize: 20,
    marginBottom: 4,
  },
  value: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },
  label: {
    fontSize: 11,
    color: '#888',
    fontFamily: 'Inter_500Medium',
    marginTop: 2,
  },
});
