import React, { useState } from 'react';
import { Image, Modal, Pressable, ScrollView, Text, useWindowDimensions, View } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import ScreenHeader from '../components/ScreenHeader';
import AnnouncementCard from '../components/AnnouncementCard';
import Chip from '../components/Chip';
import { FEED } from '../data/mock';
import { useConcerns } from '../data/concernStore';
import { BARANGAY_NAME, colors, spacing } from '../theme';

const announcements = FEED.filter((item) => ['Announcements', 'Advisories'].includes(item.type));
const events = FEED.filter((item) => item.type === 'Events');
const reports = FEED.filter((item) => item.type === 'Reports');

function SectionTitle({ children }) {
  return (
    <Text style={{ color: colors.text, fontSize: 18, fontWeight: '700', marginBottom: spacing.sm }}>
      {children}
    </Text>
  );
}

function HorizontalCards({ items, onPress }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: spacing.lg }}
    >
      {items.map((item) => (
        <View key={item.id} style={{ width: 280, marginRight: spacing.md }}>
          <AnnouncementCard item={item} onPress={() => onPress(item)} />
        </View>
      ))}
    </ScrollView>
  );
}

function FeedDetailModal({ item, onClose, vote, onVote }) {
  const { width } = useWindowDimensions();
  const carouselWidth = Math.min(width - 32, 688);
  const images = item?.images || (item?.image ? [item.image] : []);
  const likes = (item?.likes || 0) + (vote === 'like' ? 1 : 0);
  const dislikes = (item?.dislikes || 0) + (vote === 'dislike' ? 1 : 0);

  return (
    <Modal visible={Boolean(item)} transparent animationType="fade" onRequestClose={onClose}>
      <View style={{ flex: 1, justifyContent: 'center', padding: spacing.lg, backgroundColor: 'rgba(15, 23, 42, 0.55)' }}>
        <View style={{ overflow: 'hidden', backgroundColor: colors.surface, borderRadius: 16 }}>
          {item ? (
            <ScrollView bounces={false}>
              {images.length > 0 ? (
                <View>
                  <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
                    {images.map((image) => (
                      <Image
                        key={image}
                        source={{ uri: image }}
                        style={{ width: carouselWidth, height: 210, backgroundColor: colors.primarySoft }}
                        resizeMode="cover"
                      />
                    ))}
                  </ScrollView>
                  <Pressable
                    onPress={onClose}
                    accessibilityRole="button"
                    accessibilityLabel="Close details"
                    hitSlop={8}
                    style={{ position: 'absolute', top: 12, right: 12, width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(15, 23, 42, 0.72)' }}
                  >
                    <Text style={{ color: '#fff', fontSize: 24, lineHeight: 26 }}>×</Text>
                  </Pressable>
                </View>
              ) : null}
              <View style={{ padding: spacing.lg }}>
                <Text style={{ color: colors.text, fontSize: 21, fontWeight: '800' }}>{item.title}</Text>
                <Text style={{ color: colors.primary, fontSize: 13, fontWeight: '700', marginTop: spacing.sm }}>
                  {item.time || item.date}
                </Text>
                <Text style={{ color: colors.muted, fontSize: 15, lineHeight: 22, marginTop: spacing.md }}>
                  {item.body}
                </Text>
                {item.type === 'Reports' ? (
                  <View style={{ flexDirection: 'row', marginTop: spacing.lg }}>
                    <Pressable
                      onPress={() => onVote(item.id, 'like')}
                      accessibilityRole="button"
                      style={{ flex: 1, padding: 12, marginRight: 6, borderRadius: 10, backgroundColor: vote === 'like' ? colors.successSoft : colors.bg, alignItems: 'center' }}
                    >
                      <Text style={{ color: colors.success, fontWeight: '700' }}>Like {likes}</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => onVote(item.id, 'dislike')}
                      accessibilityRole="button"
                      style={{ flex: 1, padding: 12, marginLeft: 6, borderRadius: 10, backgroundColor: vote === 'dislike' ? colors.dangerSoft : colors.bg, alignItems: 'center' }}
                    >
                      <Text style={{ color: colors.danger, fontWeight: '700' }}>Dislike {dislikes}</Text>
                    </Pressable>
                  </View>
                ) : null}
              </View>
            </ScrollView>
          ) : null}
        </View>
      </View>
    </Modal>
  );
}

export default function HomeScreen() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [sortMode, setSortMode] = useState('top');
  const [votes, setVotes] = useState({});
  const concerns = useConcerns();
  const openDetails = (item) => setSelectedItem(item);
  const concernReports = concerns
    .filter((concern) => ['Approved', 'In progress'].includes(concern.status))
    .map((concern) => ({
      ...concern,
      id: `concern-${concern.id}`,
      type: 'Reports',
      body: concern.details,
      image: concern.proofUris?.[0],
      images: concern.proofUris,
      time: concern.status,
    }));
  const reportItems = [...reports, ...concernReports];
  const sortedReports = sortMode === 'top'
    ? [...reportItems].sort((a, b) => (
      (b.likes || 0) + (votes[b.id] === 'like' ? 1 : 0)
      - (a.likes || 0) - (votes[a.id] === 'like' ? 1 : 0)
    ))
    : reportItems;

  const voteOnReport = (id, value) => {
    setVotes((current) => ({ ...current, [id]: current[id] === value ? undefined : value }));
  };

  return (
    <ScreenContainer>
      <ScreenHeader title={BARANGAY_NAME} subtitle="Latest news, advisories and community reports." />
      <View style={{ marginBottom: spacing.lg }}>
        <SectionTitle>Announcements &amp; Advisories</SectionTitle>
        <HorizontalCards items={announcements} onPress={openDetails} />
      </View>
      <View style={{ marginBottom: spacing.lg }}>
        <SectionTitle>Events</SectionTitle>
        <HorizontalCards items={events} onPress={openDetails} />
      </View>
      <View>
        <SectionTitle>Reports</SectionTitle>
        <View style={{ flexDirection: 'row', marginBottom: spacing.sm }}>
          <Chip label="Top reports" active={sortMode === 'top'} onPress={() => setSortMode('top')} />
          <Chip label="New reports" active={sortMode === 'new'} onPress={() => setSortMode('new')} />
        </View>
        {sortedReports.map((item) => (
          <AnnouncementCard key={item.id} item={item} showImage={false} showBody onPress={() => openDetails(item)} />
        ))}
      </View>
      <FeedDetailModal
        item={selectedItem}
        vote={selectedItem ? votes[selectedItem.id] : undefined}
        onVote={voteOnReport}
        onClose={() => setSelectedItem(null)}
      />
    </ScreenContainer>
  );
}
