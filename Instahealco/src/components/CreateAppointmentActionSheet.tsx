import React from 'react'
import { View, StyleSheet } from 'react-native'
import { format } from 'date-fns'
import * as Yup from 'yup'

import AppActionSheet from './AppActionSheet'
import AppText from './AppText'
import {
  AppForm,
  AppFormField,
  AppSubmitButton,
  AppFormFieldPicker,
} from './forms'

import { Colors, Typography } from '../styles'

// TODO: appointment type picker

interface ICreateAppointmentActionSheet {
  open: boolean
  timeStamp: Date
  onClose: () => void
}

interface ICreateAppoinFormValues {
  mobileNumber: string
  patientName: string
  appointmentPurpose?: string
  appointmentType: 'checkup' | 'followup' | 'treatment' | 'videoconsultation'
}

const createAppointFormInitialValues: ICreateAppoinFormValues = {
  mobileNumber: '',
  patientName: '',
  appointmentPurpose: '',
  appointmentType: 'checkup',
}

const createAppointFormValidationSchema = Yup.object().shape({
  mobileNumber: Yup.string().required().max(10).min(10).label('Mobile Number'),
  patientName: Yup.string().required().label('Patient Name'),
  appointmentPurpose: Yup.string().label('Appointment Purpose'),
  appointmentType: Yup.string().required().label('Appointment Type'),
})

const CreateAppointmentActionSheet = ({
  open,
  timeStamp,
  onClose,
}: ICreateAppointmentActionSheet) => {
  return (
    <AppActionSheet open={open} onClose={onClose}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <AppText bold={true}>Add Appointment</AppText>
          <AppText fontSize={Typography.FONT_SIZE_14.toString()}>
            {format(timeStamp, 'yyyy/MM/dd hh:mm b')}
          </AppText>
        </View>
        <AppForm
          initialVlaues={createAppointFormInitialValues}
          validationSchema={createAppointFormValidationSchema}
          onSubmit={(values) => console.log(values)}>
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            name="mobileNumber"
            placeholder="Mobile Number"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            name="patientName"
            placeholder="Patient Name"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            name="appointmentPurpose"
            placeholder="Appointment Purpose"
          />
          <AppFormFieldPicker
            autoCapitalize="none"
            autoCorrect={false}
            name="appointmentType"
            placeholder="Appointment Type"
            marginTop={8}
            items={[
              {
                label: 'Checkup',
                value: 'checkup',
              },
              {
                label: 'Follow Up',
                value: 'followup',
              },
              {
                label: 'Treatment',
                value: 'treatment',
              },
              {
                label: 'Video Consultation',
                value: 'videoconsultation',
              },
            ]}
          />
          <View
            style={{
              alignItems: 'center',
            }}>
            <AppSubmitButton
              backgroundColor={Colors.PRIMARY}
              color={Colors.WHITE}
              borderRadius={30}>
              Add Appointment
            </AppSubmitButton>
          </View>
        </AppForm>
      </View>
    </AppActionSheet>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  headerContainer: {
    flexDirection: 'column',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: Colors.PRIMARY,
    marginBottom: 16,
  },
})

export default CreateAppointmentActionSheet
