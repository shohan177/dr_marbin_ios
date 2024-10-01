import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/Entypo';
import useSendRequest from '../customeHelper/useSendRequest';
import AppUrl from '../restApi/AppUrl';
import { useNavigation } from '@react-navigation/native';

const EventCard = ({item, index}) => {
  const {handelGetData, formatDate, loading} = useSendRequest();
  const [imageData, setImageData] = useState();
  useEffect(() => {
    getImagePath();
  }, []);

  const getImagePath = async () => {
    let data = await handelGetData(AppUrl.getImageUrl + item?.featured_media);
    setImageData(data);
  };

  const navigation = useNavigation();
  const handleBlogCardPress = () => {
    navigation.navigate("blogDetails", {item: item, imageData: imageData,title:'Event Details'});
  };

  return (

    <TouchableOpacity
    onPress={handleBlogCardPress}
      style={[
        styles.EventCardContainer,
        {flexDirection:'row',marginLeft:10,paddingBottom:20},
        ]}>
      <View style={{width: '50%',paddingLeft:10}}>
          <View style={{height:15,width:15,backgroundColor:'#D0DAFF',borderRadius:50,left:-8,position:'absolute',zIndex:9}}/>
        
      
        <Text style={{color:'#212529',fontSize:14,marginBottom:20, marginLeft:15}}>Jan 13 - Jan 23 </Text>


        {imageData?.media_details?.sizes?.medium?.source_url && (
          <Image
            source={{
              uri: imageData?.media_details?.sizes?.medium?.source_url,
            }}
            style={{width: '100%', height: 120,borderRadius:10}}
          />
        )}
      </View>
      <View style={{width: '50%', paddingLeft: 10}}>
        <Text style={{color: '#000', fontSize: 15, fontWeight: '300'}}>
          {item?.title?.rendered}
        </Text>
        <View>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <AntDesign name="clockcircleo" size={14} color={'#000'} />
            <Text style={{color: '#000', fontSize: 12}}> 25/05/2024</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 2}}>
            <EvilIcons name="location" size={14} color={'#000'} />
            <Text style={{color: '#000', fontSize: 12}}> ​​Guatemala</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>

  );
};

export default EventCard;

const styles = StyleSheet.create({
  EventCardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth:1,
    // marginVertical: 20,
    // borderBottomWidth: 1,
    // borderStyle: 'dashed',
    // paddingBottom: 10,
    borderColor: '#D0DAFF',
  },
});
