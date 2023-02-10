import { SafeAreaView, StyleSheet, Text, View, Image, Platform, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import { ARTIST_POSTER_SIZE, BACKDROP_HEIGHT, height, ITEM_SIZE, SPACING, width } from '../Metrics'
import { LinearGradient } from 'expo-linear-gradient'
import Genres from '../components/Genres';
import { SharedElement } from 'react-navigation-shared-element';
import Rating from '../components/Rating';
import { getArtistsAPI } from '../hooks/apiGet';
import { MotiImage, MotiView } from 'moti';
import { Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold, Montserrat_900Black } from '@expo-google-fonts/montserrat';
import { useFonts } from '@expo-google-fonts/montserrat/useFonts';
import { Movie, MovieArtist, RootStackScreenProps } from '../types'
import { MovieInfo } from '../components/MovieInfo'

const TOP_HEIGHT = height * 0.2;

export function Info ({ route, navigation }: RootStackScreenProps<'Details'>) {
  const { item }: { item: Movie } = route.params
  const [ artists, setArtists ] = useState<MovieArtist[]>([])

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_900Black
  })

  useEffect(() => {
    const fetchData = async () => {
      const artists: MovieArtist[] = await getArtistsAPI(item.key)
      setArtists(artists)
    }
    if(artists.length === 0) {
      fetchData()
    }

    if(fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [item])

  if(!fontsLoaded) {
    return null
  }

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>     
      <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        style={{ 
            position: 'absolute', 
            top: SPACING * 3, 
            left: SPACING * 2, 
            zIndex: 5
        }}>
        
       </TouchableOpacity>
       
      <View style={{ backgroundColor: 'white' }}>
        <SharedElement id='gradient.bg'>
          <LinearGradient 
            colors={['transparent', 'white']}
            style={{
              width,
              height: BACKDROP_HEIGHT,
              position: 'absolute',
              bottom: 0
            }}  
          />
        </SharedElement>
      </View>

          <View style={styles.posterContainer}>
            <SharedElement id={`item.${item.key}.poster`} style={styles.poster}>
              <MotiImage 
                source={{ uri: item.poster }} 
                style={styles.poster} 
              />
            </SharedElement>
          </View>
      
      <MotiView 
        style={styles.bg} 
        from={{ transform: [{ translateY: height }]}} 
        animate={{ transform: [{ translateY: TOP_HEIGHT }]}}
        transition={{
          type: 'timing',
          duration: 600
        }}
      >
        
        <View style={styles.bubbleContainer}>
          <View style={styles.viewFix}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.mainInfo}>
                <View style={{ paddingHorizontal: SPACING * 1.5 }}>
                  <Text style={styles.movieTitle}>{item.title}</Text>
                </View>
                <Genres genres={item.genres} />
                <Rating rating={item.rating}/>

                <View style={{ marginTop: SPACING * 2}}>
                  <Text style={{ fontSize: 20, fontFamily: 'Montserrat_600SemiBold', paddingHorizontal: SPACING * 2.5 }}>Elenco</Text>
                  <MovieInfo artists={artists}/>
                </View>

                <View style={styles.moreInfo}>
                  <View style ={{ flexDirection: 'row', alignItems: 'flex-start', maxWidth: '65%', marginBottom: 4}}>
                    <Text style={{ fontWeight: '600', fontSize: 14}}>Título original:</Text>
                    <Text style={{ marginLeft: SPACING / 2, fontWeight: '500', fontSize: 13, color: '#6b7280'}}>{item.original_title}</Text>
                  </View>
                  <View style ={{ flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{ fontWeight: '600', fontSize: 14}}>Data de lançamento:</Text>
                    <Text style={{ marginLeft: SPACING / 2, fontWeight: '500', fontSize: 13, color: '#6b7280'}}>{item.releaseDate}</Text>
                  </View>
                </View>

                <View style={{ marginTop: SPACING * 4}}>
                  <Text style={{ fontSize: 20, fontFamily: 'Montserrat_600SemiBold', paddingHorizontal: SPACING * 2.5 }}>Descrição</Text>
                  <Text style={{ fontSize: 13, paddingHorizontal: SPACING * 2.5, textAlign: 'justify' }}>{item.description}</Text>
                </View>
                   
              </View>

            </ScrollView>
          </View>
        </View>
      </MotiView>
      <LinearGradient 
        colors={['transparent', 'black']}
        style={{
          width,
          height: height * 0.2,
          position: 'absolute',
          bottom: 0,
          opacity: 0.4    
        }}
      />
    </SafeAreaView>   
  )
}


const styles = StyleSheet.create({
  bg: {
    position: 'absolute',
    width,
    height,
    backgroundColor: 'white',
    borderRadius: 48,
  },
  bubbleContainer: {
    alignItems: 'center',
  },
  movieTitle: {
    fontFamily: 'Montserrat_700Bold',
    lineHeight: 30,
    fontSize: 28,
    textAlign: 'center',
  },
  poster: {
    position: 'absolute',
    height: ITEM_SIZE,
    width: width * 0.5,
    borderRadius: 24, 
    zIndex: -5
  },
  posterContainer: {
    backgroundColor: 'transparent',
    height: ITEM_SIZE * 1.05,
    width: width * 0.55,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewFix: {
    marginTop: SPACING * 3,
  },
  mainInfo: {
    marginTop: 5,
    justifyContent: 'center',
  },
  moreInfo: {
    width: width - (SPACING * 4),
    height: 200,
    alignSelf: 'center',
    borderRadius: 20,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    backgroundColor: 'rgba(156, 163, 175, 0.2)',
    marginTop: SPACING * 4,
    paddingVertical: SPACING * 2,
    paddingHorizontal: SPACING * 1.5
  }
})

Info.sharedElements = ({route}: any) => {
  const { item }: { item: Movie } = route.params;

  return [
    {
      id: `item.${item.key}.poster`,
      animation: 'move',
    },
    
    
  ]
}

export default Info;