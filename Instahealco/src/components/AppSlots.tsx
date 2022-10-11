import * as React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  VirtualizedList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Colors, Typography } from "../styles";
import { TRANSPARENT } from "../styles/colors";
import AppText from "./AppText";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { color } from "react-native-reanimated";

interface AppSlotsProps {
  bookedSlot?: string[];
  disabledSlots?: string[];
  endTime?: string;
  slotBy?: number;
  startTime?: string;
  onSelectSlot: (value: string) => void
}
let startTime!: string;
let endTime!: string;
let bookedSlots!: string[];
let slotBy!: number;
let disabledSlots!: string[];

const numColumns = 5;

// creating time solts based on openTime, CloseTime and intervalTime
const createTimeSlots = (fromTime: string, toTime: string, slotBy: number) => {
  const startTime = moment(fromTime, "HH:mm");
  const endTime = moment(toTime, "HH:mm");

  let arr = [];
  while (startTime <= endTime) {
    arr.push(new (moment as any)(startTime).format("HH:mm:ss"));
    startTime.add(slotBy, "minute");
  }

  return arr;
};

// format data for time slot grid alignment
const formatData = (data: any, numColumns: number) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

// AppSlot function
const AppSlots: React.FunctionComponent<AppSlotsProps> = (
  props: AppSlotsProps
) => {
  console.log("creating slots....")
  startTime = props.startTime as string;
  endTime = props.endTime as string;
  bookedSlots = props.bookedSlot as string[];
  slotBy = props.slotBy as number;
  disabledSlots = props.disabledSlots as string[];
  const [appSlots, setAppSlots] = useState<string[]>([]);

  // creating time-slots
  useEffect(() => {
    setAppSlots(createTimeSlots(startTime, endTime, slotBy));
  }, []);

  // select slot
  const selectSlot = (item: string) => {
    if (typeof props.onSelectSlot === 'function') {
      props.onSelectSlot(item);
    }
  }

  // load time in slot section
  const renderItem = ({ item, index }: any) => {
    // adjustment for extra items
    if (item.empty === true) {
      return <View style={[styles.slotItem, styles.itemInvisible]}></View>;
    }

    // check if time-slot is booked, if this slot is booked style it differently
    if (bookedSlots.indexOf(item) > -1) {
      return (
        <View style={[styles.slotItem, styles.bookedSlot]}>
          <AppText
            fontSize={Typography.FONT_SIZE_12.toString()}
            color="#477028">
            {item}
          </AppText>
        </View>
      );
    }
    
    // available time slot
    return (
      <View style={styles.slotItem}>
        <TouchableOpacity onPress={() => selectSlot(item)}>
          <AppText fontSize={Typography.FONT_SIZE_12.toString()}>
            {item}
          </AppText>
        </TouchableOpacity>
      </View>
    );
  };

  

  return (
    <FlatList
      data={formatData(appSlots, numColumns)}
      style={styles.container}
      renderItem={renderItem}
      keyExtractor={(item) => item}
      numColumns={numColumns}
      // showsHorizontalScrollIndicator={false}
      // showsVerticalScrollIndicator={false}
      // scrollEnabled={false}
    />
  );
};

// slot styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  slotItem: {
    alignItems: "center",
    backgroundColor: TRANSPARENT,
    borderColor: Colors.GRAY_LIGHT,
    borderWidth: 1,
    borderRadius: 4,
    flex: 1,
    flexDirection: "row",
    fontFamily: Typography.font_family,
    justifyContent: "center",
    margin: 4,
    height: 32,
  },
  itemInvisible: {
    borderColor: TRANSPARENT,
  },
  bookedSlot: {
    backgroundColor: "#ebf5e4",
    borderColor: "#649f38",
  },
});

export default AppSlots;
