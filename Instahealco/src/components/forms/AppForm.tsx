import { Formik } from 'formik';
import * as React from 'react';

interface AppFormProps {
    initialVlaues: any,
    onSubmit:(event:any) => void,
    validationSchema: Object
}

const AppForm: React.FunctionComponent<AppFormProps> = ({...props}) => {
  return (
    <Formik
        initialValues ={props.initialVlaues}
        validationSchema = {props.validationSchema}
        onSubmit= {props.onSubmit}
    >
        {() => (
            <>
                {props.children}
            </>
        )}

    </Formik>
  ) ;
};

export default AppForm;
