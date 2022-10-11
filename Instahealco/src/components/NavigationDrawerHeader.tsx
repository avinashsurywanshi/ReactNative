import React from 'react'
import { View, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { Colors, Typography } from '../styles'
import AppText from './AppText'
import Avatar from './Avatar'
import Pill from './Pill'
import ProgressBar from './ProgressBar'

const getGreetings = (): string => {
  const hours = new Date().getHours()
  if (hours < 12) {
    return 'Good Morning'
  }
  if (hours >= 12 && hours < 17) {
    return 'Good Afternoon'
  }
  if (hours >= 17) {
    return 'Good Evening'
  }
  return 'Good Morning'
}

const NavigationDrawerHeader = () => {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Avatar dimension={80} />
        <View style={styles.avatarOverlay}>
          <MaterialIcons name="edit" color={Colors.GRAY_MEDIUM} size={18} />
        </View>
      </View>
      <View style={styles.profileInfo}>
        <View>
          <AppText
            color={Colors.WHITE}
            fontSize={Typography.FONT_SIZE_12.toString()}>
            {getGreetings()}
          </AppText>
          <AppText
            color={Colors.WHITE}
            fontSize={Typography.FONT_SIZE_12.toString()}>
            Prasanta Kakati
          </AppText>
          <AppText
            color={Colors.WHITE}
            fontSize={Typography.FONT_SIZE_12.toString()}>
            0000000000
          </AppText>
        </View>
        <Pill text="Ref Code: XXX123" />
      </View>
      <AppText
        color={Colors.WHITE}
        fontSize={Typography.FONT_SIZE_12.toString()}
        marginTop="5"
        bold={true}>
        30% profile completed
      </AppText>
      <ProgressBar
        progressPercent={30}
        height={10}
        style={styles.progressBarStyle}
        backgroundColor="#CCCCCC"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
  },
  profileInfo: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressBarStyle: {
    marginTop: 5,
    borderRadius: 10,
  },
  avatarOverlay: {
    position: 'absolute',
    bottom: 5,
    right: '35%',
    backgroundColor: Colors.GRAY_LIGHT,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default NavigationDrawerHeader
