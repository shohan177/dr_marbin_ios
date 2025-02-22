import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

import axios from "axios";
import navigationString from "../../constants/navigationString";
import { RootContext } from "../../context/RootContextProvider";
import ConfirmModal from "../../component/ConfirmModal";
import Container from "../../component/container/Container";
import Loader from "../../component/Loader";

const Profile = () => {
  const navigation = useNavigation();
  const [isConfrim, setIsConfrim] = useState(false);
  const { setIsLogin, userInfo, setUserInfo, loading } =
    useContext(RootContext);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("userInfo");
      setIsLogin(false);
      setUserInfo();
      // Alert.alert('Logged out', 'You have been successfully logged out.');
    } catch (error) {
      console.error("Logout Error:", error);
      Alert.alert(
        "Error",
        "An error occurred while logging out. Please try again."
      );
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        Alert.alert("Error", "No authentication token found.");
        return;
      }

      const response = await axios.delete(
        "https://api.elamigodetodosandpueblo.com/api/user-delete",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        await AsyncStorage.clear();

        Alert.alert(
          "Account Deleted",
          "Your account has been deleted successfully."
        );
        handleLogout();
      } else {
        Alert.alert(
          "Error",
          "Failed to delete your account. Please try again."
        );
      }
    } catch (error) {
      console.error("Delete Account Error:", error);
      Alert.alert(
        "Error",
        "An error occurred while deleting your account. Please try again."
      );
    }
  };

  return (
    <Container>
      {loading && <Loader />}

      <View style={{ paddingHorizontal: 30, paddingTop: 100 }}>
        {userInfo ? (
          <View style={styles.profileContainer}>
            <Text style={styles.name}>{userInfo?.name}</Text>
            <Text style={styles.email}>{userInfo?.email}</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsConfrim(true)}
            >
              <Text style={[styles.editButtonText, { color: "red" }]}>
                Delete Account
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.profileContainer}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                setIsLogin(false);
              }}
            >
              <Text style={[styles.editButtonText, { color: "red" }]}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.optionsContainer}>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("contact")}
              style={styles.option}
            >
              <Text style={styles.optionIcon}>{"📞"}</Text>
              <Text style={styles.optionText}>{"Contact Us"}</Text>
            </TouchableOpacity>

            {userInfo && (
              <TouchableOpacity style={styles.option} onPress={handleLogout}>
                <Text style={styles.optionIcon}>{"🚪"}</Text>
                <Text style={styles.optionText}>{"Logout"}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      <ConfirmModal
        visible={isConfrim}
        title="Are you sure ?"
        message="  Are you sure you want to delete your profile? This action is
            irreversible, and all your data will be lost."
        onCancel={() => setIsConfrim(false)}
        onConfirm={handleDeleteAccount}
      />
    </Container>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  editButton: {
    borderColor: "red",
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  optionsContainer: {
    marginTop: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  optionIcon: {
    color: "#000",
    fontSize: 20,
    marginRight: 15,
  },
  optionText: {
    color: "#000",
    fontSize: 16,
  },
});
