import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { AppDatePicker, AppDateTimePicker } from '../AppDateTimePicker'
import AppButton from '../AppButton'
import CreateAppointmentActionSheet from '../CreateAppointmentActionSheet'

import WeekDates from './WeekDates'
import InterVals, {
  ITimeInterval,
  ITimeIntervals,
  getTimeIntervals,
} from './Intervals'

import { Colors, Typography } from '../../styles'

const Calender = () => {
  const [timeIntervals, setTimeIntervals] = useState<ITimeIntervals>({})
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [datePickerOpen, setDatePickerOpen] = useState(false)
  const [selectedDateTime, setSelectedDateTime] = useState(new Date())
  const [dateTimePickerOpen, setDateTimePickerOpen] = useState(false)
  const [timeIntervalSelectedFraction, setTimeIntervalSelectedFraction] =
    useState('')
  const [
    createAppointmentActionSheetOpen,
    setCreateAppointmentActionSheetOpen,
  ] = useState(false)

  useEffect(() => {
    const startTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      9,
      0
    )
    const endTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      21,
      0
    )
    const timeIntervals = getTimeIntervals(startTime, endTime, 15)
    const timeFractions = Object.keys(timeIntervals)
    setTimeIntervals(timeIntervals)
    setTimeIntervalSelectedFraction(timeFractions[0])
  }, [selectedDate])

  const onChangeDatePicker = (selectedDate: Date) => {
    setDatePickerOpen(false)
    setSelectedDate(selectedDate)
  }

  const onChangeDateTimePicker = (selectedDate: Date) => {
    setDateTimePickerOpen(false)
    setSelectedDateTime(selectedDate)
    setCreateAppointmentActionSheetOpen(true)
  }

  const onPressInterval = (timeInterval: ITimeInterval) => {
    if (!timeInterval.isPassed) {
      setSelectedDateTime(timeInterval.time)
      setCreateAppointmentActionSheetOpen(true)
    }
  }

  return (
    <View style={styles.container}>
      <AppButton
        onPress={() => setDatePickerOpen(!datePickerOpen)}
        backgroundColor={Colors.PRIMARY}
        borderRadius={5}
        color={Colors.WHITE}
        marginVertical={5}
        icon={
          <MaterialIcons
            name="calendar-today"
            size={16}
            color={Colors.WHITE}
            style={{ marginRight: 2 }}
          />
        }>
        {selectedDate.toLocaleDateString()}
      </AppButton>
      <AppDatePicker
        open={datePickerOpen}
        mode="date"
        value={selectedDate}
        onChange={onChangeDatePicker}
        onCancel={() => setDatePickerOpen(false)}
      />
      <WeekDates onPressDate={setSelectedDate} />
      <InterVals
        selectedFraction={timeIntervalSelectedFraction}
        timeIntervals={timeIntervals}
        onSelectFraction={setTimeIntervalSelectedFraction}
        onPressInterval={onPressInterval}
      />
      <View style={styles.actionContainer}>
        <AppButton
          onPress={() => {
            setDateTimePickerOpen(!dateTimePickerOpen)
          }}
          backgroundColor={Colors.PRIMARY}
          borderRadius={30}
          color={Colors.WHITE}
          padding={10}
          fontSize={Typography.FONT_SIZE_10}>
          Walk in
        </AppButton>
        <AppDateTimePicker
          open={dateTimePickerOpen}
          value={selectedDateTime}
          onChange={onChangeDateTimePicker}
          onCancel={() => setDateTimePickerOpen(false)}
        />
        <CreateAppointmentActionSheet
          open={createAppointmentActionSheetOpen}
          onClose={() => setCreateAppointmentActionSheetOpen(false)}
          timeStamp={selectedDateTime}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
})

export default Calender
