import * as React from 'react';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import AppText from '../components/AppText';
import Screen from '../components/Screen'
import { Colors } from '../styles';
import { RootStackParamList } from "../../App";
import AppButton from '../components/AppButton';

export interface PatientsScreenProps {
    navigation : NativeStackNavigationProp<RootStackParamList, 'Patient'>
}
const PatientsScreen: React.FunctionComponent<PatientsScreenProps> = ({navigation}) => {
  return (
    <Screen>
        <AppText fontSize= "20" color={Colors.PRIMARY} textAlign="center">
            Patients Screen
        </AppText>
        <AppButton onPress={() => navigation.navigate("Home")}>ç
            Go to Home screen
        </AppButton>
    </Screen>
  );
};

export default PatientsScreen;
