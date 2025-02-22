import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

export const RootContext = createContext(null);

const RootContextProvider = (props) => {
  const [isIdol, setIsIdol] = useState(true);
  const [isIdolUpdate, setIsIdolUpdate] = useState(false);
  const [timer, setTimer] = useState(null);
  const [appSetting, setAppSetting] = useState(null);
  const [language, setLanguage] = useState("es");
  const [isLogin, setIsLogin] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    handelIslogin();
  }, []);

  const handelIslogin = async () => {
    const userInfo = await AsyncStorage.getItem("userInfo");
    const UserInfoData = userInfo ? JSON.parse(userInfo) : null;
    const token = await AsyncStorage.getItem("authToken");
    if (UserInfoData) {
      setUserInfo(UserInfoData);
    }

    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  const value = {
    isIdol,
    setIsIdol,
    appSetting,
    language,
    setLanguage,
    isLogin,
    setIsLogin,
    userInfo,
    setUserInfo,
    loading,
    setLoading,
    // languageStatus: [language, setLanguage],
  };

  return (
    <RootContext.Provider value={value}>{props.children}</RootContext.Provider>
  );
};

export default RootContextProvider;
