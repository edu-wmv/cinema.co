import React from 'react'
import MaskedView from "@react-native-masked-view/masked-view"
import { Animated, Platform, View, FlatList, Image } from "react-native"
import Svg, { Rect } from "react-native-svg"
import { ITEM_SIZE, width, height, BACKDROP_HEIGHT } from "../Metrics"
import { Movie } from "../types"
import { Gradient } from "./Gradient"

export const Backdrop = ({ scroll, movies }: { scroll: Animated.Value, movies: Movie[] }) => {
  const renderBackdrop = ({item, index }: {item: Movie, index: number }) => {
    if(!item.backdrop) {
      return null
    }
  
    const AnimatedSvg = Animated.createAnimatedComponent(Svg)
  
    const inputRange = [
      (index - 2) * ITEM_SIZE,
      (index - 1) * ITEM_SIZE,
    ]
  
    if(Platform.OS === 'ios') {
      const translateX = scroll.interpolate({
        inputRange,
        outputRange: [width, 0]
      })
  
      return (
        <MaskedView
          removeClippedSubviews={false}
          style={{ position: 'absolute' }} 
          maskElement={
            <AnimatedSvg 
              width={width} 
              height={height} 
              viewBox={`0 0 ${width} ${height}`}
              style={{ transform: [{ translateX }]}}
            >
              <Rect x='0' y='0' width={width} height={height} fill='red' /> 
            </AnimatedSvg>
          }
        >
          <Image 
            source={{ uri: item.backdrop }} 
            style={{ 
              width: width, 
              height: BACKDROP_HEIGHT, 
              resizeMode: 'cover'
            }}/>
        </MaskedView>
      )
  
    } else {
      const translateX = scroll.interpolate({
        inputRange,
        outputRange: [width, 0]
      })
  
      return (
        <Animated.View
          removeClippedSubviews={false}
          style={{ 
            position: 'absolute',
            transform: [{ translateX }],
            width,
            height,
            overflow: 'hidden'
           }} 
        >
          <Image 
            source={{ uri: item.backdrop }} 
            style={{ 
              width: width, 
              height: BACKDROP_HEIGHT, 
              resizeMode: 'cover'
            }}/>
        </Animated.View>
      )
    }
  }
    return (
      <View style={{ position: 'absolute', width, height: BACKDROP_HEIGHT}}>
        <FlatList 
          data={movies.reverse()}
          removeClippedSubviews={false}
          keyExtractor={item => item.key + '-backdrop'}
          contentContainerStyle={{ width, height: BACKDROP_HEIGHT}}
          renderItem={renderBackdrop}
          extraData={scroll}
        />
        <Gradient colors={['transparent', 'white']} height={height} bottom={0} />
      </View>
    )
  }
