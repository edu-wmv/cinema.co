import { MotiImage } from "moti"
import { TouchableOpacity, View, Text, StyleSheet, FlatList } from "react-native"
import { SPACING, ARTIST_POSTER_SIZE } from "../Metrics"
import { MovieArtist } from "../types"

export const MovieInfo = ({ artists }: { artists: MovieArtist[] }) => {
  const renderArtistBlock = ({ item, index }: { item: MovieArtist, index: number }) => {
    return (
      <TouchableOpacity 
        activeOpacity={0.5}
        key={item.id} 
        style={{ 
        borderRadius: 12,
        justifyContent: 'center',
      }}
      >
        <MotiImage 
          source={{ uri: item.cover }} 
          style={styles.artistCover} 
          from={{
            transform: [{ scale: 0.5 }]
          }}
          animate={{
            transform: [{ scale: 1 }]
          }}
          transition={{
            type: 'timing',
            delay: 250
          }}
        />
        <View style={{ paddingLeft: SPACING + 3, maxWidth: ARTIST_POSTER_SIZE * 1.3, marginTop: SPACING / 1.5}}>
          <Text style={{ fontSize: 12, marginHorizontal: 1 }} numberOfLines={1}>{item.name}</Text>
          <Text style={{ fontSize: 10, color: 'grey'}}>{item.character}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <FlatList 
    data={artists}
    keyExtractor={(item) => item.id}
    renderItem={renderArtistBlock}
    horizontal
    showsHorizontalScrollIndicator={false}
    snapToInterval={(ARTIST_POSTER_SIZE * 1.3) + (SPACING * 2)}
    decelerationRate={0}
    bounces={false}
    scrollEventThrottle={16}
    contentContainerStyle={{
      alignItems: 'center',
      paddingHorizontal: SPACING * 1.5
    }}
  />
  )
}

const styles = StyleSheet.create({
  artistCover: {
    height: ARTIST_POSTER_SIZE * 1.3,
    width: ARTIST_POSTER_SIZE * 1.3,
    borderRadius: 8,
    marginHorizontal: SPACING,
    marginTop: SPACING * 1.5,
  },
})