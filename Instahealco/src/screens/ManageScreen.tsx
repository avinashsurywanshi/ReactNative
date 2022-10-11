import * as React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import { Colors } from "../styles";
import { RootStackParamList } from "../../App";
import AppCard from "../components/AppCards";

export interface ManageScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "Patient">;
}
const ManageScreen: React.FunctionComponent<ManageScreenProps> = ({
  navigation,
}) => {
  return (
    <Screen backgroundColor={Colors.WHITE} style={{ padding: 4 }}>
      <AppText bold fontSize="18" marginTop="16">
        Clinic Management
      </AppText>
      <View style={styles.cardContainer}>
        <AppCard icon="clock-outline" title="Clinic Hours" />
        <AppCard icon="update" title="Manage Appointments" />
        <AppCard icon="calendar-text-outline" title="Manage Clinic" />
      </View>

      <AppText bold fontSize="18" marginTop="16">
        Remote Consultation
      </AppText>
      <View style={styles.cardContainer}>
        <AppCard icon="video-plus" title="Video Consult" />
        <AppCard icon="moped" title="Medicine Delivery" />
      </View>

      <AppText bold fontSize="18" marginTop="16">
        Profile Management
      </AppText>
      <View style={styles.cardContainer}>
        <AppCard icon="account-cog-outline" title="Manage Account" />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 16,
  },
});

export default ManageScreen;
