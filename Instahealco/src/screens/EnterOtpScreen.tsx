import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import * as Yup from "yup";
import {
  AppFormField,
  AppForm,
  AppSubmitButton,
  ErrorMessage,
  SucessMessage,
} from "../components/forms";

import { Colors } from "../styles";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import authStorage from "../auth/storage";
import authApi from "../api/auth";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";


interface EnterOtpScreenProps {
  route: RouteProp<any>;
}

interface OtpFormValues {
  otp?: number;
}
const initialValues: OtpFormValues = {
  otp: undefined,
};

const validationSchema = Yup.object().shape({
  otp: Yup.string().required().max(6).min(6).label("OTP"),
});

const EnterOtpScreen: React.FunctionComponent<EnterOtpScreenProps> = ({ route }) => {
  const auth = useAuth();

  const [loginFaild, setLoginFailed] = useState(false);
  const [sendOtpFaild, setSendOtpFailed] = useState(false);
  const [sendOtpSuccess, setSendOtpSuccess] = useState(false);
  const [authTokenError, setAuthTokenError] = useState(false);


  const mobile_no = route.params?.mobile_no;
  //const mobile_no = 9011933134

  // authentication
  const handleSubmit = async (otpFiled: any) => {
    // send mobile number and otp to verify user
    const result: any = await authApi.login(mobile_no, otpFiled.otp);

    if (!result.ok) return setLoginFailed(true);

    setLoginFailed(false);
    
    return auth.logIn(result.data);

    // call to findUser api to get user data and go to Dashboard screen
    // getDashboard();
  };

  const getDashboard = async () => {
   
    // const result = await authApi.getHome();
    
    // if (!result.ok) return setAuthTokenError(true);
    
    // const user = result.data;
    // // if get data of current user navigate to Dashboard screen
    // auth.setUser(user);
  }

  // resend OTP method
  const resendOTP = async () => {
    const result = await authApi.getOtp(route.params);

    if (!result.ok) {
      setSendOtpSuccess(false);
      return setSendOtpFailed(true);
    }
    setSendOtpFailed(false);
    setSendOtpSuccess(true);
    setTimeout(() => {
      setSendOtpSuccess(false);
    }, 5000);
  };

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
      <AppText
        fontSize="24"
        marginTop="16"
        marginBottom="16"
        textAlign="center">
        Verification
      </AppText>
      <AppText fontSize="16" marginBottom="40" textAlign="center">
        Please enter OTP sent to +91{mobile_no}
      </AppText>

      <ErrorMessage
        error="You might have entered incorrect OTP, Please enter correct OTP and try again!"
        visible={loginFaild}
        textAlign="center"></ErrorMessage>
      <ErrorMessage
        error="Invalid mobile number!"
        visible={sendOtpFaild}
        textAlign="center"></ErrorMessage>
      <ErrorMessage
        error={"Invalid Token!"}
        visible={authTokenError}
        textAlign="center"></ErrorMessage>

      <SucessMessage
        success="OTP sent successfuly...!"
        textAlign="center"
        visible={sendOtpSuccess}></SucessMessage>

      <AppForm
        initialVlaues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="cellphone"
          keyboardType="phone-pad"
          name="otp"
          placeholder="OTP"
          textContentType="telephoneNumber"></AppFormField>

        {/* submit button component */}
        <AppSubmitButton backgroundColor={Colors.PRIMARY} color={Colors.WHITE}>
          Verify and Proceed
        </AppSubmitButton>
      </AppForm>

      <AppText fontSize="16" marginTop="16" marginBottom="0" textAlign="center">
        Didn't receive the OTP?
      </AppText>
      {/* <AppText color={Colors.PRIMARY} textAlign="center" onPress={resendOTP}>Resend code</AppText> */}

      <AppButton
        backgroundColor="transparent"
        padding={0}
        color={Colors.PRIMARY}
        onPress={resendOTP}>
        Resend code
      </AppButton>
    </Screen>
  );
};

export default EnterOtpScreen;
