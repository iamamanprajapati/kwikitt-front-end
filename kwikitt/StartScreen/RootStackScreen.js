import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import MobileVerificationScreen from './MobileVerificationScreen';
import OtpVerificationScreen from './OtpVerificationScreen';
import RegistrationScreen from './RegistrationScreen';
import {TabNavigation} from '../TabNavigation';
import {ServiceScreen} from './ServiceScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="SplashScreen" component={SplashScreen} />
    <RootStack.Screen
      name="MobileVerificationScreen"
      component={MobileVerificationScreen}
    />
    <RootStack.Screen
      name="OtpVerificationScreen"
      component={OtpVerificationScreen}
    />
    <RootStack.Screen
      name="RegistrationScreen"
      component={RegistrationScreen}
    />
    <RootStack.Screen name="HomeScreen" component={TabNavigation} />
    <RootStack.Screen name="ServiceScreen" component={ServiceScreen} />
  </RootStack.Navigator>
);

export default RootStackScreen;
