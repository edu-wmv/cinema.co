/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import * as React from 'react';
import { ColorSchemeName, Pressable, Text, View } from 'react-native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { MovieInfo } from '../components/MovieInfo';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { height, width } from '../Metrics';
import Info from '../screens/MovieInfoModal';
import NotFoundScreen from '../screens/NotFoundScreen';
import Upcoming from '../screens/UpcomingModalScreen';
import { RootStackParamList, RootStackScreenProps, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createSharedElementStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={HomeNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Movies" component={Upcoming} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="Details" component={Info} options={{ presentation: 'modal', headerShown: false, cardStyle: { backgroundColor: 'transparent' } }}  />
    </Stack.Navigator>
  );
}

function HomeNavigator({ navigation }: RootStackScreenProps<'Root'>) {
  const colorScheme = useColorScheme();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width, height}}>
      <Text>Homescreen</Text>
      <Pressable onPress={() => navigation.navigate('Movies')}>
        <Text>Press me</Text>
      </Pressable>
    </View>
  );
}
