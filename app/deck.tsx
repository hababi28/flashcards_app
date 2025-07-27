import { Stack, useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useState, useCallback } from 'react';
import { Deck, getDeckById, deleteDeck, deleteCardFromDeck } from '../lib/storage';

export default function DeckScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [deck, setDeck] = useState<Deck | null>(null);

  useFocusEffect(
    useCallback(() => {
      const loadDeck = async () => {
        if (typeof id === 'string') {
          const data = await getDeckById(id);
          setDeck(data ?? null);
        }
      };
      loadDeck();
    }, [id])
  );

  if (!deck) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{deck.title}</Text>
      <Button title="Add Card" onPress={() => router.push(`/add-card?deckId=${deck.id}`)} />
      <View style={{ marginBottom: 10 }}>
      <Button
        title="🗑️ Delete Deck"
        color="red"
        onPress={async () => {
          await deleteDeck(deck.id);
          router.push('/');
        }} />
      </View>
      
      <Text style={styles.subtitle}>Cards:</Text>
      {deck.cards.length === 0 ? (
        <Text style={styles.noCards}>No cards yet.</Text>
      ) : (
        <FlatList
          data={deck.cards}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Card {index + 1}</Text>
              <Text style={styles.cardText}>Q: {item.question}</Text>
              <Text style={styles.cardText}>A: {item.answer}</Text>
              <Button title="Delete" color="red" onPress={async () => {
                  await deleteCardFromDeck(deck.id, index);
                  const updated = await getDeckById(deck.id);
                  setDeck(updated ?? null);
                }}/>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 18, marginTop: 20, marginBottom: 10 },
  noCards: { fontStyle: 'italic', color: 'gray' },
  card: {
    padding: 12,
    backgroundColor: '#eee',
    borderRadius: 6,
    marginBottom: 12,
  },
  cardTitle: { fontWeight: 'bold', marginBottom: 5 },
  cardText: { fontSize: 16 },
});
