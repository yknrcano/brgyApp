import React from 'react';
import { View } from 'react-native';
import { colors, radius, border, spacing } from '../theme';

export default function Card({ children, style }) {
  return (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderRadius: radius.md,
          borderWidth: border.width,
          borderColor: border.color,
          padding: spacing.lg,
          marginBottom: spacing.md,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
