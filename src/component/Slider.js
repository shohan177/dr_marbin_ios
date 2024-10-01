import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  Text,
} from 'react-native';

const {width} = Dimensions.get('window');

const images = [
  'https://www.simplilearn.com/ice9/free_resources_article_thumb/html_image_slider.jpg',
  'https://soliloquywp.com/wp-content/uploads/2017/10/fullwidth-image-slider-in-wordpress.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5UsbS-Cqd7Z1uVtf8NAagWWdZJXCkG0cLbzc6kOs7dHXAsXwFtuWHVLQEbns9Q49DpBA&usqp=CAU',
  // Add more images as needed
];

const Slider = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(nextIndex);
      flatListRef.current.scrollToIndex({animated: true, index: nextIndex});
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  const renderItem = ({item}) => (
    <View style={styles.imageContainer}>
      <View
        style={{
          position: 'absolute',
          zIndex: 999,
          left: 10,
          bottom: 10,
          width: '70%',
          backgroundColor: '#00000049',
          padding: 10,
          borderRadius: 10,
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 25,
            fontWeight: '700',
            elevation: 8,
          }}>
          Monjas Jalapa para
        </Text>
        <Text style={{color: '#fff', fontSize: 12, fontWeight: '700'}}>
          Luego de completar su escuela primaria en la Escuela Pública Rural
          Mixta “Llano Grande” de Monjas Jalapa, Marvin pasó a la Escuela
          Clemente Marroquín Rojas de Monjas Jalapa para completar su educación
          secundaria.
        </Text>
      </View>
      <Image source={{uri: item}} style={styles.image} />
    </View>
  );

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScrollToIndexFailed={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: 200, // Adjust height as needed
    resizeMode: 'cover',
  },
});

export default Slider;
