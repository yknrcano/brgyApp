import { StyleSheet, Text, View } from 'react-native';

type SectionScreenProps = {
  title: string;
  description: string;
};

export function SectionScreen({ title, description }: SectionScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    marginBottom: 12,
    fontSize: 28,
    fontWeight: '700',
    color: '#17324d',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#475569',
  },
});
