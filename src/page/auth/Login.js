// src/Login.tsx

import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { RootContext } from "../../context/RootContextProvider";
import AppUrl from "../../restApi/AppUrl";
import useSendRequest from "../../customeHelper/useSendRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Container from "../../component/container/Container";
import Loader from "../../component/Loader";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigation = useNavigation();
  const { setUserInfo, isLogin, setIsLogin, loading } = useContext(RootContext);
  const { handelPostData } = useSendRequest();

  const handleLogin = async () => {
    // Simple validation
    if (username.trim() === "" || password.trim() === "") {
      Alert.alert("Error", "Please fill in both fields.");
      return;
    }

    const response = await handelPostData(AppUrl.Login, {
      password: password,
      email: username,
    });

    if (response) {
      const { token, user } = response.data;
      await AsyncStorage.setItem("authToken", token);
      await AsyncStorage.setItem("userInfo", JSON.stringify(user));
      setUserInfo(user);
      setIsLogin(true);
    }
  };

  return (
    <Container>
      {loading && <Loader />}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Login</Text>
          <Text style={{ marginBottom: 20, textAlign: "center" }}>
            login for make appointment and check your appointment
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity
              style={styles.showButton}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <Text style={styles.showButtonText}>
                {!isPasswordVisible ? (
                  <Feather name="eye" size={20} color={"#808080"} />
                ) : (
                  <Feather name="eye-off" size={20} color={"#808080"} />
                )}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: "#ffffff0",
                borderWidth: 0.1,
                borderColor: "#011560",
              },
            ]}
            onPress={() => setIsLogin(true)}
          >
            <Text style={[styles.buttonText, { color: "#011560" }]}>Guest</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("AccountCreate")}
            style={{ marginTop: 20 }}
          >
            <Text style={{ color: "#011560" }}>Create a free Account</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingLeft: 20,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  showButton: {
    position: "absolute",
    right: 10,
    padding: 10,
  },
  showButtonText: {
    color: "#011560",
    fontSize: 14,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#011560",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    // fontWeight: "",
  },
});

export default Login;
