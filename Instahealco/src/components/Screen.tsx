import * as React from 'react'
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import Constants from 'expo-constants'

interface AppScreenProps {
  backgroundColor?: string
  children: React.ReactNode
  style?: any
}

const Screen: React.FunctionComponent<AppScreenProps> = ({
  children,
  ...props
}) => {
  return (
    <SafeAreaView
      style={[styles.screen, { backgroundColor: props.backgroundColor }]}
      >
      <ScrollView style={styles.scrollView}>{children}</ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    paddingHorizontal: 0,
    paddingTop: Constants.statusBarHeight,
  },
  scrollView: {
    paddingHorizontal: 12
  },
})
export default Screen
