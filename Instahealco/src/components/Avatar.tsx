import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { ImageStyle, Image, View } from 'react-native'

import { Colors } from '../styles'

export interface AvatarProps {
  style?: ImageStyle
  src?: string
  dimension?: number
  external?: boolean
}

const Avatar = ({ ...props }: AvatarProps) => {
  return props.external ? (
    <Image
      source={{ uri: props.src }}
      style={{
        ...props.style,
        borderRadius: props.dimension ? props.dimension / 2 : 50 / 2,
        width: props.dimension ? props.dimension : 50,
        height: props.dimension ? props.dimension : 50,
      }}
    />
  ) : (
    <View
      style={{
        ...props.style,
        borderRadius: props.dimension ? props.dimension / 2 : 50 / 2,
        width: props.dimension ? props.dimension : 50,
        height: props.dimension ? props.dimension : 50,
        backgroundColor: Colors.WHITE,
        alignItems: 'center',
      }}>
      <MaterialIcons
        name="person"
        size={props.dimension ? props.dimension - 5 : 45}
        color={Colors.GRAY_MEDIUM}
      />
    </View>
  )
}

export default Avatar
