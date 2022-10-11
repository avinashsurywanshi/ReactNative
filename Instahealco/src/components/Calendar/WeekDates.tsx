import React from 'react'
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { format } from 'date-fns'

import AppText from '../AppText'

import { Colors, Typography } from '../../styles'

interface IWeekDatesProps {
  onPressDate: (date: Date) => void
}

const getWeekDates = () => {
  const weekDates = []
  const today = new Date()
  for (let i = 0; i < 7; i++) {
    weekDates.push(new Date(today))
    today.setDate(today.getDate() + 1)
  }
  return weekDates
}

const WeekDates = ({ onPressDate }: IWeekDatesProps) => {
  const weekDates = getWeekDates()
  return (
    <ScrollView horizontal={true}>
      {weekDates.map((x, i) => (
        <TouchableOpacity
          key={i}
          style={styles.weekDateStyle}
          onPress={() => onPressDate(x)}>
          <AppText fontSize={Typography.FONT_SIZE_12.toString()}>
            {x.getDate() === new Date().getDate() ? 'Today' : format(x, 'E')}
          </AppText>
          <AppText bold={true} fontSize={Typography.FONT_SIZE_12.toString()}>
            {x.getDate()}
          </AppText>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  weekDateStyle: {
    backgroundColor: Colors.GRAY_LIGHT,
    borderRadius: 5,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
})

export default WeekDates
