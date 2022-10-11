import React from "react";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Text, View } from "react-native";
import { RootStackParamList } from "../../App";

export interface ProfileScreenProps{
  navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  navigation,
}) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profile Screen</Text>
      {/* <Button
        title="Go to Home screen"
        onPress={() => navigation.navigate("Home")}
      /> */}
    </View>
  );
};
