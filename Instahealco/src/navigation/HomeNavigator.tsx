import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import { ProfileScreen } from '../screens/ProfileScreen'

const HomeStack = createNativeStackNavigator()

const HomeNavigator: React.FC = () => {
  const { Navigator, Screen } = HomeStack

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="HomeFeed" component={HomeScreen} />
      <Screen name="Profile" component={ProfileScreen} />
    </Navigator>
  )
}

export default HomeNavigator
