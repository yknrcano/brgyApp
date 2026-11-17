import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Card from './Card';
import { colors } from '../theme';

export default function RequirementItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <Card style={{ padding: 0 }}>
      <Pressable onPress={() => setOpen(!open)} accessibilityRole="button" style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: colors.text }}>{item.title}</Text>
          <Text style={{ fontSize: 13, color: colors.muted, marginTop: 2 }}>{item.fee}  ·  {item.time}</Text>
        </View>
        <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={20} color={colors.muted} />
      </Pressable>
      {open && (
        <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
          {item.steps.map((step) => (
            <View key={step} style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 8 }}>
              <Ionicons name="checkmark-circle-outline" size={20} color={colors.primary} style={{ marginRight: 8 }} />
              <Text style={{ flex: 1, fontSize: 14, color: colors.text, lineHeight: 20 }}>{step}</Text>
            </View>
          ))}
        </View>
      )}
    </Card>
  );
}
