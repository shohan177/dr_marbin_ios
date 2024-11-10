import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";

const Dashboard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.topheader]}>
        <Text style={{ fontSize: 20, color: "#011560", fontWeight: "200" }}>
          NIXON
        </Text>
        <View style={styles.avaterIcon}>
          <Text style={{ fontSize: 20, color: "#fff" }}>S</Text>
        </View>
      </View>
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 16 }}
        showsHorizontalScrollIndicator={false}
      >
        <View
          style={{
            paddingVertical: 20,
          }}
        >
          <Text style={{ color: "#011560" }}>Your Appoinment</Text>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {[1, 2, 3, 4, 5].map((item, index) => (
              <DateCard key={index} />
            ))}
          </View>
        </View>

        <Text style={{ color: "#011560" }}>Quic Links</Text>

        <View style={[styles.shadowBox, styles.quicLinkContainer]}>
          <TouchableOpacity style={styles.quickLinkContainer}>
            <EvilIcons name="plus" size={20} color={"#000"} />
            <Text style={styles.quiclLinkText}>Appoinment</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickLinkContainer}>
            <EvilIcons name="link" size={20} color={"#000"} />
            <Text style={styles.quiclLinkText}> About Dr. Marvin</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickLinkContainer}>
            <EvilIcons name="archive" size={20} color={"#000"} />
            <Text style={styles.quiclLinkText}>Info</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickLinkContainer}>
            <EvilIcons name="image" size={20} color={"#000"} />
            <Text style={styles.quiclLinkText}>Gallery</Text>
          </TouchableOpacity>

          <View style={{ position: "absolute", right: 0 }}>
            <Ionicons
              name="paper-plane-outline"
              size={150}
              color={"#000000e"}
            />
          </View>
        </View>

        <Text style={{ color: "#011560" }}>Available Appointments Time</Text>
        <View style={{ marginVertical: 10, paddingBottom: 80 }}>
          {[1, 2, 3, 4, 5].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                width: "99%",
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderColor: "#f4f4f4",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <EvilIcons name="calendar" size={20} color={"#000"} />
                <Text>12.03.2024</Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <EvilIcons name="clock" size={20} color={"#000"} />
                <Text>10:20 am</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

export const DateCard = () => {
  return (
    <View
      style={{
        borderWidth: 1,
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        alignItems: "center",
        borderColor: "#01166034",
        borderStyle: "dashed",
      }}
    >
      <Text>Nov</Text>
      <Text style={{ fontSize: 20, fontWeight: "600" }}>01</Text>
      <Text>2024</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  quickLinkContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 10,
    paddingHorizontal: 16,
  },
  quiclLinkText: { color: "#011560", fontSize: 15, marginLeft: 10 },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topheader: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    borderBottomWidth: 0.4,
    borderColor: "#c8c7c7",
  },
  avaterIcon: {
    backgroundColor: "#0116606f",
    padding: 10,
    borderRadius: 50,
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4,
  },
  shadowBox: {
    width: 200,
    height: 200,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Offset for the shadow
    shadowOpacity: 0.25, // Opacity of the shadow
    shadowRadius: 3.84, // Radius of the shadow blur
    elevation: 5, // Elevation for Android (can be adjusted or omitted for iOS)
    justifyContent: "center",
    alignItems: "flex-start",
  },
  quicLinkContainer: {
    marginTop: 10,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 20,
  },
});
