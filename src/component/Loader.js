import {ActivityIndicator, StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import {Dimensions} from 'react-native';
const Loader = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <View
      style={{
        height: windowHeight + 40,
        width: windowWidth,
        position: 'absolute',
        zIndex: 99,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000021',
      }}>

      <View
        style={{
          padding: 15,
          backgroundColor: '#fff',
          elevation: 5,
          borderRadius: 5,
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color={'blue'} />
      </View>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({});
