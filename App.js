import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import Route from './src/Navigation/Route';
import RootContextProvider from './src/context/RootContextProvider';
// import SplashScreen from 'react-native-splash-screen';
import {LogBox} from 'react-native';
import {ToastProvider} from 'react-native-toast-notifications';

const App = () => {
  useEffect(() => {
    // LogBox.ignoreLogs(['Warning: ...']); // Ignore specific log notifications by message
    // LogBox.ignoreAllLogs(); // Ignore all log notifications
    // SplashScreen.hide();
  }, []);
  return (
    <ToastProvider>
      <RootContextProvider>
        <Route />
      </RootContextProvider>
    </ToastProvider>
  );
};

export default App;
