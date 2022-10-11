import React, { useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";

import AppCard from "../components/AppCards";
import AppText from "../components/AppText";
import { Colors } from "../styles";
import { RootStackParamList } from "../../App";
import Screen from "../components/Screen";

import businessApi from "../api/business";
import { useApi } from "../hooks/useApi";

export interface GrowScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "Patient">;
}
const GrowScreen: React.FunctionComponent<GrowScreenProps> = ({
  navigation,
}) => {
  const {
    data,
    error,
    loading,
    request: loadReviews,
  } = useApi(businessApi.getReviewImages);

  useEffect(() => {
    loadReviews();
  }, []);

  return (
    <Screen backgroundColor={Colors.GRAY_LIGHT} style={{ padding: 16 }}>
      <AppText bold fontSize="18" marginTop="16">
        Clinic Management
      </AppText>
      <View style={styles.cardContainer}>
        <AppCard
          icon="clock-outline"
          title="Grow Business"
          backgroundColor="#5DA5DA"
          color={Colors.WHITE}
        />
        <AppCard
          icon="update"
          title="Share With Friend"
          backgroundColor="#FAA43A"
          color={Colors.WHITE}
        />
        <AppCard
          icon="calendar-text-outline"
          title="Get Discount"
          backgroundColor="#60BD68"
          color={Colors.WHITE}
        />
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
export default GrowScreen;
