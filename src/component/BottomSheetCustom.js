import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native';
// import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';

const BottomSheetCustom = ({
  isOpen,
  setIsOpen,

  title = ' Search Result',
  children,
}) => {
  const sheetRef = useRef(null);
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  // Snap points for the bottom sheet
  const snapPoints = useMemo(() => ['30%', '50%', '60%'], []);

  // Handle bottom sheet changes (optional)
  const handleSheetChanges = useCallback(
    index => {
      console.log('handleSheetChanges', index);
      index === -1 && setIsOpen(false);

      Animated.timing(overlayOpacity, {
        toValue: index === -1 ? 0 : 0.5,
        duration: 300,
        useNativeDriver: true,
      }).start();
    },
    [setIsOpen],
  );

  useEffect(() => {
    if (isOpen) {
      sheetRef.current?.snapToIndex(0);
    } else {
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpen, overlayOpacity, children]);

  return (
    <>
      {isOpen && (
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,

            {backgroundColor: 'rgba(0, 0, 0, 0.15)', opacity: overlayOpacity},
          ]}></Animated.View>
      )}

      {/* <BottomSheet
        enablePanDownToClose={true}
        ref={sheetRef}
        index={-1} 
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 5,
            backgroundColor: '#fff',
          }}>
          <Text style={{color: '#000', fontSize: 15, fontWeight: '300'}}>
            {title}
          </Text>
        </View>
        <BottomSheetScrollView style={styles.bottomSheetContent}>
          {children}
        </BottomSheetScrollView>
      </BottomSheet> */}
    </>
  );
};

export default BottomSheetCustom;

const styles = StyleSheet.create({
  bottomSheetContent: {
    backgroundColor: '#fff', // Custom background color
    padding: 16,
    flex: 1,
    overflow: 'scroll',
    zIndex: 999,
  },
});
