import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootStackScreenProps<'Test'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Pressable onPress={() => navigation.navigate('Modal')}>TEST</Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
