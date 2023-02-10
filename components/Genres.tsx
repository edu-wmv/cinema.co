import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Genres({ genres }: { genres: string[] }) {
  return (
    <View style={styles.genres}>
      {genres.map((genre, i) => {
        return (
          <View key={genre} style={styles.genre}>
            <Text style={styles.genreText}>{genre}</Text>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 2
  }, 
  genre: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: '#ccc',
    marginRight: 4,
    marginBottom: 4,
  },
  genreText: {
    fontSize: 9,
    opacity: 0.4,
  }
})