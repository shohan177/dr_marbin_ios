import { View, Text } from "react-native";
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import TabRoute from "./TabRoute";
import BlogDetails from "../page/blog/BlogDetails";
import Appointment from "../page/appointment/Appointment";
import Login from "../page/auth/Login";
import CreateAccount from "../page/auth/CreateAccount";
import { RootContext } from "../context/RootContextProvider";
import Blog from "../page/blog/Blog";
import Contact from "../page/profile/Contact";
import Privacy from "../page/profile/Privacy";
import About from "../page/about/About";
// import BlogDetails from '../page/blog/BlogDetails';

const Stack = createStackNavigator();

const Route = () => {
  const { isLogin, setIsLogin } = useContext(RootContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLogin ? (
          <>
            <Stack.Screen name="Auth" component={Login} />
            <Stack.Screen name="AccountCreate" component={CreateAccount} />
          </>
        ) : (
          <>
            <Stack.Screen name="Tabs" component={TabRoute} />
            <Stack.Screen name="blog" component={Blog} />
            <Stack.Screen name="blogDetails" component={BlogDetails} />
            <Stack.Screen name="appoinments" component={Appointment} />
            <Stack.Screen name="contact" component={Contact} />
            <Stack.Screen name="privacy" component={Privacy} />
            <Stack.Screen name="about" component={About} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
