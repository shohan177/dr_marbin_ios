import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CustomeHead from "../../component/CustomeHead";
import BlogCard from "../../component/BlogCard";
import useSendRequest from "../../customeHelper/useSendRequest";
import AppUrl from "../../restApi/AppUrl";
import Loader from "../../component/Loader";
import "../../utility/i18n";
import { useTranslation } from "react-i18next";
import Container from "../../component/container/Container";

const Blog = () => {
  const { t, i18n } = useTranslation();
  const [postData, setPostData] = useState([]);
  const { handelGetData, loading } = useSendRequest();

  useEffect(() => {
    getPostData();
  }, []);

  const getPostData = async () => {
    const data = await handelGetData(AppUrl.bogList);
    setPostData(data);
  };

  return (
    <Container>
      {loading && <Loader />}
      <CustomeHead title="Blogs" />
      <ScrollView>
        <View style={styles.imageBackgroundContainer}>
          <ImageBackground
            source={require("../../asset/image/Guatemala-city.png")}
            // source={{
            //   uri: 'https://elamigodetodosandpueblo.com/wp-content/uploads/2022/10/Guatemala-city.png',
            // }}
            style={styles.imageBackground}
            resizeMode="cover"
          >
            <View style={styles.imageOverlay}>
              <Text style={styles.mainTitle}>{t("Recent Upload Blogs")}</Text>
              <Text style={styles.subtitle}>Dr. Marvin Orellana</Text>
            </View>
          </ImageBackground>
          <View style={styles.blogCardContainer}>
            {postData &&
              postData?.map((item, index) => (
                <BlogCard item={item} key={index} />
              ))}
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default Blog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageBackgroundContainer: {
    width: "100%",
  },
  imageBackground: {
    height: 200,
    width: "100%",
  },
  imageOverlay: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: "#00000041",
  },
  mainTitle: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "800",
  },
  subtitle: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "300",
  },
  blogCardContainer: {
    paddingHorizontal: 10,
    width: "100%",
    top: -50,
  },
});
