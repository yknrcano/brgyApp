import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Card from './Card';
import { colors } from '../theme';

export default function AnnouncementCard({ item, onPress, showImage = true, showBody = false }) {
  const isAdvisory = item.type === 'Advisories';

  return (
    <Card style={{ padding: 0, overflow: 'hidden', backgroundColor: isAdvisory ? colors.dangerSoft : colors.surface, borderColor: isAdvisory ? colors.danger : colors.border }}>
      <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={`Open ${item.title}`}>
        {showImage ? (
          <Image
            source={item.image ? { uri: item.image } : require('../../assets/icon.png')}
            style={{ width: '100%', height: 132, backgroundColor: colors.primarySoft }}
            resizeMode="cover"
          />
        ) : null}
        <View style={{ minHeight: showBody ? 120 : 56, padding: 14, backgroundColor: isAdvisory ? colors.dangerSoft : colors.surface }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: colors.text }} numberOfLines={showBody ? 2 : 1}>
            {item.title}
          </Text>
          {showBody ? (
            <Text style={{ color: colors.muted, fontSize: 14, lineHeight: 20, marginTop: 6 }} numberOfLines={3}>
              {item.body}
            </Text>
          ) : null}
        </View>
      </Pressable>
    </Card>
  );
}
