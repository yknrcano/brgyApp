import React from 'react';
import { Pressable, View, Text } from 'react-native';
import Card from './Card';
import Badge from './Badge';
import { colors } from '../theme';

const TONE = { Pending: 'warning', 'In progress': 'primary', Resolved: 'success' };

export default function TicketCard({ ticket, onPress }) {
  return (
    <Pressable onPress={onPress} accessibilityRole={onPress ? 'button' : undefined}>
      <Card>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <Badge label={ticket.status} tone={TONE[ticket.status]} />
          <Text style={{ color: colors.muted, fontSize: 12 }}>#{ticket.id}  ·  {ticket.category}</Text>
        </View>
        <Text style={{ fontSize: 16, fontWeight: '700', color: colors.text }}>{ticket.title}</Text>
        <Text style={{ fontSize: 14, color: colors.muted, marginTop: 4, lineHeight: 20 }}>{ticket.details}</Text>
      </Card>
    </Pressable>
  );
}
