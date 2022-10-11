import * as React from 'react'
import { useFormikContext } from 'formik'

import AppText from '../AppText'
import AppPicker, { IAppPickerItem } from '../AppPicker'
import { Colors } from '../../styles'

interface AppFormFieldProps {
  name: string
  items: IAppPickerItem[]
  placeholder: string
  marginTop?: number
  autoCapitalize?: string
  autoCorrect?: boolean
  icon?: any
  textContentType?: string
  secureTextEntry?: boolean
  value?: string
  width?: string | number
}

const AppFormField: React.FunctionComponent<AppFormFieldProps> = ({
  name,
  width,
  items,
  placeholder,
  marginTop,
  ...props
}: AppFormFieldProps) => {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext()
  return (
    <>
      <AppPicker
        items={items}
        placeholder={placeholder}
        marginTop={marginTop}
        onChange={handleChange(name)}
      />
      {touched[name] && errors[name] && (
        <AppText color={Colors.RED} fontSize="14">
          {errors[name]}
        </AppText>
      )}
    </>
  )
}

export default AppFormField
