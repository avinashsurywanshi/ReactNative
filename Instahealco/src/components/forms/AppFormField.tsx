import * as React from "react";
import { useFormikContext } from "formik";

import AppText from "../AppText";
import AppTextInput from "../AppTextInput";
import { Colors } from "../../styles";

import { KeyboardTypeOptions, TextInputProps } from "react-native";

interface AppFormFieldProps {
  name: string;
  autoCapitalize?: string;
  autoCorrect?: boolean;
  icon?: any;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  textContentType?: string;
  secureTextEntry?: boolean;
  style?: TextInputProps;
  value?: string;
  width?: string | number;
}

const AppFormField: React.FunctionComponent<AppFormFieldProps> = ({
  name,
  width,
  ...props
}: AppFormFieldProps) => {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();
  return (
    <>
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        width= {width}
        {...props}
      ></AppTextInput>
      {touched[name] && errors[name] && (
        <AppText color={Colors.RED} fontSize="14">
          {errors[name]}
        </AppText>
      )}
    </>
  );
};

export default AppFormField;
