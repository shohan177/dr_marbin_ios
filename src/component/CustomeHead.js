import {StyleSheet, Text, TouchableOpacity, View, Platform} from 'react-native';
import React, {useContext} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import SimpleLineIcons from 'react-native-vector-icons/Feather';
import '../utility/i18n';
import {useTranslation} from 'react-i18next';
import {RootContext} from '../context/RootContextProvider';

const emojisWithIcons = [{title: 'Spanish'}, {title: 'English'}];

const CustomeHead = ({title, isBack = true}) => {
  const {language, setLanguage} = useContext(RootContext);
  const navigation = useNavigation();
  const {t, i18n} = useTranslation();

  return (
    <View
      style={[
        {
          width: '100%',
          backgroundColor: '#fff',
          elevation: 3,
          zIndex: 9,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        },
        // Platform.OS === 'ios' && { marginTop: 60 },
        Platform.OS === 'ios' && {padding: 6},
      ]}>
      <View
        style={[
          {flexDirection: 'row', width: '60%'},
          Platform.OS === 'ios' && {marginTop: 50},
        ]}>
        {isBack && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{width: 50, justifyContent: 'center', alignItems: 'center'}}>
            <AntDesign name="arrowleft" size={20} color={'#000'} />
          </TouchableOpacity>
        )}

        <Text
          style={{
            color: '#000',
            fontSize: 20,
            fontWeight: '700',
            paddingVertical: 10,
          }}>
          {title}
        </Text>
      </View>

      <View style={[{width: '35%'}, Platform.OS === 'ios' && {marginTop: 50}]}>
        <SelectDropdown
          data={emojisWithIcons}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
            const newLanguage = selectedItem.title == 'Spanish' ? 'es' : 'en';
            setLanguage(newLanguage);
            i18n.changeLanguage(newLanguage);
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <SimpleLineIcons
                  color={'#011560'}
                  name={'globe'}
                  style={styles.dropdownButtonIconStyle}
                />

                <Text style={styles.dropdownButtonTxtStyle}>
                  {(selectedItem && selectedItem.title) || 'Spanish'}
                </Text>
                <AntDesign name="down" size={16} color="#011560" />
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View
                style={{
                  ...styles.dropdownItemStyle,
                  ...(isSelected && {backgroundColor: '#D2D9DF'}),
                }}>
                <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />
      </View>
    </View>
  );
};

export default CustomeHead;

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: 110,
    height: 35,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderWidth: 0.5,
    borderColor: '#011560',
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '300',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 16,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '400',
    color: '#011560',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
