// In App.js in a new project
import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';
import Home from '../page/Home/Home';
import About from '../page/about/About';
import Gallery from '../page/gallary/Gallery';
import Blog from '../page/blog/Blog';
import Profile from '../page/profile/Profile';
import '../utility/i18n';
import {useTranslation} from 'react-i18next';
import {RootContext} from '../context/RootContextProvider';

const Tabbutton = props => {
  const {language, setLanguage} = React.useContext(RootContext);
  const {t, i18n} = useTranslation();
  const {onPress, icon, header} = props;
  const focused = props.accessibilityState.selected;
  const viewRef = React.useRef(null);
  React.useEffect(() => {
    if (focused) {
      viewRef.current.animate({
        0: {scale: 1.5, translateX: 0},
        1: {scale: 1.2, translateX: -10},
      });
    } else {
      viewRef.current.animate({
        0: {scale: 1.2, translateX: -10},
        1: {scale: 1, translateX: 0},
      });
    }
  }, [focused]);
  // console.log(focused);
  return (
    <TouchableOpacity
      style={focused ? styles.tabContainerActive : styles.tabContainer}
      onPress={onPress}
      activeOpacity={1}>
      <View>
        <Animatable.View
          ref={viewRef}
          duration={700}
          style={focused ? styles.activeTab : styles.tab}>
          <AntDesign
            name={icon}
            size={focused ? 14 : 20}
            color={!focused ? '#ffffff' : '#011560'}
          />
          {focused && (
            <Text
              style={{
                fontSize: 10,
                color: '#011560',
                fontWeight: '400',
                paddingLeft: 5,
              }}>
              {header}
            </Text>
          )}
        </Animatable.View>
      </View>
    </TouchableOpacity>
  );
};

const Tab = createBottomTabNavigator();

export default function Routes() {
  const {language, setLanguage} = React.useContext(RootContext);
  const {t, i18n} = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#011560',
          height: 100,
          paddingHorizontal: 10,
          // position: 'absolute',
          // bottom: 16,
          // right: 16,
          // left: 16,
          // borderRadius: 50,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, focused}) => (
            <AntDesign name="home" size={20} color="#900" />
          ),
          tabBarButton: props => (
            <Tabbutton
              {...props}
              icon="home"
              header={language == 'es' ? 'Hogar' : 'Home'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={About}
        options={{
          tabBarIcon: ({color, focused}) => (
            <AntDesign name="user" size={25} color="#900" />
          ),
          tabBarButton: props => (
            <Tabbutton
              {...props}
              icon="user"
              header={language == 'es' ? 'Acerca de' : 'About'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Gallery"
        component={Gallery}
        options={{
          tabBarIcon: ({color, focused}) => (
            <AntDesign name="picture" size={25} color="#900" />
          ),
          tabBarButton: props => (
            <Tabbutton
              {...props}
              icon="picture"
              header={language == 'es' ? 'Galería' : 'Gallery'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="blog"
        component={Blog}
        options={{
          tabBarIcon: ({color, focused}) => (
            <AntDesign name="profile" size={25} color="#900" />
          ),
          tabBarButton: props => (
            <Tabbutton
              {...props}
              icon="profile"
              header={language == 'es' ? 'Blog' : 'Blog'}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color, focused}) => (
            <AntDesign name="appstore-o" size={25} color="#900" />
          ),
          tabBarButton: props => (
            <Tabbutton {...props} icon="appstore-o" header="Profile" />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  tabContainerActive: {
    paddingHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 6,
    marginHorizontal: 6,
    paddingLeft: 20,
    height: 50,
  },

  activeTab: {
    // paddingHorizontal: 5,
    padding: 2,
    borderColor: '#011560',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderWidth: 2,
    // transform: [{ translateY: -10 }]
    // bottom: 10,
  },
  tab: {
    backgroundColor: '#011560',
    borderColor: '#ffffff',
    padding: 5,
    borderRadius: 50,
  },
});
