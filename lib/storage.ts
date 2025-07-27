import AsyncStorage from '@react-native-async-storage/async-storage';

export type Card = {
  question: string;
  answer: string;
};

export type Deck = {
  id: string;
  title: string;
  cards: Card[];
};

const DECKS_KEY = 'FLASHCARDS_DECKS';

export const getDecks = async (): Promise<Record<string, Deck>> => {
  const json = await AsyncStorage.getItem(DECKS_KEY);
  return json ? JSON.parse(json) : {};
};

export const saveDeck = async (deck: Deck): Promise<void> => {
  const decks = await getDecks();
  decks[deck.id] = deck;
  await AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks));
};

export const addCardToDeck = async (
  deckId: string,
  card: Card
): Promise<void> => {
  const decks = await getDecks();
  if (!decks[deckId]) return;
  decks[deckId].cards.push(card);
  await AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks));
};

export const getDeckById = async (id: string): Promise<Deck | undefined> => {
  const decks = await getDecks();
  return decks[id];
};

export const deleteDeck = async (deckId: string): Promise<void> => {
  const decks = await getDecks();
  delete decks[deckId];
  await AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks));
};

export const deleteCardFromDeck = async (
  deckId: string,
  cardIndex: number
): Promise<void> => {
  const decks = await getDecks();
  if (!decks[deckId]) return;
  decks[deckId].cards.splice(cardIndex, 1);
  await AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks));
};
