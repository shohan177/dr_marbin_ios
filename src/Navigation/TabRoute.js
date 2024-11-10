// In App.js in a new project
import * as React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from "react-native-vector-icons/AntDesign";
import About from "../page/about/About";
import Gallery from "../page/gallary/Gallery";
import "../utility/i18n";
import { useTranslation } from "react-i18next";
import { RootContext } from "../context/RootContextProvider";
import Dashboard from "../page/dashboard/Dashboard";

const Tabbutton = (props) => {
  const { t, i18n } = useTranslation();
  const { onPress, icon } = props;

  return (
    <TouchableOpacity
      style={styles.tabContainer}
      onPress={onPress}
      activeOpacity={1}
    >
      <View>
        <View>
          <AntDesign name={icon} size={25} color={"#ffffff"} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Tab = createBottomTabNavigator();

export default function Routes() {
  const { language, setLanguage } = React.useContext(RootContext);
  const { t, i18n } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#011560",
          paddingHorizontal: 10,
          position: "absolute",
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 50,
          paddingBottom: 0,
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="home" size={20} color="#ffffff" />
          ),
          tabBarButton: (props) => (
            <Tabbutton
              {...props}
              icon="home"
              header={language == "es" ? "Hogar" : "Home"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={About}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="user" size={25} color="#900" />
          ),
          tabBarButton: (props) => (
            <Tabbutton
              {...props}
              icon="user"
              header={language == "es" ? "Acerca de" : "About"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Gallery"
        component={Gallery}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="picture" size={25} color="#900" />
          ),
          tabBarButton: (props) => (
            <Tabbutton
              {...props}
              icon="picture"
              header={language == "es" ? "Galería" : "Gallery"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  tabContainerActive: {
    paddingHorizontal: 10,
    borderRadius: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 6,
    marginHorizontal: 6,
    paddingLeft: 20,
  },

  activeTab: {
    // paddingHorizontal: 5,
    padding: 2,
    borderColor: "#011560",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // borderWidth: 2,
    // transform: [{ translateY: -10 }]
    // bottom: 10,
  },
  tab: {
    backgroundColor: "#011560",
    borderColor: "#ffffff",
    padding: 5,
    borderRadius: 50,
  },
});
