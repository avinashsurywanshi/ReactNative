import * as React from "react";
import { KeyboardTypeOptions,  StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Colors, Typography } from "../styles";


interface AppTextInputProps {
  autoCapitalize?:string ;
  autoCorrect?: boolean;
  icon?: any;
  keyboardType?: KeyboardTypeOptions;
  onBlur?: () => void;
  onChangeText: (e: string) => void;
  placeholder?: string;
  textContentType?: string;
  secureTextEntry?: boolean;
  style?: TextInputProps;
  value?: string;
  width?: string | number;
}

const AppTextInput: React.FunctionComponent<AppTextInputProps> = ({
  width = "100%",
  ...props
}: AppTextInputProps) => {
  return (
    <View style={[styles.container, { width }]}>
      {props.icon && <MaterialCommunityIcons name= {props.icon} size= {24} style= {styles.icon}/>}
      <TextInput
        style = {styles.textInput}
        autoCorrect = {props.autoCorrect}
        keyboardType = {props.keyboardType}
        onBlur = {props.onBlur}
        onChangeText = {props.onChangeText}
        value = {props.value}
        placeholder={props.placeholder}
        placeholderTextColor={Colors.GRAY_MEDIUM} 
      ></TextInput>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.GRAY_EXTRALIGHT,
    borderColor: Colors.GRAY_LIGHT,
    borderRadius: 4,
    borderWidth: 1,
    flexDirection: "row",
    marginVertical: 8,
    padding: 12
  },
  icon: {
    color: Colors.GRAY_MEDIUM,
    marginRight: 8,
  },
  textInput: {
    color: Colors.GRAY_DARK,
    fontFamily: Typography.font_family,
    fontSize: 16,
    width: '100%'
  },
});

export default AppTextInput;
