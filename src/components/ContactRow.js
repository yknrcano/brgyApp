import React from 'react';
import { View, Text, Pressable, Linking, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Card from './Card';
import { colors } from '../theme';

export default function ContactRow({ contact }) {
  const call = () => Linking.openURL(`tel:${contact.number}`).catch(() => Alert.alert('Unable to place call'));
  return (
    <Card style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 15, fontWeight: '700', color: colors.text }}>{contact.name}</Text>
        <Text style={{ fontSize: 13, color: colors.muted, marginTop: 2 }}>{contact.role}  ·  {contact.number}</Text>
      </View>
      <Pressable
        onPress={call}
        accessibilityRole="button"
        accessibilityLabel={`Call ${contact.name}`}
        style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: colors.dangerSoft, alignItems: 'center', justifyContent: 'center' }}
      >
        <Ionicons name="call" size={20} color={colors.danger} />
      </Pressable>
    </Card>
  );
}
