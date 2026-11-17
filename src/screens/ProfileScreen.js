import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ScreenContainer from '../components/ScreenContainer';
import ScreenHeader from '../components/ScreenHeader';
import Card from '../components/Card';
import StarRating from '../components/StarRating';
import TextField from '../components/TextField';
import Button from '../components/Button';
import { USER } from '../data/mock';
import { colors } from '../theme';

const Row = ({ icon, label, value }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}>
    <Ionicons name={icon} size={20} color={colors.primary} style={{ width: 28 }} />
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 12, color: colors.muted }}>{label}</Text>
      <Text style={{ fontSize: 15, color: colors.text }}>{value}</Text>
    </View>
  </View>
);

const Stat = ({ value, label }) => (
  <Card style={{ flex: 1, marginHorizontal: 4, alignItems: 'center', paddingVertical: 14 }}>
    <Text style={{ fontSize: 22, fontWeight: '800', color: colors.primary }}>{value}</Text>
    <Text style={{ fontSize: 12, color: colors.muted, marginTop: 2 }}>{label}</Text>
  </Card>
);

export default function ProfileScreen() {
  const [rating, setRating] = useState(0);
  const [bug, setBug] = useState('');

  const send = () => {
    // TODO: send rating / bug report to your backend
    Alert.alert('Thank you', 'Your feedback was sent.');
    setBug(''); setRating(0);
  };

  return (
    <ScreenContainer>
      <ScreenHeader title="Profile" />
      <Card style={{ alignItems: 'center' }}>
        <View style={{ width: 72, height: 72, borderRadius: 36, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
          <Text style={{ fontSize: 28, fontWeight: '700', color: colors.primary }}>{USER.name[0]}</Text>
        </View>
        <Text style={{ fontSize: 18, fontWeight: '700', color: colors.text }}>{USER.name}</Text>
        <Text style={{ fontSize: 13, color: colors.muted }}>Resident since {USER.since}</Text>
      </Card>
      <Card>
        <Row icon="location-outline" label="Address" value={USER.address} />
        <Row icon="call-outline" label="Phone" value={USER.phone} />
      </Card>
      <View style={{ flexDirection: 'row', marginHorizontal: -4 }}>
        <Stat value="2" label="Concerns" />
        <Stat value="5" label="Events joined" />
        <Stat value="3" label="Requests" />
      </View>
      <Card style={{ marginTop: 4 }}>
        <Text style={{ fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 10 }}>Rate the app</Text>
        <StarRating value={rating} onChange={setRating} />
        <View style={{ height: 14 }} />
        <TextField label="Report a bug" placeholder="Tell us what went wrong" value={bug} onChangeText={setBug} multiline />
        <Button title="Send feedback" icon="paper-plane" onPress={send} disabled={!rating && !bug.trim()} />
      </Card>
    </ScreenContainer>
  );
}
