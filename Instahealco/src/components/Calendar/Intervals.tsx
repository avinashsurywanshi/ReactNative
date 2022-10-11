import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { format } from 'date-fns'

import Pill from '../Pill'
import AppButton from '../AppButton'

import { Colors, Typography } from '../../styles'

export interface ITimeInterval {
  time: Date
  isPassed: boolean
}

export interface ITimeIntervals {
  [key: string]: ITimeInterval[]
}

interface ITimeIntervalProps {
  selectedFraction: string
  timeIntervals: ITimeIntervals
  onSelectFraction: (fraction: string) => void
  onPressInterval: (timeInterval: ITimeInterval) => void
}

export const getTimeIntervals = (
  startTime: Date,
  endTime: Date,
  interval: number
) => {
  const timeIntervals: ITimeIntervals = {
    morning: [],
    afternoon: [],
    evening: [],
  }
  while (startTime < endTime) {
    if (startTime.getHours() < 12) {
      timeIntervals.morning.push({
        time: new Date(startTime),
        isPassed: startTime < new Date(),
      })
    }
    if (startTime.getHours() >= 12 && startTime.getHours() < 17) {
      timeIntervals.afternoon.push({
        time: new Date(startTime),
        isPassed: startTime < new Date(),
      })
    }
    if (startTime.getHours() >= 17) {
      timeIntervals.evening.push({
        time: new Date(startTime),
        isPassed: startTime < new Date(),
      })
    }
    startTime.setMinutes(startTime.getMinutes() + interval)
  }
  const timeFractions = Object.keys(timeIntervals)
  for (const timeFraction of timeFractions) {
    if (!timeIntervals[timeFraction].length) {
      delete timeIntervals[timeFraction]
    }
  }
  return timeIntervals
}

const InterVals = ({
  selectedFraction,
  timeIntervals,
  onSelectFraction,
  onPressInterval,
}: ITimeIntervalProps) => {
  return (
    <>
      <View style={styles.intervalHeader}>
        {Object.keys(timeIntervals).map((x, i) => (
          <AppButton
            onPress={() => onSelectFraction(x)}
            backgroundColor={
              selectedFraction === x ? Colors.PRIMARY : Colors.TRANSPARENT
            }
            borderRadius={30}
            color={selectedFraction === x ? Colors.WHITE : Colors.GRAY_DARK}
            padding={10}
            fontSize={Typography.FONT_SIZE_10}
            marginVertical={0}
            key={i}>
            {x}
          </AppButton>
        ))}
      </View>
      <View style={styles.timeIntervalContainer}>
        {!!selectedFraction &&
          timeIntervals[selectedFraction].map((x, i) => (
            <TouchableOpacity key={i} onPress={() => onPressInterval(x)}>
              <Pill
                style={
                  !x.isPassed
                    ? styles.pillStyle
                    : { ...styles.pillStyle, ...styles.pillFilledStyle }
                }
                text={format(x.time, 'hh:mm a')}
                textColor={Colors.GRAY_DARK}
                textFontSize={Typography.FONT_SIZE_10.toString()}
              />
            </TouchableOpacity>
          ))}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  pillStyle: {
    borderColor: Colors.GRAY_MEDIUM,
    padding: 5,
    borderRadius: 5,
    marginLeft: 4,
    marginTop: 4,
  },
  pillFilledStyle: {
    backgroundColor: Colors.GRAY_MEDIUM,
  },
  timeIntervalContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  intervalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: Colors.GRAY_LIGHT,
    borderRadius: 5,
    marginTop: 5,
    padding: 5,
  },
})

export default InterVals
