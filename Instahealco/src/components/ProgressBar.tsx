import React from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import { Colors } from '../styles'

export interface ProgressBarProps {
  style?: ViewStyle
  backgroundColor?: string
  progressBarColor?: string
  progressPercent: number
  height?: number
  color?: string
}

const ProgressBar = ({ ...props }: ProgressBarProps) => {
  const borderRadius = props.style?.borderRadius || 0
  return (
    <View
      style={{
        ...props.style,
        backgroundColor: props.backgroundColor
          ? props.backgroundColor
          : Colors.TRANSPARENT,
        height: props.height ? props.height : 5,
        borderRadius,
      }}>
      <View
        style={{
          backgroundColor: props.progressBarColor
            ? props.progressBarColor
            : Colors.WHITE,
          width:
            props.progressPercent && props.progressPercent > 0
              ? `${props.progressPercent}%`
              : '1%',
          height: '100%',
          borderRadius,
        }}
      />
    </View>
  )
}

export default ProgressBar
