import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useState, useCallback } from 'react';
import { Deck, getDecks } from '../lib/storage';

export default function HomeScreen() {
  const router = useRouter();
  const [decks, setDecks] = useState<Record<string, Deck>>({});

  useFocusEffect(
    useCallback(() => {
      const fetchDecks = async () => {
        const loaded = await getDecks();
        setDecks(loaded);
      };
      fetchDecks();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flashcards</Text>
      <Button title="Add Deck" onPress={() => router.push('/add-deck')} />
      <FlatList
        data={Object.values(decks)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Button
            title={item.title}
            onPress={() => router.push(`/deck?id=${item.id}`)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 10 },
});
