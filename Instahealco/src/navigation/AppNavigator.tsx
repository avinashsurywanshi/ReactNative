import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { DrawerToggleButton } from '@react-navigation/drawer'
import {
  getFocusedRouteNameFromRoute,
  RouteProp,
} from '@react-navigation/native'
import { ParamListBase } from '@react-navigation/routers'

import PatientsScreen from '../screens/PatientsScreen'
import GrowScreen from '../screens/GrowScreen'
import ManageScreen from '../screens/ManageScreen'
import HomeScreen from '../screens/HomeScreen'
import { Colors } from '../styles'
import HomeNavigator from './HomeNavigator'
import AppointmentScreen from '../screens/AppointmentScreen'

const getCurrentRouteName = (
  route: RouteProp<ParamListBase, 'Home'>
): string => {
  const routeName = getFocusedRouteNameFromRoute(route) || 'Home'
  if (routeName === 'HomeFeed') {
    return 'Home'
  }
  return routeName
}

const Tab = createBottomTabNavigator()

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarInactiveTintColor: Colors.GRAY_DARK,
        headerLeft: () => <DrawerToggleButton />,
      })}>
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={({ route }) => ({
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={size}
            />
          ),
          headerTitle: getCurrentRouteName(route),
          tabBarActiveTintColor:
            getCurrentRouteName(route) === 'Home'
              ? Colors.PRIMARY
              : Colors.GRAY_DARK,
        })}
      />
      <Tab.Screen
        name="Appointment"
        component={AppointmentScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="bunk-bed-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Patient"
        component={PatientsScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="bunk-bed-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Grow"
        component={GrowScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="graph-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Manage"
        component={ManageScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="cog-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default AppNavigator
