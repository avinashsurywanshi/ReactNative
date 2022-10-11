import React from 'react'
import { View, ViewStyle, StyleSheet } from 'react-native'

import { Colors, Typography } from '../styles'
import AppText from './AppText'

export interface PillProps {
  style?: ViewStyle
  text: string
  textFontSize?: string
  textColor?: string
  key?: number
}

const Pill = ({ ...props }: PillProps) => {
  return (
    <View style={{ ...styles.container, ...props.style }}>
      <AppText
        fontSize={
          props.textFontSize
            ? props.textFontSize
            : Typography.FONT_SIZE_12.toString()
        }
        color={props.textColor ? props.textColor : Colors.WHITE}>
        {props.text}
      </AppText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.TRANSPARENT,
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.WHITE,
    padding: 10,
  },
})

export default Pill
