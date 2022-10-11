import * as React from "react";
import { Text, TextStyle, TouchableOpacity } from "react-native";
import { Colors, Typography } from "../styles";

export interface AppTextProps {
  style?: TextStyle;
  bold?: boolean;
  color?: string;
  fontSize?: string;
  lineHeight?: string;
  marginBottom?: string;
  marginTop?: string;
  textAlign?: "auto" | "left" | "right" | "center" | "justify";
  children: React.ReactNode;
}

const AppText: React.FunctionComponent<AppTextProps> = ({
  style,
  ...props
}: AppTextProps) => {
  return (
    <Text
      style={{
        ...style,
        color: props.color ? props.color : Colors.GRAY_DARK,
        fontFamily: Typography.font_family,
        fontSize: props.fontSize ? Number(props.fontSize) : 18,
        fontWeight: props.bold ? "bold" : "400",
        marginBottom: Number(props.marginBottom) || 0,
        marginTop: Number(props.marginTop) || 0,
        textAlign: props.textAlign,
      }}
      {...props}>
    </Text>
  );
};

export default AppText;
