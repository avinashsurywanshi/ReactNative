import * as React from "react";
import * as Yup from "yup";
import { Link } from "@react-navigation/native";

import AppText from "../components/AppText";
import { Colors } from "../styles";
import Screen from "../components/Screen";

import { AppFormField, AppForm, AppSubmitButton } from "../components/forms";

interface RegistartionProps {}

interface RegistrationFormValues {
  fullName: string;
  email: string;
  mobileNumber: string;
}
const initialValues: RegistrationFormValues = {
  fullName: "",
  email: "",
  mobileNumber: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  fullName: Yup.string().required().label("Full Name"),
  mobileNumber: Yup.string().required().max(10).min(10).label("Mobile Number"),
});

const RegistartionScreen: React.FunctionComponent<RegistartionProps> = () => {
  return (
    <Screen>
      <AppText
        bold
        color={Colors.PRIMARY}
        fontSize="32"
        marginTop="24"
        textAlign="center"
      >
        InstaHeal
      </AppText>
      <AppText
        color={Colors.GRAY_DARK}
        fontSize="20"
        marginTop="24"
        marginBottom="8"
        textAlign="center"
      >
        Create Account
      </AppText>
      <AppText
        color={Colors.GRAY_DARK}
        fontSize="16"
        marginBottom="40"
        textAlign="center"
      >
        Already have an account?{" "}
        <Link to= {{ screen: "Login" }}>
          <AppText color={Colors.PRIMARY}>Login</AppText>
        </Link>
      </AppText>

      {/* loading form component */}
      <AppForm
        initialVlaues={initialValues}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        {/* form field full name */}
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="account-outline"
          keyboardType="default"
          name="fullName"
          placeholder="Full Name"
          textContentType="emailAddress"
        ></AppFormField>

        {/* form field email */}
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email-outline"
          keyboardType="email-address"
          name="email"
          placeholder="e-mail"
          textContentType="emailAddress"
        ></AppFormField>

        {/* form field mobile number */}
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="cellphone"
          keyboardType="phone-pad"
          name="mobileNumber"
          placeholder="Mobile"
          textContentType="telephoneNumber"
        ></AppFormField>

        {/* submit button component */}
        <AppSubmitButton backgroundColor={Colors.PRIMARY} color={Colors.WHITE}>
          Verify Mobile
        </AppSubmitButton>
      </AppForm>
    </Screen>
  );
};

export default RegistartionScreen;
