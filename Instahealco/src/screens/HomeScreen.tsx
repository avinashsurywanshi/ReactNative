import React, { useEffect, useRef, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";

import AppText from "../components/AppText";
import Screen from "../components/Screen";

import { RootStackParamList } from "../../App";
import AppCard from "../components/AppCards";

import businessApi from "../api/business";
import authApi from "../api/auth";
import AppPicker from "../components/AppPicker";
import Calender from "../components/Calendar";
import DashboardAppointmentInfo from "../components/DashboardAppointmentInfo";
import DashboardPaymentInfo from "../components/DashboardPaymentInfo";

import { Colors, Typography } from "../styles";
import { useApi } from "../hooks/useApi";
import slotsApi from "../api/slots";
import { useContext } from "react";
import AuthContext from "../auth/context";
import useAuth from "../auth/useAuth";
import AppSlots from "../components/AppSlots";
import AppCalender from "../components/AppCalendar";
import { Schedule, appPickerItem } from "../types";
import AppLoading from 'expo-app-loading';
import { onChange } from "react-native-reanimated";
import { format } from "date-fns";

export interface HomeScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const currDate = new Date().toLocaleDateString();
  const currTime = new Date().toLocaleTimeString();
  const { user } = useAuth();

  // const [clinicLocation, setClinicLocation] = useState<string>();
  const [users, setUsers] = useState<any>([]);
  const [currentUser, setCurrentUser] = useState<any>({});
  const [locationItems, setLocationItems] = useState<appPickerItem[]>([]);
  const [clinic, setClinic] = useState<string>('');
  const [slotDataError, setSlotDataError] = useState<boolean>(false);
  const [scheduleInformation, setScheduleInformation] = useState<Schedule>({});
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [slotReady, setSlotReady] = useState(false);


  // call method on user change clinic location
  // useEffect(() => {
  //   setClinic(locationItems[0].value);
  // }, [locationItems]); 

  const clinicRef = useRef('');
  const currentUserRef = useRef<any>({});
  const usersRef = useRef<any>([]);
  
  // useEffect(() => { 
  //   getUsers()
  // }, [])

  useEffect(() => {
    if (currentUserRef.current){
      setCurrentUser(currentUserRef.current)
    }
  },[currentUserRef.current])

  const getUsers = async () => {
    const result = await authApi.getUserDetails();
     if (!result.ok) return;

    usersRef.current = result.data;
    setUsers(usersRef.current);
    // setCurrentUser(users[0]);
    
    await getClinicLocations();
    await getCurrentUser();
    await getSchedule();
    await getBookedSlotData();
  }

  const getCurrentUser = async () => {
    const userByClinic = usersRef.current.find((user: any) => {
      return user.address == clinicRef.current
    });

    currentUserRef.current = userByClinic;
    setCurrentUser(userByClinic);
  }

  // get schedule to create slots
  const getSchedule = async () => {
    const schedules: any = await slotsApi.getSchedule(currentUserRef.current.id);
    
    if (!schedules.ok) return setSlotDataError(true);
    setSlotDataError(false);
    let schedule = schedules.data[0];
    setScheduleInformation(schedule);
  }
  // get clinic locations
  const getClinicLocations = async () => {
    const clinicLocations= usersRef.current.map((userItem: any) => ({ label: userItem.address, value: userItem.address }));
    setLocationItems(clinicLocations);
    clinicRef.current = clinicLocations[0].value;
    
    setClinic(clinicRef.current);
  }

  // get Booked slots fro selected date
  const getBookedSlotData = async (date?: Date) => {
    let currentDate;
    if (date !== undefined) {
      currentDate = format(date, "yyyy-MM-dd");
      setSelectedDate(currentDate.toString());
    } else {
      currentDate = selectedDate
    };

    const getBookedSlotResult: any = await slotsApi.getBookedSlots(currentUserRef.current.id, currentDate.toString());
    let slotsBooked = getBookedSlotResult.data.map((slot: any) => slot.selected_time);
    
    setBookedSlots(slotsBooked);
  }

  const onSelectDate = async (date: Date) => {
    const todayDate = new Date();
    await getBookedSlotData(date);
  }

  const onSelectClinic = async (location: string) => {
    console.log('Selected location...' + location);
    if (location === null) {
      console.log('its not a valid location...')
      return setClinic(clinicRef.current);
    }
    clinicRef.current = location;
    setClinic(clinicRef.current);

    await getCurrentUser();
    await getSchedule();
    await getBookedSlotData();
  }

  
  if (!slotReady) {
    return (
      <AppLoading
        startAsync={getUsers}
        onFinish={() => setSlotReady(true)}
        onError={console.warn}>
      </AppLoading>
    )
  }

  return (
    <Screen>
      {/* <ActivityIndicator animating={loading} size="large" />
      {error && (
        <>
          <AppText color={Colors.RED} fontSize="16" marginTop="16">
            Couldn't retrive data from server
          </AppText>
        </>
      )} */}

      <AppText bold fontSize="18" marginTop="16">
        Dr. {currentUser.full_name}
        {/* Dr. Sandeep Patil */}
      </AppText>
      <AppText fontSize="14" marginTop="16">
        Selected Clinic
      </AppText>

      <AppPicker
        onSelectItem={(value) => onSelectClinic(value)}
        items={locationItems}
        placeholder='Select clinic location'
        selectedValue = {clinic}
      />

      {/* <Calender /> */}
      <AppCalender ondateChange={(value) => onSelectDate(value)}></AppCalender>
      {/* import slots component and send data to it */}
      <AppSlots
        bookedSlot={bookedSlots}
        disabledSlots = {scheduleInformation.disable_time?.split(',')}
        startTime= {scheduleInformation.start_time}
        endTime= {scheduleInformation.end_time}
        slotBy= {scheduleInformation.appoint_interval}
        onSelectSlot= {(slot) => console.log(slot)}
      ></AppSlots>
      {/* Doctor name */}
      <View style={styles.dashboardHeader}>
        <AppText fontSize={Typography.FONT_SIZE_18.toString()} bold={true}>
          Dashboard
        </AppText>
        <MaterialCommunityIcons
          name="filter-variant"
          size={24}
          color={Colors.GRAY_DARK}
        />
      </View>

      <View style={styles.appointmentPaymentInfoContainer}>
        <DashboardAppointmentInfo />
        <DashboardPaymentInfo />
      </View>

      <AppText bold fontSize="18" marginTop="16">
        Clinic Performance
      </AppText>
    </Screen>
  );
};

const styles = StyleSheet.create({
  appointmentPaymentInfoContainer: {
    flexDirection: "row",
  },
  dashboardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default HomeScreen;

function handleChange(name: void): (e: string) => void {
  throw new Error("Function not implemented.");
}
