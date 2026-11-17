import { Tabs } from 'expo-router';
import CustomTabBar from '@/components/CustomTabBar';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="requirements" options={{ title: 'Requirements' }} />
      <Tabs.Screen name="emergency" options={{ title: 'Emergency' }} />
      <Tabs.Screen name="concerns" options={{ title: 'Concerns' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
