import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { colors, radius, border } from '../theme';

export default function TextField({ label, multiline, ...props }) {
  return (
    <View style={{ marginBottom: 14 }}>
      {label ? <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 6 }}>{label}</Text> : null}
      <TextInput
        {...props}
        multiline={multiline}
        placeholderTextColor={colors.muted}
        style={{
          backgroundColor: colors.surface,
          borderWidth: border.width,
          borderColor: border.color,
          borderRadius: radius.md,
          paddingHorizontal: 14,
          paddingVertical: 12,
          fontSize: 15,
          color: colors.text,
          minHeight: multiline ? 96 : undefined,
          textAlignVertical: multiline ? 'top' : 'center',
        }}
      />
    </View>
  );
}
