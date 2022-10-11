import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegistartionScreen from '../screens/RegistrationScreen';
import EnterOtpScreen from '../screens/EnterOtpScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator: React.FunctionComponent = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name= "Login" component = {LoginScreen}/>
            <Stack.Screen  name="Enter OTP" component={EnterOtpScreen} />
            <Stack.Screen name="Registartion" component={RegistartionScreen} />
        </Stack.Navigator>
    );
}

export default AuthNavigator;