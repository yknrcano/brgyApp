import React from 'react';
import { View, Text } from 'react-native';
import { colors, radius } from '../theme';

const TONES = {
  primary: [colors.primarySoft, colors.primary],
  danger: [colors.dangerSoft, colors.danger],
  success: [colors.successSoft, colors.success],
  warning: [colors.warningSoft, colors.warning],
};

export default function Badge({ label, tone = 'primary' }) {
  const [bg, fg] = TONES[tone] || TONES.primary;
  return (
    <View style={{ alignSelf: 'flex-start', backgroundColor: bg, borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 3 }}>
      <Text style={{ color: fg, fontSize: 12, fontWeight: '600' }}>{label}</Text>
    </View>
  );
}
