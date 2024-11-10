import React, { createContext, useEffect, useState } from "react";

export const RootContext = createContext(null);

const RootContextProvider = (props) => {
  const [isIdol, setIsIdol] = useState(true);
  const [isIdolUpdate, setIsIdolUpdate] = useState(false);
  const [timer, setTimer] = useState(null);
  const [appSetting, setAppSetting] = useState(null);
  const [language, setLanguage] = useState("es");
  const [isLogin, setIsLogin] = useState(false);

  const value = {
    isIdol,
    setIsIdol,
    appSetting,
    language,
    setLanguage,
    isLogin,
    setIsLogin,
    // languageStatus: [language, setLanguage],
  };

  return (
    <RootContext.Provider value={value}>{props.children}</RootContext.Provider>
  );
};

export default RootContextProvider;
