import * as React from 'react'
import { useFormikContext } from 'formik'
import AppButton from '../AppButton'

interface AppSubmitButtonProps {
  backgroundColor?: string
  color?: string
  borderRadius?: number
  children?: React.ReactNode
}

const AppSubmitButton: React.FunctionComponent<AppSubmitButtonProps> = ({
  children,
  ...props
}) => {
  const { handleSubmit } = useFormikContext()
  return (
    <AppButton {...props} onPress={handleSubmit}>
      {children}
    </AppButton>
  )
}

export default AppSubmitButton
