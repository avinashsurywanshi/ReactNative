import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface AppButtonProps {
  activeOpacity?: number
  backgroundColor?: string
  color?: string
  borderRadius?: number
  padding?: number
  fontSize?: number
  marginVertical?: number
  icon?: React.ReactNode
  children?: React.ReactNode
  width?: string | number
  onPress: (event: any) => void
}

const AppButton: React.FunctionComponent<AppButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={[
          styles.button,
          {
            backgroundColor: props.backgroundColor,
            borderRadius: props.borderRadius,
            padding: props.padding,
            marginVertical: props.marginVertical,
            width: props.width ? props.width : '100%'
          },
        ]}>
        {!!props.icon && props.icon}
        <Text
          style={[
            styles.text,
            { color: props.color, fontSize: props.fontSize },
          ]}>
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
AppButton.defaultProps = {
  activeOpacity: 0.4,
  borderRadius: 4,
  padding: 16,
  fontSize: 16,
  marginVertical: 16,
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    justifyContent: 'center',
    marginVertical: 16,
    padding: 16,
    width: '50%'
  },
  text: {
    fontSize: 16,
  },
})

export default AppButton
