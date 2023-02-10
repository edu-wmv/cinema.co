import * as React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'

export default function Rating({ rating }: {rating: number}) {
  const filledStars = Math.floor(rating / 2);
  const maxStars = Array(5 - filledStars).fill('staro');
  const r  = [...Array(filledStars).fill('star'), ...maxStars];

  return (
    <View style={styles.rating}>
      <Text style={[styles.ratingNumber, {
        fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'Roboto'
      }]}>{rating.toFixed(1)}</Text>
      {r.map((type, index) => {
        return <Icon key={index} name={type} size={12} color='#f09c0c' style={styles.stars}/>
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  ratingNumber: {
    marginRight: 6,
    fontSize: 14,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4
  },
  stars: {
    marginRight: 2.5
  }
})