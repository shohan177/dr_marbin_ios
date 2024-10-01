import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/Entypo';
import AppUrl from '../restApi/AppUrl';
import useSendRequest from '../customeHelper/useSendRequest';
import {useNavigation} from '@react-navigation/native';

const BlogCard = ({item}) => {
  const {handelGetData, formatDate, loading} = useSendRequest();
  const [imageData, setImageData] = useState();
  const navigation = useNavigation();
  useEffect(() => {
    getImagePath();
    // console.log(item);
  }, []);

  const getImagePath = async () => {
    let data = await handelGetData(AppUrl.getImageUrl + item?.featured_media);
    setImageData(data);
  };

  const handleBlogCardPress = () => {
    navigation.navigate('blogDetails', {
      item: item,
      imageData: imageData,
      title: 'Blog Details',
    });
  };

  return (
    <TouchableOpacity
      onPress={handleBlogCardPress}
      // onPress={() =>navigation.navigate("blogDetails", { item })}
      style={{
        backgroundColor: '#fff',
        width: '100%',
        padding: 20,
        borderRadius: 10,
        marginVertical: 10,
        elevation: 2,
      }}>
      <View style={{width: '100%', height: 160, backgroundColor: '#fcfcfc'}}>
        {imageData?.media_details?.sizes?.medium?.source_url && (
          <Image
            source={{
              uri: imageData?.media_details?.sizes?.medium?.source_url,
            }}
            style={{width: '100%', height: 160, borderRadius: 10}}
          />
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: 170,
          marginTop: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <AntDesign name="clockcircleo" size={14} color={'#000'} />
          <Text style={{color: '#000', fontSize: 12}}>
            {' '}
            {formatDate(item?.date)}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <EvilIcons name="location" size={14} color={'#000'} />
          <Text style={{color: '#000', fontSize: 12}}> ​​Guatemala</Text>
        </View>
      </View>
      <Text
        style={{
          color: '#000',
          fontSize: 15,
          width: '100%',
          fontWeight: '600',
          paddingTop: 5,
        }}>
        {item?.title?.rendered}
      </Text>
    </TouchableOpacity>
  );
};

export default BlogCard;

const styles = StyleSheet.create({});
