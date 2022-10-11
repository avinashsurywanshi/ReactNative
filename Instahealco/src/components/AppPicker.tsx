import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons'

import { Colors, Typography } from '../styles'
import { appPickerItem } from '../types';
export interface IAppPickerItem {
  label: string
  value: string
}

interface AppPickerProps {
  items: appPickerItem[]
  placeholder?: string
  selectedValue?: any
  marginTop?: number
  onSelectItem?: (value: string) => void
}

const AppPicker: React.FunctionComponent<AppPickerProps> = (
  props: AppPickerProps
) => {
  const onValueChange = (value: string, index: number) => {
    if (typeof props.onSelectItem === 'function') {
      props.onSelectItem(value);
    }
  }

  return (
    <View
      style={{
        marginTop: props.marginTop ? props.marginTop : 0,
      }}>
      <RNPickerSelect
        onValueChange={onValueChange}
        placeholder={{ label: props.placeholder, value: null }}
        items={props.items}
        useNativeAndroidPickerStyle={false}
        style={{
          ...pickerSelectStyles,
          iconContainer: {
            top: 8,
            right: 8,
          },
        }}
        value={props.selectedValue}
        Icon={() => {
          return (
            <MaterialCommunityIcons
              name="chevron-down"
              size={24}
              color={Colors.GRAY_DARK}
            />
          )
        }}
      />
    </View>
  )
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: Colors.GRAY_EXTRALIGHT,
    borderColor: Colors.GRAY_LIGHT,
    borderRadius: 4,
    borderWidth: 1,
    color: Colors.BLACK,
    padding: 12,
    fontSize: Typography.FONT_SIZE_14,
  },
  inputAndroid: {
    backgroundColor: Colors.GRAY_EXTRALIGHT,
    borderColor: Colors.GRAY_LIGHT,
    borderRadius: 4,
    borderWidth: 1,
    color: Colors.GRAY_DARK,
    padding: 12,
    fontSize: Typography.FONT_SIZE_14,
  },
})

export default AppPicker
