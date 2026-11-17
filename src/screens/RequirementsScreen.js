import React, { useState } from 'react';
import { Text } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import ScreenHeader from '../components/ScreenHeader';
import RequirementItem from '../components/RequirementItem';
import TextField from '../components/TextField';
import { REQUIREMENTS } from '../data/mock';
import { colors } from '../theme';

export default function RequirementsScreen() {
  const [q, setQ] = useState('');
  const list = REQUIREMENTS.filter((r) => r.title.toLowerCase().includes(q.trim().toLowerCase()));
  return (
    <ScreenContainer>
      <ScreenHeader title="Requirements" subtitle="Checklists for permits, documents and benefits." />
      <TextField placeholder="Search a document or permit" value={q} onChangeText={setQ} />
      {list.length === 0 && <Text style={{ color: colors.muted }}>No match. Try a different word.</Text>}
      {list.map((r) => (
        <RequirementItem key={r.id} item={r} />
      ))}
    </ScreenContainer>
  );
}
