import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import useSendRequest from "../../customeHelper/useSendRequest";
import AppUrl from "../../restApi/AppUrl";
import { RootContext } from "../../context/RootContextProvider";
import ConfirmModal from "../../component/ConfirmModal";

const Dashboard = () => {
  const navigation = useNavigation();
  const { handelGetData } = useSendRequest();
  const [appoinmentData, setAppoinmentData] = useState([]);
  const { userInfo, loading, setIsLogin } = useContext(RootContext);
  const [isConfrim, setIsConfrim] = useState(false);
  useFocusEffect(
    useCallback(() => {
      //Screen is focused

      getAppoinmentData();
    }, [])
  );

  const getAppoinmentData = async () => {
    if (!userInfo) {
      return;
    }
    const getAppoinmnet = await handelGetData(AppUrl.checkAppoinment);
    getAppoinmnet && setAppoinmentData(getAppoinmnet);
  };

  const formatTime = (hour) => {
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:00 ${period}`;
  };

  const date = new Date();
  date.setDate(date.getDate() + 1); // Start from tomorrow

  const formattedDate = date
    .toLocaleDateString("en-GB") // Format: DD/MM/YYYY
    .replace(/\//g, "-"); // Replace slashes with dashes

  const generateTimeSlots = () => {
    const startHour = 8; // Start at 8:00 AM
    const totalSlots = 10; // Total 10 slots
    const duration = 1; // Each slot is 1 hour

    return Array.from({ length: totalSlots }, (_, index) => {
      const start = startHour + index * duration;
      const end = start + duration;
      return {
        id: index.toString(),
        label: `${formatTime(start)} - ${formatTime(end)}`,
        date: formattedDate,
      };
    });
  };

  const goToAppoinment = (item) => {
    if (!userInfo) {
      setIsConfrim(true);
      return;
    }
    navigation.navigate("appoinments", {
      slot: item?.label,
      date:
        item?.date +
        "/" +
        date.toLocaleDateString("en-US", { weekday: "long" }),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.topheader]}>
        <Text
          style={{
            fontSize: 20,
            color: "#011560",
            fontWeight: "200",

            height: 25,
          }}
        >
          Hi, {userInfo?.name}
        </Text>
      </View>
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 10 }}
        showsHorizontalScrollIndicator={false}
      >
        {appoinmentData.length > 0 && (
          <View>
            <Text style={{ color: "#011560" }}>
              Your Appoinment
              {loading && (
                <ActivityIndicator style={{ height: 12, width: 12 }} />
              )}
            </Text>

            <ScrollView
              horizontal
              style={{
                width: "100%",
                flexDirection: "row",
                flexWrap: "wrap",
                paddingVertical: 15,
              }}
            >
              {appoinmentData.map((item, index) => (
                <DateCard key={index} item={item} />
              ))}
            </ScrollView>
          </View>
        )}
        <Text style={{ color: "#011560" }}>Quick Links</Text>

        <View style={[styles.shadowBox, styles.quicLinkContainer]}>
          <TouchableOpacity
            style={styles.quickLinkContainer}
            onPress={() =>
              !userInfo
                ? setIsConfrim(true)
                : navigation.navigate("appoinments")
            }
          >
            <EvilIcons name="plus" size={20} color={"#000"} />
            <Text style={styles.quiclLinkText}>Appoinment</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickLinkContainer}
            onPress={() => navigation.navigate("about")}
          >
            <EvilIcons name="link" size={20} color={"#000"} />
            <Text style={styles.quiclLinkText}> About Dr. Marvin</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickLinkContainer}
            onPress={() => navigation.navigate("blog")}
          >
            <EvilIcons name="archive" size={20} color={"#000"} />
            <Text style={styles.quiclLinkText}>Blogs</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.quickLinkContainer}>
            <EvilIcons name="image" size={20} color={"#000"} />
            <Text style={styles.quiclLinkText}>Gallery</Text>
          </TouchableOpacity> */}

          <View style={{ position: "absolute", right: 0, opacity: 0.1 }}>
            <Ionicons
              name="paper-plane-outline"
              size={150}
              color={"#0000002be"}
            />
          </View>
        </View>

        <Text style={{ color: "#011560" }}>Available Appointments Time</Text>
        <View style={{ marginVertical: 10, paddingBottom: 80 }}>
          {generateTimeSlots().map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                width: "99%",
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderColor: "#f4f4f4",
              }}
              onPress={() => goToAppoinment(item)}
            >
              <View style={{ flexDirection: "row" }}>
                <EvilIcons name="calendar" size={20} color={"#000"} />
                <Text>{item?.date}</Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <EvilIcons name="clock" size={20} color={"#000"} />
                <Text>{item?.label}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <ConfirmModal
        visible={isConfrim}
        title="Are want to login ? "
        message="To book an appointment, please log in or create a free account to get started!"
        onCancel={() => setIsConfrim(false)}
        onConfirm={() => {
          setIsConfrim(false);
          setIsLogin(false);
        }}
      />
    </SafeAreaView>
  );
};

export default Dashboard;

export const DateCard = ({ item }) => {
  return (
    <View
      style={{
        width: 130,
        borderWidth: 1,
        padding: 3,
        paddingVertical: 9,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#01166034",
        borderStyle: "dashed",
        margin: 2,
        marginRight: 4,
      }}
    >
      <Text>{item?.date.split("/")[0]}</Text>
      <Text style={{ fontSize: 20, fontWeight: "600" }}>
        {item?.date.split("/")[1]}
      </Text>
      <Text style={{ fontSize: 11 }}>{item?.date.split("/")[2]}</Text>
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
    height: 50,
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
