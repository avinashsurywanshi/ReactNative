import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer'

import { Colors } from '../styles';

import AppNavigator from './AppNavigator';
import AppButton from '../components/AppButton';
import NavigationDrawerHeader from '../components/NavigationDrawerHeader';
import useAuth from "../auth/useAuth";

const Drawer = createDrawerNavigator()

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const auth = useAuth();

  
  return (
    <DrawerContentScrollView {...props}>
      <NavigationDrawerHeader />
      
      <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate('HomeFeed')}
        icon={({ color, size }) => (
          <MaterialCommunityIcons
            name="home-outline"
            color={color}
            size={size}
          />
        )}
      />

      <DrawerItem
        label="Log Out"
        onPress={() => auth.logOut()}
      />

     
    </DrawerContentScrollView>
  )
}

const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}>
    <Drawer.Screen
      name="RootNavigator"
      component={AppNavigator}
      options={{
        headerShown: false,
      }}
    />
  </Drawer.Navigator>
)

export default DrawerNavigator
