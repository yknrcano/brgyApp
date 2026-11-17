import React from 'react';
import { Text, View, Pressable, Linking } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ScreenContainer from '../components/ScreenContainer';
import ScreenHeader from '../components/ScreenHeader';
import ContactRow from '../components/ContactRow';
import { CONTACT_GROUPS } from '../data/mock';
import { colors, radius } from '../theme';

export default function EmergencyScreen() {
  return (
    <ScreenContainer>
      <ScreenHeader title="Emergency" subtitle="Tap to call. Stay calm and share your exact location." />
      <Pressable
        onPress={() => Linking.openURL('tel:911')}
        accessibilityRole="button"
        accessibilityLabel="Call 911"
        style={({ pressed }) => ({
          backgroundColor: colors.danger,
          borderRadius: radius.lg,
          paddingVertical: 22,
          alignItems: 'center',
          marginBottom: 20,
          opacity: pressed ? 0.9 : 1,
        })}
      >
        <Ionicons name="call" size={32} color="#fff" />
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: '800', marginTop: 6 }}>Call 911</Text>
      </Pressable>
      {CONTACT_GROUPS.map((g) => (
        <View key={g.title} style={{ marginBottom: 8 }}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: colors.muted, marginBottom: 8 }}>{g.title}</Text>
          {g.contacts.map((c) => (
            <ContactRow key={c.id} contact={c} />
          ))}
        </View>
      ))}
    </ScreenContainer>
  );
}
