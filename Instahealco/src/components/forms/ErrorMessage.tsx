import React from "react";

import { Colors } from "../../styles";
import AppText from "../../components/AppText";

export interface ErrorMessageProps {
  error?: any;
  textAlign?: "auto" | "left" | "right" | "center" | "justify";
  visible?: boolean
}

const ErrorMessage: React.FunctionComponent<ErrorMessageProps> = ({error, textAlign, visible}: ErrorMessageProps) => {
  if (!visible || !error) return null;

  return (
    <AppText color={Colors.RED} fontSize="16" textAlign= {textAlign}>
      {error}
    </AppText>
  );
};

export default ErrorMessage;
