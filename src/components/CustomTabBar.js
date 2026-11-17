import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, border } from '../theme';
import useResponsive from '../hooks/useResponsive';

const TABS = {
  index: { label: 'Home', icons: ['home-outline', 'home'] },
  requirements: { label: 'Requirements', icons: ['document-text-outline', 'document-text'] },
  emergency: { label: 'Emergency', icons: ['warning', 'warning'] },
  concerns: { label: 'Concerns', icons: ['chatbubble-ellipses-outline', 'chatbubble-ellipses'] },
  profile: { label: 'Profile', icons: ['person-outline', 'person'] },
};

export default function CustomTabBar({ state, descriptors, emitter, navigateToTab }) {
  const insets = useSafeAreaInsets();
  const { s, isTablet } = useResponsive();
  const sos = isTablet ? 76 : s(64); // Emergency button is intentionally larger than the rest
  const icon = s(24);

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const tab = TABS[route.name] ?? { label: route.name, icons: ['ellipse-outline', 'ellipse'] };
        const options = descriptors[route.key].options;
        const label = typeof options.tabBarLabel === 'string' ? options.tabBarLabel : options.title ?? tab.label;
        const isSOS = route.name === 'emergency';

        const onPress = () => {
          const event = emitter.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!focused && !event.defaultPrevented) navigateToTab(route.key);
        };

        if (isSOS) {
          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              accessibilityRole="button"
              accessibilityLabel="Emergency"
              style={[styles.item, { flex: 1.3 }]}
            >
              <View
                style={[
                  styles.sos,
                  { width: sos, height: sos, borderRadius: sos / 2, marginTop: -sos * 0.4 },
                ]}
              >
                <Ionicons name="warning" size={sos * 0.46} color="#fff" />
              </View>
              <Text style={[styles.label, { color: colors.danger, fontWeight: '700' }]}>{label}</Text>
            </Pressable>
          );
        }

        const [off, on] = tab.icons;
        const tint = focused ? colors.primary : colors.muted;
        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            accessibilityRole="button"
            accessibilityState={{ selected: focused }}
            style={styles.item}
          >
            <Ionicons name={focused ? on : off} size={icon} color={tint} />
            <Text style={[styles.label, { color: tint, fontWeight: focused ? '700' : '500' }]}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: colors.surface,
    borderTopWidth: border.width,
    borderTopColor: border.color,
    paddingTop: 8,
    zIndex: 10,
    overflow: 'visible',
  },
  item: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingVertical: 2 },
  label: { fontSize: 11, marginTop: 3 },
  sos: {
    backgroundColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: colors.surface, // white ring separates it from the bar
    shadowColor: colors.danger,
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 8,
  },
});
