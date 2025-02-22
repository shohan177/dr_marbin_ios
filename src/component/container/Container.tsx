import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

const Container = ({ children, barOverright = false }) => {
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f1f1f1" }}>
        <View
          style={{
            height:
              Platform.OS === "ios"
                ? 0
                : barOverright
                ? 0
                : StatusBar.currentHeight,
          }}
        >
          <StatusBar
            animated={true}
            backgroundColor="#0000006e"
            translucent={true}
          />
        </View>
        <View
          style={
            Platform.OS === "ios"
              ? [styles.iosContainer, { marginTop: barOverright ? -59 : 0 }]
              : styles.androidConatiner
          }
        >
          {children}
        </View>
      </SafeAreaView>
    </>
  );
};

export default Container;

const styles = StyleSheet.create({
  iosContainer: {
    flex: 1,
  },
  androidConatiner: {
    flex: 1,
  },
});
