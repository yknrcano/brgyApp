import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../theme';

export default function ScreenContainer({ children }) {
  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center', paddingBottom: spacing.xxl }}
      >
        <View style={{ width: '100%', maxWidth: 720, paddingHorizontal: spacing.lg }}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}
