import React, { useState } from "react";
import * as Yup from "yup";
import 'react-native-gesture-handler';

import { AppFormField, AppForm, AppSubmitButton, ErrorMessage } from "../components/forms";
import { Colors } from "../styles";
import { Link } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { UserLoginParams } from "../types";

import AppText from "../components/AppText";
import authApi from "../api/auth";
import Screen from "../components/Screen";

interface LoginScreenProps {
  navigation: StackNavigationProp<any>
}

interface LoginFormValues {
  mobile_no?: number;
}

const initialValues: LoginFormValues = {
  mobile_no: undefined
};

const validationSchema = Yup.object().shape({
  mobile_no: Yup.string().required().max(10).min(10).label("Mobile Number"),
});


const LoginScreen: React.FunctionComponent<LoginScreenProps> = ({ navigation }) => {
  const [sendOtpFaild, setSendOtpFailed] = useState(false);

  // get OTP API call, if OTP sent successfully redirect screen to 
  // Auth-screen (Enter OTP)
  const getOtp = async (loginObject: UserLoginParams) => {
    console.log(loginObject);
    const result = await authApi.getOtp(loginObject);
    console.log(result);
    if (!result.ok) {
      return setSendOtpFailed(true);
    };
    setSendOtpFailed(false);

    navigation.navigate('Enter OTP', {mobile_no: loginObject.mobile_no});
  }
  
  return (
    <Screen>
      <AppText
        bold
        color={Colors.PRIMARY}
        fontSize="32"
        marginTop="24"
        textAlign="center">
        InstaHeal
      </AppText>
      <AppText fontSize="24" marginTop="16" marginBottom="0" textAlign="center">
        Welcome
      </AppText>
      <AppText fontSize="16" marginBottom="40" textAlign="center">
        Sign In to continue
      </AppText>
      {/* <AppText fontSize="16" marginBottom="16" textAlign="center">
        Please enter your registered mobile number
      </AppText> */}
      <ErrorMessage error="User is not registered!" visible={sendOtpFaild} textAlign="center"></ErrorMessage>
      <AppForm
        initialVlaues={initialValues}
        onSubmit={getOtp}
        validationSchema={validationSchema}>
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="cellphone"
          keyboardType="phone-pad"
          name="mobile_no"
          placeholder="Mobile"
          textContentType="telephoneNumber">
        </AppFormField>

        {/* submit button component */}
        <AppSubmitButton backgroundColor={Colors.PRIMARY} color={Colors.WHITE}>
          Get OTP
        </AppSubmitButton>
      </AppForm>
      <AppText fontSize="16" textAlign="center">
        New to InstaHeal?{" "} &nbsp;  
        <Link to={{ screen: "Registartion" }}>
          <AppText color={Colors.PRIMARY} >Register here</AppText>
        </Link>
      </AppText>
    </Screen>
  );
};

export default LoginScreen;
