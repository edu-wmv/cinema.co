import { useNavigation } from "@react-navigation/native";
import { Text, Image, View, TouchableOpacity, Animated, StyleSheet} from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { ITEM_SIZE, height, EMPTY_ITEM_SIZE, SPACING } from "../Metrics";
import { Movie, RootStackScreenProps } from "../types";
import Genres from "./Genres";
import Rating from "./Rating";

export const MovieItems = ({ scroll, movies }: { scroll: Animated.Value, movies: Movie[]}) => {
  const navigation = useNavigation();

  const renderMovieItem = ({ item, index }: { item: Movie, index: number }) => {
    const inputRange = [
      (index - 2) * ITEM_SIZE,
      (index - 1) * ITEM_SIZE,
      index * ITEM_SIZE,
    ];
    const translateY = scroll.interpolate({
      inputRange,
      outputRange: [(height * 0.1), (height * 0.05), (height * 0.1)]
    });

    if (!item.poster) {
      return <View style={{ width: EMPTY_ITEM_SIZE }} />
    }

    return (
      <View style={{ width: ITEM_SIZE }}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('Details', {item})
        }} activeOpacity={0.875}>
        <Animated.View style={[styles.itemContainer, {
          transform: [{ translateY }]
        }]}>
          <SharedElement id={`item.${item.key}.poster`} style={styles.posterImage}>
            <Image source={{ uri: item.poster }} style={styles.posterImage}/>
          </SharedElement>
          <Text numberOfLines={1} style={{ fontSize: 18 }}>{item.title}</Text>
          <Genres genres={item.genres} />
          <Rating rating={item.rating} />     
        </Animated.View>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <Animated.FlatList 
        data={movies.reverse()}
        keyExtractor={(item) => item.key}
        renderItem={renderMovieItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        bounces={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scroll }}}],
          { useNativeDriver: true }
        )}
        snapToInterval={ITEM_SIZE}
        contentContainerStyle={{
          alignItems: 'center'
        }}
      />
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    marginHorizontal: SPACING,
    padding: SPACING * 1.5,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 34,
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
})