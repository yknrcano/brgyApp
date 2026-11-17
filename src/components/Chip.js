import React from 'react';
import { Pressable, Text } from 'react-native';
import { colors, radius, border } from '../theme';

export default function Chip({ label, active, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: !!active }}
      style={{
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: radius.pill,
        borderWidth: border.width,
        borderColor: active ? colors.primary : border.color,
        backgroundColor: active ? colors.primarySoft : colors.surface,
        marginRight: 8,
        marginBottom: 8,
      }}
    >
      <Text style={{ color: active ? colors.primary : colors.muted, fontWeight: '600', fontSize: 13 }}>{label}</Text>
    </Pressable>
  );
}
