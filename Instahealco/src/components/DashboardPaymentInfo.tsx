import React from 'react'
import { View, StyleSheet } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons'

import AppText from '../components/AppText'
import { Colors, Typography } from '../styles'

const DashboardPaymentInfo = () => {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <MaterialCommunityIcons
          name="credit-card"
          size={40}
          color={Colors.PRIMARY}
        />
        <AppText fontSize={Typography.FONT_SIZE_16.toString()}>
          Payments
        </AppText>
      </View>
      <View style={styles.infoContainer}>
        <AppText>28000</AppText>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons
              name="check-circle"
              size={Typography.FONT_SIZE_10}
              color={Colors.SUCCESS}
              style={{ marginRight: 5 }}
            />
            <AppText fontSize={Typography.FONT_SIZE_12.toString()}>
              22000
            </AppText>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons
              name="minus-circle"
              size={Typography.FONT_SIZE_12}
              color={Colors.RED}
              style={{ marginRight: 5 }}
            />
            <AppText fontSize={Typography.FONT_SIZE_12.toString()}>
              6000
            </AppText>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.GRAY_LIGHT,
    padding: 16,
    marginTop: 16,
    flex: 1,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
})

export default DashboardPaymentInfo
