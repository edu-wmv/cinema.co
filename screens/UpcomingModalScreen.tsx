import React, { useState, useEffect, useRef } from 'react'
import { StatusBar, StyleSheet, Text, View, Animated } from 'react-native';
import { getMovies } from '../hooks/apiGet';
import { width, height } from '../Metrics';
import { SharedElement } from 'react-navigation-shared-element';
import { Gradient } from '../components/Gradient';
import { Movie, RootStackScreenProps } from '../types';
import { Backdrop } from '../components/Backdrop';
import { MovieItems } from '../components/MovieItem';

const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Loading...</Text>
  </View>
)

const Upcoming = ({ navigation }: RootStackScreenProps<'Movies'>) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const movies: Movie[] = await getMovies();
      setMovies([
        { key: 'left-spacer',
          title: '',
          original_title: '',
          poster: '',
          backdrop: '',
          rating: 0,
          description: '',
          releaseDate: '',
          genres: [''],}, 
          ...movies, 
        { key: 'right-spacer',
          title: '',
          original_title: '',
          poster: '',
          backdrop: '',
          rating: 0,
          description: '',
          releaseDate: '',
          genres: ['']}
      ]);
    };

    if(movies.length === 0){
      fetchData()
    };
  }, [movies])

  if(movies.length === 0) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden translucent={true} />
      <Backdrop movies={movies} scroll={scrollX}/>
      <Gradient colors={['black', 'transparent']} height={height*0.4} top={0} opacity={0.8} />
      <MovieItems movies={movies} scroll={scrollX} />    
      <SharedElement id='gradient.bg'>
        <Gradient colors={['transparent', 'white']} height={height} />
      </SharedElement>
    </View>
  )
}

export default Upcoming;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  paragraph: {
    fontSize: 18,
    margin: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  bg: {
    position: 'absolute',
    width,
    height,
    transform: [{ translateY: height }],
  }
})