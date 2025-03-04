import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import useSendRequest from "../../customeHelper/useSendRequest";
import AppUrl from "../../restApi/AppUrl";
import CustomeHead from "../../component/CustomeHead";
import Loader from "../../component/Loader";
import ImageViewing from "react-native-image-viewing";
import { RootContext } from "../../context/RootContextProvider";
import { CustomModal } from "../../component/CustomeModal";
import FlatListCom from "../../component/FlatListCom";
import Container from "../../component/container/Container";

const Gallery = () => {
  const { language, setLanguage } = useContext(RootContext);
  const [postData, setPostData] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const { handelGetData, loading } = useSendRequest();
  const [selectedTab, setSelectedTab] = useState("photo");
  useEffect(() => {
    getPostData();

    return () => {
      setPostData([]);
      setVideoData([]);
    };
  }, []);

  const getPostData = async () => {
    let data = await handelGetData(AppUrl.gallaryPageVideo);
    if (data?.img) {
      setPostData(data?.img);
    }
    if (data?.video) {
      setVideoData(data?.video);
    }
  };

  //img-Modal
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index) => {
    setCurrentIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const [modal, setModal] = useState(false);

  const openVideoModal = () => {
    setModal(true);
  };

  const closeVideoModal = () => {
    setModal(false);
  };

  return (
    <Container>
      {loading && <Loader />}
      <CustomeHead title={language == "es" ? "Gallario" : "Gallary"} />
      <View style={styles.container}>
        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => setSelectedTab("photo")}>
            <Text
              style={[
                styles.tabText,
                selectedTab === "photo" && styles.selectedTabText,
              ]}
            >
              {language == "es" ? "Galería de fotos" : "Photo Gallery"}
            </Text>
            {selectedTab === "photo" && <View style={styles.underline} />}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setSelectedTab("video");
            }}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === "video" && styles.selectedTabText,
              ]}
            >
              {language == "es" ? "Galeria de VIDEOS" : "Video Gallery"}
            </Text>
            {selectedTab === "video" && <View style={styles.underline} />}
          </TouchableOpacity>
        </View>
      </View>
      <View>
        {selectedTab === "photo" ? (
          <ScrollView>
            <View style={{ paddingBottom: 200 }}>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  paddingBottom: 150,
                }}
              >
                {postData.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => openModal(index)}
                  >
                    <Image
                      source={{ uri: item?.url }}
                      key={index}
                      style={{
                        height: 210,
                        width: 156,
                        margin: 10,
                        borderRadius: 10,
                      }}
                      //, marginTop: index % 2 !== 0 ? -100 : 0
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        ) : (
          <View style={{ paddingBottom: 200 }}>
            <FlatListCom dataArray={videoData} />
          </View>
        )}
      </View>
      <ImageViewing
        images={postData.map((item) => ({ uri: item?.url }))}
        imageIndex={currentIndex}
        visible={isModalVisible}
        onRequestClose={closeModal}
      />

      <CustomModal visible={modal} onClose={closeVideoModal} />
    </Container>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  tabContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  tabText: {
    fontWeight: "bold",
    marginRight: 20,
    fontSize: 14,
    color: "#8c8c8c",
  },
  selectedTabText: {
    color: "#000",
  },
  underline: {
    height: 2,
    backgroundColor: "#000",
    marginTop: 2,
    alignSelf: "left",
    width: "30%",
  },
});
