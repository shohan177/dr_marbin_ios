import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as Animatable from "react-native-animatable";
import { Linking } from "react-native";

import EventCard from "../../component/EventCard";
import AppUrl from "../../restApi/AppUrl";
import useSendRequest from "../../customeHelper/useSendRequest";
import Slider from "../../component/Slider";
import CustomeHead from "../../component/CustomeHead";
import CustomYoutubePlayer from "../../component/CustomYoutubePlayer";
import BottomCard from "../../component/BottomCard";
import { RootContext } from "../../context/RootContextProvider";
import "../../utility/i18n";
import { useTranslation } from "react-i18next";
import BottomSheetCustom from "../../component/BottomSheetCustom";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const { language, setLanguage } = useContext(RootContext);
  const { t, i18n } = useTranslation();
  const [openSheet, setOpenSheet] = useState(false);
  const [focuseCard, setFocuseCard] = useState("edu");
  const navigation = useNavigation();
  const { handelGetData, formatDate } = useSendRequest();
  const [eventData, setEventData] = useState([]);
  const [sortText, setSortText] = useState({
    title: "",
    text: "",
  });
  useEffect(() => {
    getPostData();
  }, []);
  const getPostData = async () => {
    let data = await handelGetData(AppUrl.eventList);
    setEventData(data);
  };

  const [greeting, setGreeting] = useState("");

  const cardData = [
    {
      text: t("cardOne"),
      Url: "https://elamigodetodosandpueblo.com/wp-content/uploads/2024/05/1.png",
    },
    {
      text: t("cardTwo"),
      Url: "https://elamigodetodosandpueblo.com/wp-content/uploads/2024/05/2.png",
    },
    {
      text: t("cardThree"),
      Url: "https://elamigodetodosandpueblo.com/wp-content/uploads/2024/05/3.png",
    },
    {
      text: t("cardFour"),
      Url: "https://elamigodetodosandpueblo.com/wp-content/uploads/2024/05/4.png",
    },
  ];

  useEffect(() => {
    console.log(language);
    const determineTimeOfDay = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 5 && currentHour < 12) {
        return language == "es" ? "Buen día" : "Good Morning";
      } else if (currentHour >= 12 && currentHour < 17) {
        return language == "es" ? "Buenas tardes" : "Good Afternoon";
      } else if (currentHour >= 17 && currentHour < 20) {
        return language == "es" ? "Buenas noches" : "Good Evening";
      } else {
        return language == "es" ? "Buenas noches" : "Good Night";
      }
    };

    const getLocationAndGreet = async () => {
      try {
        const timeOfDay = determineTimeOfDay();
        setGreeting(`${timeOfDay}!`);
      } catch (error) {
        console.error("Error getting location:", error);
      }
    };
    getLocationAndGreet();
  }, [language]);

  const openLink = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };

  return (
    <>
      <CustomeHead isBack={false} />
      <ScrollView style={styles.container}>
        <View style={{ marginBottom: 20, paddingTop: 20 }}>
          <View>
            <Text
              style={{
                color: "#011560",
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              {t("Hello")} !
            </Text>
            <Text
              style={{
                color: "#8F9AB0",
                fontSize: 13,
                fontWeight: "300",
              }}
            >
              {greeting}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("appoinments")}
              activeOpacity={0.7}
              style={{
                width: "50%",
                height: 50,
                backgroundColor: "#CDD8FF",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                marginTop: 10,
              }}
            >
              <Animatable.Text
                iterationCount="infinite"
                animation="bounceIn"
                duration={1950}
                style={{ color: "#011560", fontSize: 16, fontWeight: "600" }}
              >
                {t("MakeAppoinment")}
              </Animatable.Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              height: 150,
              width: "100%",
              borderRadius: 10,
              marginTop: 50,
              flexDirection: "row-reverse",
              borderWidth: 0.5,
              borderColor: "#CDD8FF",
            }}
          >
            <Animatable.View
              style={{ width: "40%" }}
              delay={100}
              duration={1950}
            >
              <Image
                source={require("../../asset/image/drMain.png")}
                style={{
                  width: 137,
                  height: 200,
                  position: "absolute",
                  top: -52,
                  borderBottomRightRadius: 10,
                }}
              />
            </Animatable.View>
            <View style={{ width: "60%", paddingTop: 20, paddingLeft: 10 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: "#011560",
                  fontWeight: "900",
                }}
              >
                {t("Meet the thought leader of the next generation")}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  color: "#011560",
                  fontWeight: "300",
                  marginTop: 7,
                }}
              >
                {t("Member of parliament – ​​Guatemala")}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: 100,
                  position: "absolute",
                  bottom: 10,
                  left: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    openLink("https://www.facebook.com/marvinelamigodetodos/")
                  }
                >
                  <AntDesign
                    name="facebook-square"
                    size={20}
                    color={"#011560"}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => openLink("https://www.instagram.com")}
                >
                  <AntDesign name="instagram" size={20} color={"#011560"} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => openLink("https://x.com/Orel22074Marvin")}
                >
                  <AntDesign name="twitter" size={20} color={"#011560"} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.cardContainer, { marginTop: 50 }]}>
          <View
            activeOpacity={1}
            // onPress={() => {
            //   setFocuseCard('edu');
            //   setSortText({
            //     title: t('Education system'),
            //     text: t('eduSort'),
            //   });
            //   setOpenSheet(true);
            // }}
            style={[
              focuseCard === "edu" ? styles.cardActive : styles.card,
              { top: -20 },
            ]}
          >
            <View style={styles.iconContainer}>
              {focuseCard === "edu" ? (
                <Image source={require("../../asset/icon/edu.png")} />
              ) : (
                <Image source={require("../../asset/icon/edu1.png")} />
              )}
            </View>
            <Text
              style={[
                styles.cardTitle,
                { color: focuseCard === "edu" ? "#fff" : "#011560" },
              ]}
            >
              {t("Education system")}
            </Text>
          </View>

          <View
            activeOpacity={1}
            // onPress={() => {
            //   setFocuseCard('cli');
            //   setSortText({
            //     title: t('Climate change'),
            //     text: t('Climatechange'),
            //   });
            //   setOpenSheet(true);
            // }}
            style={[focuseCard === "cli" ? styles.cardActive : styles.card]}
          >
            <View style={styles.iconContainer}>
              {focuseCard === "cli" ? (
                <Image source={require("../../asset/icon/climet1.png")} />
              ) : (
                <Image source={require("../../asset/icon/climet.png")} />
              )}
            </View>
            <Text
              style={[
                styles.cardTitle,
                { color: focuseCard === "cli" ? "#fff" : "#011560" },
              ]}
            >
              {t("Climate change")}
            </Text>
          </View>
        </View>
        <View style={styles.cardContainer}>
          <View
            // onPress={() => {
            //   setFocuseCard('health');
            //   setSortText({
            //     title: t('Health and Medicine'),
            //     text: t('Health'),
            //   });
            //   setOpenSheet(true);
            // }}
            style={[
              focuseCard === "health" ? styles.cardActive : styles.card,
              { top: -20 },
            ]}
          >
            <View style={styles.iconContainer}>
              {focuseCard === "health" ? (
                <Image source={require("../../asset/icon/healt1.png")} />
              ) : (
                <Image source={require("../../asset/icon/healt.png")} />
              )}
            </View>
            <Text
              style={[
                styles.cardTitle,
                { color: focuseCard === "health" ? "#fff" : "#011560" },
              ]}
            >
              {t("Health and Medicine")}
            </Text>
          </View>

          <View
            // activeOpacity={1}
            // onPress={() => {
            //   setFocuseCard('public');
            //   setSortText({
            //     title: t('public transportation'),
            //     text: t('Public'),
            //   });
            //   setOpenSheet(true);
            // }}
            style={[focuseCard === "public" ? styles.cardActive : styles.card]}
          >
            <View style={styles.iconContainer}>
              {focuseCard === "public" ? (
                <Image source={require("../../asset/icon/public1.png")} />
              ) : (
                <Image source={require("../../asset/icon/public.png")} />
              )}
            </View>
            <Text
              style={[
                styles.cardTitle,
                { color: focuseCard === "public" ? "#fff" : "#011560" },
              ]}
            >
              {t("public transportation")}
            </Text>
          </View>
        </View>
        <View>
          <CustomYoutubePlayer videoId="u3JbiOCBUXs" />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#011560",
              fontSize: 15,
              fontWeight: "600",
              marginBottom: 20,
            }}
          >
            {t("Events")}
          </Text>
          {/* <TouchableOpacity
            style={{
              backgroundColor: '#011560',
              paddingHorizontal: 20,
              paddingVertical: 10,
              justifyContent: 'center',
              alignContent: 'center',
              borderRadius: 10,
            }}>
            <Text style={{color: '#fff'}}>See All</Text>
          </TouchableOpacity> */}
        </View>
        <View>
          {Array.isArray(eventData) &&
            eventData.map((item, index) => (
              <EventCard index={index} item={item} key={index} />
            ))}
        </View>
        <View>
          <Text style={{ color: "#000", fontSize: 20, fontWeight: 800 }}>
            {t("cardHead")}
          </Text>
          <Text style={{ color: "#000", fontSize: 14, fontWeight: 400 }}>
            {t("cardSubHead")}
          </Text>
        </View>
        <ScrollView style={{ flex: 1 }} horizontal>
          <View style={{ flexDirection: "row", marginVertical: 30 }}>
            {cardData.map((item, index) => (
              <BottomCard key={index} data={item} />
            ))}
          </View>
        </ScrollView>
      </ScrollView>
      <BottomSheetCustom
        isOpen={openSheet}
        setIsOpen={setOpenSheet}
        title={sortText?.title}
        index={openSheet ? 0 : -1}
      >
        <View style={{ height: 150, width: "100%" }}>
          <Text style={{ color: "#000" }}>{sortText?.text}</Text>
        </View>
      </BottomSheetCustom>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    paddingHorizontal: 20,
  },
  card: {
    width: "47%",
    height: 160,
    padding: 5,
    backgroundColor: "#F2F5FF",
    elevation: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 1,
  },
  cardActive: {
    width: "47%",
    height: 160,
    padding: 5,
    backgroundColor: "#011560",
    elevation: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 1,
  },
  cardContent: {
    color: "#000",
    fontSize: 10,
    width: "100%",
    textAlign: "justify",
  },
  cardTitle: {
    color: "#011560",
    fontSize: 15,
    fontWeight: "600",
  },
  iconContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  cardContainer: {
    width: "100%",
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
  },
});
