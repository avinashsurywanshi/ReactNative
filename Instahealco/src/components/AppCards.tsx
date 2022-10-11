import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { Colors } from '../styles'
import AppText from './AppText'

interface AppCardProps {
  backgroundColor?: string
  color?: string
  content?: string
  icon?: any
  title?: string
}

const AppCard: React.FunctionComponent<AppCardProps> = ({
  ...props
}: AppCardProps) => {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: props.backgroundColor
            ? props.backgroundColor
            : Colors.WHITE,
        },
      ]}>
      {props.icon && (
        <MaterialCommunityIcons
          name={props.icon}
          size={40}
          style={styles.icon}
          color={props.color}
        />
      )}
      <AppText
        color={props.color}
        marginTop="16"
        fontSize="14"
        textAlign="center">
        {props.title}
      </AppText>
      <AppText
        color={props.color}
        marginTop="8"
        fontSize="20"
        textAlign="center">
        {props.content}
      </AppText>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.WHITE,
    borderRadius: 8,
    marginBottom: 0,
    marginTop: 16,
    alignItems: 'center',
    padding: 16,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  icon: {
    color: Colors.PRIMARY,
    marginRight: 8,
  },
})
export default AppCard
