import React, { useContext, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-simple-toast";
import { Keyboard } from "react-native";
import { RootContext } from "../context/RootContextProvider";

const useSendRequest = () => {
  const [error, setError] = useState(null);
  const { setIsLogin, loading, setLoading } = useContext(RootContext);

  const handelError = (error) => {
    try {
      if (axios.isAxiosError(error)) {
        console.log("Status Code:", error.response?.status);
        console.log(
          "Error Message:",
          error.response?.data?.message || error.message
        );

        if (error.response?.status === 401) {
          Toast.show(error.response?.data?.message || error.message, 1);
          setIsLogin(false);
        }
      } else {
        console.log("Unexpected Error:", error);
      }
    } catch (error) {
      console.log("Error handling failed:", error);
      Toast.show("Check Your Internet", 1, {
        backgroundColor: "#0000",
      });
    }
  };

  const handelGetData = async (url, isLoading = true) => {
    console.log("hit url: ", url);
    setLoading(true);
    setError(null);
    const token = (await AsyncStorage.getItem("authToken")) || "";

    if (url) {
      try {
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
            enctype: "multipart/form-data",
          },
        });
        setLoading(false);
        return response.data;
      } catch (error) {
        setLoading(false);
        handelError(error);
      }
    } else {
      setLoading(false);
    }
  };

  const handelDeleteData = async (url, isLoading = true) => {
    console.log("hit url: ", url);
    setLoading(true);
    setError(null);
    const userInfo = await AsyncStorage.getItem("authInfo");
    const token = userInfo ? JSON.parse(userInfo).jwtToken : "";

    if (url) {
      try {
        const response = await axios.delete(url, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
            enctype: "multipart/form-data",
          },
        });
        setLoading(false);
        return response.data;
      } catch (error) {
        handelError(error);
      }
    } else {
      setLoading(false);
    }
  };

  const handelPostData = async (url, data) => {
    Keyboard.dismiss();
    console.log("hit url: ", url);
    console.log("url data", data);
    setLoading(true);
    setError(null);
    const token = (await AsyncStorage.getItem("authToken")) || "";

    console.log("token", token);

    if (url) {
      try {
        const response = await axios.post(url, data, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
            enctype: "application/json",
          },
        });
        setLoading(false);
        return response;
      } catch (error) {
        setLoading(false);
        handelError(error);
      }
    }
    setLoading(false);
  };

  const redirectTologin = () => {
    setIsLogin(false);
    navigate(navigationString.LOGIN);
  };

  return {
    handelGetData,
    handelPostData,
    handelDeleteData,
    loading,
    error,
    redirectTologin,
  };
};

export default useSendRequest;
