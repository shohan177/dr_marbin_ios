import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../Auth/Login';
import {createStackNavigator} from '@react-navigation/stack';
import TabRoute from './TabRoute';
import BlogDetails from '../page/blog/BlogDetails';
import Appointment from '../page/appointment/Appointment';
// import BlogDetails from '../page/blog/BlogDetails';

const Stack = createStackNavigator();

const Route = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Tabs" component={TabRoute} />
        <Stack.Screen name="Auth" component={Login} />
        <Stack.Screen name="blogDetails" component={BlogDetails} />
        <Stack.Screen name="appoinments" component={Appointment} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
