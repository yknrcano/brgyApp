import React from 'react';
import { View, Text } from 'react-native';
import { colors, spacing } from '../theme';
import useResponsive from '../hooks/useResponsive';

export default function ScreenHeader({ title, subtitle }) {
  const { s } = useResponsive();
  return (
    <View style={{ paddingTop: spacing.lg, paddingBottom: spacing.lg }}>
      <Text style={{ fontSize: s(26), fontWeight: '700', color: colors.text }}>{title}</Text>
      {subtitle ? (
        <Text style={{ fontSize: s(14), color: colors.muted, marginTop: spacing.xs, lineHeight: s(20) }}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}
