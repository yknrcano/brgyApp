import React from 'react';
import { Pressable, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, radius } from '../theme';

export default function Button({ title, icon, onPress, tone = 'primary', disabled }) {
  const bg = tone === 'danger' ? colors.danger : colors.primary;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: bg,
        opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
        borderRadius: radius.md,
        paddingVertical: 14,
        paddingHorizontal: 18,
      })}
    >
      {icon ? <Ionicons name={icon} size={18} color="#fff" style={{ marginRight: 8 }} /> : null}
      <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15 }}>{title}</Text>
    </Pressable>
  );
}
