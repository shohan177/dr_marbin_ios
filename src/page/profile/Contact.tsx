import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Linking,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { WebView } from "react-native-webview";
import Toast from "react-native-simple-toast";
import { ActivityIndicator } from "react-native";
import useSendRequest from "../../customeHelper/useSendRequest";
import CustomeHead from "../../component/CustomeHead";
import Container from "../../component/container/Container";

const Contact = () => {
  const [message, setMessage] = useState("");
  const { handelPostData } = useSendRequest();

  const handleSendMessage = async () => {
    if (message.length === 0) {
      Toast.show("Message field required !", 1);

      return;
    }

    const data = {
      type: "contact",
      title: "form contact page",
      description: message,
    };

    const response = await handelPostData(
      "https://api.megabusinessusa.com/public/api/my-listing-request",
      data
    );

    if (response?.status == 201) {
      setMessage("");
      Toast.show("Message send successfully", 1);
    }
  };

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <Container>
      <CustomeHead title={"Contact"} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={{ backgroundColor: "#fff" }}>
          <View style={styles.container}>
            <View style={styles.mapContainer}>
              <WebView
                source={{
                  html: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3051491.9432545407!2d-95.45678357996222!3d15.995366543130926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8588135036e7506b%3A0x35982b375b84d5bb!2sGuatemala!5e1!3m2!1sen!2sus!4v1740244371956!5m2!1sen!2sus" width="1300" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
                }}
                style={styles.map}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                scalesPageToFit={true}
              />
            </View>

            <View style={styles.contactInfo}>
              <Text style={styles.heading}></Text>
              <Text style={styles.heading}>Contact</Text>
              <Text style={styles.text}>📍 Guatemala</Text>
              <Text style={styles.text}>📞 +50240067384</Text>
              <Text
                style={styles.text}
                onPress={() => openLink("mailto:sublimeproinc@gmail.com")}
              >
                ✉️ marvin_orellana7@hotmail.com
              </Text>
            </View>

            {/* <View style={styles.contactForm}>
              <Text style={styles.heading}>Contact us</Text>

              <TextInput
                style={styles.textarea}
                placeholder="Message"
                multiline={true}
                onChangeText={(text) => setMessage(text)}
                value={message}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={handleSendMessage}
              >
                {false ? (
                  <ActivityIndicator color={"#fff"} />
                ) : (
                  <Text style={styles.buttonText}>Send Message</Text>
                )}
              </TouchableOpacity>
            </View> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  mapContainer: {
    height: 150,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
  },
  map: {
    width: Dimensions.get("window").width - 32,
    height: 200,
  },
  contactInfo: {
    marginBottom: 14,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
  },
  socialIcons: {
    flexDirection: "row",
    marginTop: 8,
  },
  icon: {
    fontSize: 20,
    marginHorizontal: 8,
  },
  contactForm: {
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    fontSize: 16,
  },
  textarea: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    height: 100,
    textAlignVertical: "top",
    marginBottom: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
