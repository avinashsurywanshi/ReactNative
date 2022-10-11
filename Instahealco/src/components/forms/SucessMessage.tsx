import React from 'react';
import { Colors } from "../../styles";
import AppText from "../../components/AppText";


export interface SuccessMessageProps {
  success?: any;
  textAlign?: "auto" | "left" | "right" | "center" | "justify";
  visible?: boolean
};

const SucessMessage: React.FunctionComponent<SuccessMessageProps> = ({success, textAlign, visible}: SuccessMessageProps) => {
  if (!visible || !success) return null;

  return (
    <AppText color={Colors.PRIMARY} fontSize="16" textAlign= {textAlign}>
      {success}
    </AppText>
  );
}

export default SucessMessage;

