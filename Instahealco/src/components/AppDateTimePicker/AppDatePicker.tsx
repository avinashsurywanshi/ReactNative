import React, { useState, useEffect } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Event } from '@react-native-community/datetimepicker'

interface IAppDatePickerProps {
  open: boolean
  mode: 'date' | 'time'
  value: Date
  onChange: (date: Date) => void
  onCancel?: () => void
}

const AppDatePicker = ({
  open,
  mode,
  value,
  onChange,
  onCancel,
}: IAppDatePickerProps) => {
  const [timeStamp, setTimeStamp] = useState(new Date())

  useEffect(() => {
    if (value !== timeStamp) {
      setTimeStamp(value)
    }
  }, [value])

  const onChangeDatetime = (event: Event, selectedTimeStamp?: Date) => {
    if (event.type === 'set') {
      const currentDate = selectedTimeStamp || timeStamp
      setTimeStamp(currentDate)
      onChange(currentDate)
    } else {
      if (typeof onCancel === 'function') {
        onCancel()
      }
    }
  }

  return open ? (
    <DateTimePicker
      mode={mode}
      value={timeStamp}
      display={'default'}
      onChange={onChangeDatetime}
    />
  ) : null
}

export default AppDatePicker
