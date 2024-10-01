import React, {useState, useRef, useCallback, useEffect} from 'react';
import {View, FlatList, Text, TouchableOpacity, StyleSheet} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

export const VideoPlayer = ({index, focusedIndex, item}) => {
  const [playing, setPlaying] = useState(false);

  let parts = item?.href.split('/');
  let videoId = parts.slice(-1)[0];

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  useEffect(() => {
    setPlaying(index === focusedIndex);
  }, [focusedIndex]);

  return (
    <YoutubePlayer
      height={230}
      width={'100%'}
      play={playing}
      videoId={videoId}
      onChangeState={onStateChange}
    />
  );
};

const data = [
  {id: '1', title: 'Item 1'},
  {id: '1', title: 'Item 1'},
  {id: '1', title: 'Item 1'},
  {id: '1', title: 'Item 1'},
  {id: '1', title: 'Item 1'},
  {id: '1', title: 'Item 1'},
  {id: '1', title: 'Item 1'},
  {id: '1', title: 'Item 1'},
  {id: '1', title: 'Item 1'},
];

const FlatListCom = ({dataArray}) => {
  const [focusedIndex, setFocusedIndex] = useState(null);
  const flatListRef = useRef(null);

  const handleFocus = index => {
    setFocusedIndex(index);
    flatListRef.current.scrollToIndex({animated: true, index: index});
  };

  // useEffect(() => {
  //   focusedIndex === index ? setPlaying(true) : setPlaying(true);
  // }, [focusedIndex]);

  const renderItem = ({item, index}) => (
    <TouchableOpacity onPress={() => handleFocus(index)}>
      <View
        style={[
          styles.itemContainer,
          focusedIndex === index && styles.focusedItem,
        ]}>
        <VideoPlayer index={index} focusedIndex={focusedIndex} item={item} />
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      ref={flatListRef}
      data={dataArray}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      extraData={focusedIndex}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 5,
    backgroundColor: '#fff',
    borderBottomColor: '#ccc',
  },
  focusedItem: {
    backgroundColor: '#0000005b',
  },
  itemText: {
    color: '#000',
  },
});

export default FlatListCom;
