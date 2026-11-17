import React from 'react';
import { View, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../theme';

export default function StarRating({ value, onChange }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Pressable key={n} onPress={() => onChange(n)} accessibilityRole="button" accessibilityLabel={`${n} star`} hitSlop={6}>
          <Ionicons name={n <= value ? 'star' : 'star-outline'} size={30} color={n <= value ? '#F5A524' : colors.muted} style={{ marginRight: 6 }} />
        </Pressable>
      ))}
    </View>
  );
}
