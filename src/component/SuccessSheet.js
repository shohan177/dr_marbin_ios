import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Animated,
  PanResponder,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native';

const {height: screenHeight} = Dimensions.get('window');

const SuccessSheet = ({
  children,
  isVisible,
  setIsVisible,
  title,
  height = 550,
}) => {
  const translateY = useRef(new Animated.Value(screenHeight)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(translateY, {
        toValue: 350, // Positioning to slide in
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, height]);

  const onClose = () => {
    setIsVisible(false);
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 100) {
          Animated.timing(translateY, {
            toValue: screenHeight,
            duration: 300,
            useNativeDriver: true,
          }).start(onClose);
        } else {
          Animated.timing(translateY, {
            toValue: screenHeight - height, // Back to the original position
            duration: 300,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <>
      {isVisible && (
        <TouchableOpacity style={styles.overlay} onPress={onClose} />
      )}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.bottomSheet,
          {height, transform: [{translateY}]}, // Using dynamic height
        ]}>
        <View style={styles.handle} />
        <View style={{flex: 2, position: 'relative'}}>
          <View
            style={{
              height: 100,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '500',
                  color: 'black',
                }}>
                {title}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'flex-start',
                flex: 1,
              }}>
              {children}
            </View>
          </View>
          {/* bottom section */}
          <View
            style={{
              width: '100%',
              alignItems: 'flex-end',
              borderTopWidth: 1,
              borderColor: '#7f7f7f',
              paddingTop: 5,
            }}>
            <TouchableOpacity
              onPress={onClose}
              style={{
                height: 40,
                width: 100,
                backgroundColor: 'rgba(128, 127, 131, 0.08)',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                bottom: 0,
              }}>
              <Text
                style={{
                  color: 'rgba(128, 127, 131, 1)',
                  fontSize: 15,
                  fontWeight: '500',
                }}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  handle: {
    width: 40,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginBottom: 8,
  },
});

export default SuccessSheet;
