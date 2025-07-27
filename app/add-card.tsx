import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { addCardToDeck } from '../lib/storage';

export default function AddCard() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const { deckId } = useLocalSearchParams();
  const router = useRouter();

  const handleSubmit = async () => {
    if (typeof deckId === 'string') {
      await addCardToDeck(deckId, { question, answer });
      router.push(`/deck?id=${deckId}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Add Card to Deck {deckId}</Text>
      <TextInput
        style={styles.input}
        placeholder="Question"
        value={question}
        onChangeText={setQuestion}
      />
      <TextInput
        style={styles.input}
        placeholder="Answer"
        value={answer}
        onChangeText={setAnswer}
      />
      <Button title="Save Card" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 20, marginBottom: 15 },
  input: {
    borderColor: '#ccc', borderWidth: 1,
    padding: 10, marginBottom: 15,
  },
});