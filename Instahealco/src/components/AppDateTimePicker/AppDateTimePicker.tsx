import React, { useState, useEffect } from 'react'

import AppDatePicker from './AppDatePicker'

interface IAppDatePickerProps {
  open: boolean
  value: Date
  onChange: (date: Date) => void
  onCancel?: () => void
}

//TODO: Need to check how the picker looks on iOS device, might be needed to wrap in modal

const AppDateTimePicker = ({
  open,
  value,
  onChange,
  onCancel,
}: IAppDatePickerProps) => {
  const [date, setDate] = useState(new Date())
  const [datePickerOpen, setDatePickerOpen] = useState(false)
  const [timePickerOpen, setTimePickerOpen] = useState(false)

  useEffect(() => {
    if (open) {
      setDatePickerOpen(true)
    }
    if (value !== date) {
      setDate(value)
    }
  }, [open, value])

  const setDateAndOpenTimePicker = (selectedDate: Date) => {
    setDatePickerOpen(false)
    setTimePickerOpen(true)
    setDate(selectedDate)
  }

  const setTimeAndCloseTimePicker = (selectedTimeStamp: Date) => {
    setTimePickerOpen(false)
    const newDate = new Date(date)
    newDate.setHours(selectedTimeStamp.getHours())
    newDate.setMinutes(selectedTimeStamp.getMinutes())
    setDate(newDate)
    onChange(newDate)
  }

  const onPressCancel = () => {
    setDatePickerOpen(false)
    setTimePickerOpen(false)
    if (typeof onCancel === 'function') {
      onCancel()
    }
  }

  return (
    <>
      <AppDatePicker
        open={datePickerOpen}
        mode="date"
        value={date}
        onChange={(selectedDate) => setDateAndOpenTimePicker(selectedDate)}
        onCancel={onPressCancel}
      />
      <AppDatePicker
        open={timePickerOpen}
        mode="time"
        value={date}
        onChange={(selectedDate) => setTimeAndCloseTimePicker(selectedDate)}
        onCancel={onPressCancel}
      />
    </>
  )
}

export default AppDateTimePicker
