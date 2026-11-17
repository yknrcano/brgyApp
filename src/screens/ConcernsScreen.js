import React, { useState } from 'react';
import { Alert, Image, Modal, Pressable, ScrollView, Text, useWindowDimensions, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ScreenContainer from '../components/ScreenContainer';
import ScreenHeader from '../components/ScreenHeader';
import TicketCard from '../components/TicketCard';
import TextField from '../components/TextField';
import Chip from '../components/Chip';
import Button from '../components/Button';
import { CONCERN_CATEGORIES } from '../data/mock';
import { addConcern, useConcerns } from '../data/concernStore';
import { colors } from '../theme';

function ProofOptionsModal({ visible, onClose, onChoose, onTake }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable onPress={onClose} style={{ flex: 1, justifyContent: 'flex-end', padding: 16, backgroundColor: 'rgba(15, 23, 42, 0.55)' }}>
        <Pressable onPress={() => {}} style={{ padding: 20, backgroundColor: colors.surface, borderRadius: 16 }}>
          <Text style={{ color: colors.text, fontSize: 18, fontWeight: '800', marginBottom: 4 }}>Add proof photos</Text>
          <Text style={{ color: colors.muted, fontSize: 13, marginBottom: 16 }}>Choose up to 3 photos from your gallery or camera.</Text>
          <Button title="Choose from gallery" icon="image-outline" onPress={onChoose} />
          <View style={{ height: 8 }} />
          <Button title="Take a picture" icon="camera-outline" onPress={onTake} />
          <Pressable onPress={onClose} accessibilityRole="button" style={{ alignItems: 'center', paddingTop: 16 }}>
            <Text style={{ color: colors.muted, fontWeight: '700' }}>Cancel</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function ConcernDetailModal({ ticket, onClose }) {
  const images = ticket?.proofUris || (ticket?.proofUri ? [ticket.proofUri] : []);

  return (
    <Modal visible={Boolean(ticket)} transparent animationType="fade" onRequestClose={onClose}>
      <View style={{ flex: 1, justifyContent: 'center', padding: 16, backgroundColor: 'rgba(15, 23, 42, 0.55)' }}>
        <View style={{ maxHeight: '85%', overflow: 'hidden', backgroundColor: colors.surface, borderRadius: 16 }}>
          {ticket ? (
            <ScrollView bounces={false}>
              {images.length > 0 ? (
                <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
                  {images.map((uri) => (
                    <Image key={uri} source={{ uri }} style={{ width: 320, height: 210 }} resizeMode="cover" />
                  ))}
                </ScrollView>
              ) : null}
              <View style={{ padding: 20, paddingTop: images.length > 0 ? 16 : 52 }}>
                <Text style={{ color: colors.text, fontSize: 21, fontWeight: '800' }}>{ticket.title}</Text>
                <Text style={{ color: colors.primary, fontSize: 13, fontWeight: '700', marginTop: 8 }}>
                  #{ticket.id} · {ticket.category} · {ticket.status}
                </Text>
                <Text style={{ color: colors.muted, fontSize: 15, lineHeight: 22, marginTop: 14 }}>{ticket.details}</Text>
              </View>
            </ScrollView>
          ) : null}
          <Pressable
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Close concern details"
            hitSlop={8}
            style={{ position: 'absolute', top: 12, right: 12, width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(15, 23, 42, 0.72)' }}
          >
            <Text style={{ color: '#fff', fontSize: 24, lineHeight: 26 }}>×</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default function ConcernsScreen() {
  const { width } = useWindowDimensions();
  const proofPreviewWidth = Math.min(width - 32, 688);
  const [tab, setTab] = useState('new');
  const tickets = useConcerns();
  const [category, setCategory] = useState(CONCERN_CATEGORIES[0]);
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [proofUris, setProofUris] = useState([]);
  const [proofPickerVisible, setProofPickerVisible] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const addProofUris = (uris) => {
    const remaining = 3 - proofUris.length;
    if (uris.length > remaining) {
      Alert.alert('Maximum reached', 'You can attach up to 3 proof photos.');
    }
    setProofUris([...proofUris, ...uris.slice(0, remaining)]);
  };

  const pickProof = async () => {
    setProofPickerVisible(false);
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permission required', 'Allow photo access to attach proof to your concern.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsMultipleSelection: true,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled) addProofUris(result.assets.map((asset) => asset.uri));
    } catch (error) {
      console.error('Unable to select concern proof photo', error);
      Alert.alert('Photo selection failed', 'Please try selecting the proof photo again.');
    }
  };

  const takeProof = async () => {
    setProofPickerVisible(false);
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permission required', 'Allow camera access to take a proof photo.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) addProofUris(result.assets.map((asset) => asset.uri));
    } catch (error) {
      console.error('Unable to take concern proof photo', error);
      Alert.alert('Camera failed', 'Please try taking the proof photo again.');
    }
  };

  const submit = () => {
    if (!title.trim() || !details.trim()) return Alert.alert('Add a title and details first');
    if (proofUris.length === 0) return Alert.alert('Add proof photo', 'Please attach at least one proof photo before submitting your concern.');
    // TODO: send to your backend
    addConcern({ id: String(1025 + tickets.length), category, title: title.trim(), details: details.trim(), proofUris, status: 'Pending', likes: 0, dislikes: 0 });
    setTitle('');
    setDetails('');
    setProofUris([]);
    setTab('mine');
  };

  return (
    <ScreenContainer>
      <ScreenHeader title="Concerns" subtitle="Report a community issue and track its progress." />
      <View style={{ flexDirection: 'row', marginBottom: 12 }}>
        <Chip label="New concern" active={tab === 'new'} onPress={() => setTab('new')} />
        <Chip label={`My concerns (${tickets.length})`} active={tab === 'mine'} onPress={() => setTab('mine')} />
      </View>
      {tab === 'new' ? (
        <View>
          <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 8 }}>Category</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 6 }}>
            {CONCERN_CATEGORIES.map((c) => (
              <Chip key={c} label={c} active={category === c} onPress={() => setCategory(c)} />
            ))}
          </View>
          <TextField label="Title" placeholder="Short summary" value={title} onChangeText={setTitle} />
          <TextField label="Details" placeholder="What happened and where?" value={details} onChangeText={setDetails} multiline />
          <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 6 }}>Proof photo (required)</Text>
          <Button title={`Add proof photos (${proofUris.length}/3)`} icon="images-outline" onPress={() => setProofPickerVisible(true)} disabled={proofUris.length >= 3} />
          {proofUris.length > 0 ? (
            <View style={{ marginTop: 10, marginBottom: 14 }}>
              <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
                {proofUris.map((uri) => (
                  <Image key={uri} source={{ uri }} style={{ width: proofPreviewWidth, height: 180, borderRadius: 12 }} resizeMode="cover" />
                ))}
              </ScrollView>
              <Text style={{ color: colors.muted, fontSize: 12, marginTop: 6 }}>Swipe left or right to view your proof photos.</Text>
            </View>
          ) : (
            <Text style={{ color: colors.muted, fontSize: 12, marginTop: 6, marginBottom: 14 }}>
              A clear photo helps the barangay team verify the concern.
            </Text>
          )}
          <Button title="Submit concern" icon="send" onPress={submit} />
        </View>
      ) : (
        tickets.map((t) => <TicketCard key={t.id} ticket={t} onPress={() => setSelectedTicket(t)} />)
      )}
      <ProofOptionsModal
        visible={proofPickerVisible}
        onClose={() => setProofPickerVisible(false)}
        onChoose={pickProof}
        onTake={takeProof}
      />
      <ConcernDetailModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
    </ScreenContainer>
  );
}
