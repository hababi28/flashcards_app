import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { saveDeck } from '../lib/storage';

export default function AddDeck() {
  const [title, setTitle] = useState('');
  const router = useRouter();

  const handleCreateDeck = async () => {
    const id = title.toLowerCase().replace(/\s+/g, '-');
    await saveDeck({ id, title, cards: [] });
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Deck Title:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter deck title"
        value={title}
        onChangeText={setTitle}
      />
      <Button title="Create Deck" onPress={handleCreateDeck} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  label: { fontSize: 20, marginBottom: 10 },
  input: {
    borderColor: '#ccc', borderWidth: 1,
    padding: 10, marginBottom: 20,
  },
});