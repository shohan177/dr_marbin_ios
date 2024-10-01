import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import CustomeHead from '../../component/CustomeHead';
import {Parser} from 'htmlparser2';
import useSendRequest from '../../customeHelper/useSendRequest';
import { RootContext } from '../../context/RootContextProvider';

const BlogDetails = ({route}) => {
  const {
    language,
    setLanguage,
  } = useContext(RootContext);
    const {formatDate, loading} = useSendRequest();
  const {item, imageData,title} = route.params;
  const {width} = useWindowDimensions();
  const stripHtmlTags = htmlString => {
    let textContent = '';
    let isStyleTag = false;
    

    const parser = new Parser({
      onopentag(name) {
        if (name === 'style') {
          isStyleTag = true;
        }
      },
      onclosetag(name) {
        if (name === 'style') {
          isStyleTag = false;
        }
      },
      ontext(text) {
        if (!isStyleTag) {
          textContent += text;
        }
      },
    });

    parser.write(htmlString);
    parser.end();

    return textContent.trim();
  };

  return (
    <View style={{flex:1,backgroundColor:'#fff'}}>
      <CustomeHead title={language == "es" ? "Detalles del blog": "Blog Details"} />
      <ImageBackground
        source={{
          uri: imageData?.media_details?.sizes?.medium?.source_url,
        }}
        style={styles.imageBackground}
        resizeMode="cover">
        <View style={styles.imageOverlay}>
          <Text style={styles.subtitle}>{formatDate(item?.date)}</Text>
          <Text style={styles.mainTitle}>{item?.title?.rendered}</Text>
        </View>
      </ImageBackground>
      <ScrollView style={styles.containArea}>
        <View style={styles.container}>
          <Text style={styles.content}>
            {stripHtmlTags(item?.content?.rendered)}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default BlogDetails;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    padding: 20,
  flex:1,
    // backgroundColor: '#000',
  },
  content:{
color: '#000',
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
    paddingHorizontal:10
  },
  mainTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '300',
  },
  containArea:{
    // padding: 20,
  
    top: -20,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
  },
});
