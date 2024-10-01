import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const BottomCard = ({data}) => {
  return (
    <ImageBackground
      resizeMethod="cover"
      source={{uri: data.Url}}
      style={{
        width: 200,
        height: 280,
        backgroundColor: 'yellow',
        marginRight: 10,
        borderRadius: 10,
        overflow: 'hidden',
      }}>
      <View
        style={{
          padding: 10,
          height: '100%',
          width: '100%',
          backgroundColor: '#0000007e',
          justifyContent: 'flex-end',
        }}>
        <Text style={{color: '#fff', fontWeight: '600', textAlign: 'justify'}}>
          {data?.text}
        </Text>
      </View>
    </ImageBackground>
  );
};

export default BottomCard;

const styles = StyleSheet.create({});
