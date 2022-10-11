import "react-native-gesture-handler";
import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./src/screens/HomeScreen";
import { ProfileScreen } from "./src/screens/ProfileScreen";

import authStorage from "./src/auth/storage";

import AuthNavigator from "./src/navigation/AuthNavigator";
import NavigationTheme from "./src/navigation/NavigationTheme";
import AppNavigator from "./src/navigation/AppNavigator";
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import { useState } from "react";
import AuthContext from "./src/auth/context";

import AppLoading from 'expo-app-loading';
import { AuthObject } from "./src/types";

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Patient: undefined;
  Grow: undefined;
  Manage: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const StackNavigator = (): any => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();
// const TabNavigator = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarActiveTintColor: Colors.PRIMARY,
//         tabBarInactiveTintColor: Colors.GRAY_DARK,
//       })}>
//       <Tab.Screen
//         name="Dashboard"
//         component={HomeNavigator}
//         options={{
//           tabBarIcon: ({ size, color }) => (
//             <MaterialCommunityIcons
//               name="home-outline"
//               color={color}
//               size={size}
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Patients"
//         component={PatientsScreen}
//         options={{
//           tabBarIcon: ({ size, color }) => (
//             <MaterialCommunityIcons
//               name="bunk-bed-outline"
//               color={color}
//               sizie={size}
//             />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

const App: FC<RootStackParamList> = () => {

  const [user, setUser] = useState<AuthObject | null>();
  const [isReady, setIsReady] = useState(false);
  
  // restore user from storage on app refresh
  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  }

  // showing instaheal logo on splash screen while app loading
  if (!isReady) {
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={console.warn}>
      </AppLoading>
    )
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer theme={NavigationTheme}>
        {/* <StackNavigator /> */}
        {/* <TabNavigator /> */}
        {/* <AppNavigator /> */}
        
        {user ? <DrawerNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
    // <SafeAreaView>
    //   <AppLoginScreen></AppLoginScreen>
    // </SafeAreaView>
  );
};

export default App;
