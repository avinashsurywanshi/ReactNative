import React, { useState } from "react";
import { View, Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import AppText from "./AppText";
import AppButton from "./AppButton";
import { Colors, Typography } from "../styles";
import { format } from "date-fns";

interface AppCalenderProps {
  ondateChange: (value:any) => void
}

let selectedDate = new Date();

const AppCalender: React.FunctionComponent<AppCalenderProps> = (props) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(true);

  const onChange = (event: any, selectedDate: any) => {
    // console.log(format(selectedDate, "yyyy-MM-dd"));
    const selectedAppDate = new Date(selectedDate);

    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    props.ondateChange(currentDate);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View>
      {show && (
        <DateTimePicker
          style={styles.datePicker}
          testID="dateTimePicker"
          value={date}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  datePicker: {
    alignItems: "center",
    backgroundColor: Colors.TRANSPARENT,
    margin: "auto",
    marginHorizontal: "30%",
    marginTop: 20,
  },
});

export default AppCalender;
