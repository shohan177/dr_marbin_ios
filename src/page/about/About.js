import React, {useContext} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import CustomeHead from '../../component/CustomeHead';
import CustomYoutubePlayer from '../../component/CustomYoutubePlayer';
import WebView from 'react-native-webview';
import {RootContext} from '../../context/RootContextProvider';
import '../../utility/i18n';
import {useTranslation} from 'react-i18next';

const About = () => {
  const {language, setLanguage} = useContext(RootContext);
  const {t, i18n} = useTranslation();

  const email = 'marvin_orellana7@hotmail.com';
  const subject = 'Make appointment from mobile app';
  const body = '';

  const phoneNumber = '+50240067384';

  // Function to handle button press and open the phone dialer
  const handlePressCall = () => {
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch(err =>
      console.error('Error opening dialer', err),
    );
  };

  // Function to handle button press and open mail client
  const handlePress = () => {
    const url = `mailto:${email},
    )}&body=${encodeURIComponent(body)}`;
    Linking.openURL(url).catch(err =>
      console.error('Error opening mail client', err),
    );
  };

  const handlePressForMap = () => {
    const latitude = 15.722849;
    const longitude = -90.2348;
    const placeId = '0x8588135036e7506b:0x35982b375b84d5bb';
    const label = 'Guatemala';

    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}&query_place_id=${encodeURIComponent(
      placeId,
    )}`;
    Linking.openURL(url).catch(err =>
      console.error('Error opening Google Maps', err),
    );
  };
  return (
    <View style={styles.container}>
      <CustomeHead title={language == 'es' ? 'Acerca de' : 'About'} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageBackgroundContainer}>
          <ImageBackground
            source={require('../../asset/image/meet-cover.png')}
            style={styles.imageBackground}
            resizeMode="cover"
            accessibilityLabel="Background image of the cover">
            <View style={styles.imageOverlay}>
              <Text style={styles.mainTitle} accessibilityRole="header">
                {t('Meet Dr. Marvin Orellana')}
              </Text>
            </View>
          </ImageBackground>
          <Image
            source={require('../../asset/image/About-Marvin.png')}
            style={styles.imgContainer}
            accessibilityLabel="Image of Dr. Marvin Orellana"
          />
          <View style={styles.aboutContainer}>
            <Text style={styles.AboutTitle}>
              {t('Meet the thought leader of the next generation')}
            </Text>
            <Text style={styles.AboutSubTitle}>
              {t('Member of parliament – ​​Guatemala')}
            </Text>
            <Text style={styles.AboutContent}>{t('about.content')}</Text>
            <Text style={styles.VideoTitle}>
              {t('Learn more about Dr. Marvin')}
            </Text>
            <Text style={styles.VideoSubTitle}>
              {t('We will make our country a better place')}
            </Text>
            <CustomYoutubePlayer videoId="YZYz0G0A4Ds" />
            <Text style={styles.VideoTitle}>{t('Get In Touch')}</Text>
            <View style={styles.contactContainer}>
              <View>
                <View style={{width: '100%', marginBottom: 5}}>
                  <TouchableOpacity
                    style={[styles.card, {width: '100%'}]}
                    onPress={handlePress}>
                    <View style={styles.iconContainer}>
                      <Image source={require('../../asset/icon/mail.png')} />
                    </View>
                    <Text style={styles.cardTitle}>{t('E-MAIL')}</Text>
                    <Text style={styles.cardSubTitle}>
                      marvin_orellana7@hotmail.com
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <TouchableOpacity
                    style={styles.card}
                    onPress={handlePressCall}>
                    <View style={styles.iconContainer}>
                      <Image source={require('../../asset/icon/call.png')} />
                    </View>
                    <Text style={styles.cardTitle}>{t('CONTACT NUMBER')}</Text>
                    <Text style={styles.cardSubTitle}>+50240067384</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.card}
                    onPress={handlePressForMap}>
                    <View style={styles.iconContainer}>
                      <Image
                        source={require('../../asset/icon/location.png')}
                      />
                    </View>
                    <Text style={styles.cardTitle}>{t('OFFICE')}</Text>
                    <Text style={styles.cardSubTitle}>Guatemala</Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    width: '100%',
                    height: 250,
                    marginTop: 5,
                    borderRadius: 15,
                    overflow: 'hidden',
                    backgroundColor: '#fff',
                    elevation: 2,
                  }}>
                  <WebView
                    source={{
                      html: `<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1966353.566078981!2d-90.2348!3d15.722849000000002!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8588135036e7506b%3A0x35982b375b84d5bb!2sGuatemala!5e0!3m2!1sen!2sus!4v1718000017226!5m2!1sen!2sus" width="100%" height="100%" frameborder="0" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
                    }}
                    style={{width: '100%', padding: 0, margin: 0}}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={{height: 150, width: '100%'}}></View>
        </View>
      </ScrollView>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  aboutContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    paddingHorizontal: 20,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  imageBackgroundContainer: {
    width: '100%',
  },
  imageBackground: {
    height: 200,
    width: '100%',
  },
  imageOverlay: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#00000041',
  },
  mainTitle: {
    fontSize: 25,
    color: '#fff',
    fontWeight: '800',
    textAlign: 'center',
  },
  imgContainer: {
    marginTop: -65,
    height: 150,
    width: 150,
    borderRadius: 125,
    alignSelf: 'center',
  },
  AboutTitle: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  AboutSubTitle: {
    fontSize: 12,
    color: '#000',
    fontWeight: '500',
  },
  AboutContent: {
    fontSize: 12,
    color: '#000',
    fontWeight: '300',
    top: 10,
    textAlign: 'justify',
  },
  VideoTitle: {
    fontSize: 16,
    color: '#000',
    marginTop: 15,
    fontWeight: '500',
    textAlign: 'center',
  },
  VideoSubTitle: {
    fontSize: 12,
    marginBottom: 15,
    color: '#000',
    fontWeight: '500',
    textAlign: 'center',
  },
  contactContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  card: {
    width: '49%',
    height: 160,
    padding: 5,
    backgroundColor: '#F2F5FF',
    elevation: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  cardTitle: {
    color: '#011560',
    fontSize: 10,
    fontWeight: '300',
    marginBottom: 5,
  },
  cardSubTitle: {
    color: '#011560',
    fontSize: 10,
    fontWeight: '600',
  },
});
