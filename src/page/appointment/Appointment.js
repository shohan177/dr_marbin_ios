import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import CustomeHead from "../../component/CustomeHead";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import useSendRequest from "../../customeHelper/useSendRequest";
import AppUrl from "../../restApi/AppUrl";
import { useToast } from "react-native-toast-notifications";
import SuccessSheet from "../../component/SuccessSheet";
import ModalComponent from "../../component/ModalComponent";
import Container from "../../component/container/Container";
import Loader from "../../component/Loader";
import { RootContext } from "../../context/RootContextProvider";

const errorStatus = {
  note: true,
  title: true,
  date: false,
  action: false,
};

const defaultFormData = {
  date: "",
  note: "",
  title: "",
  slot: "",
};

const Appointment = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const [formData, setFormData] = useState(defaultFormData);
  const [formDataError, setFormDataError] = useState(errorStatus);
  const [successModal, setSuccessModal] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  const { handelPostData } = useSendRequest();
  const { loading } = useContext(RootContext);

  const handleChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
    setFormDataError((prevFormData) => ({
      ...prevFormData,
      [field]: value.length < 0,
    }));
  };

  /**
   *appoinment submit
   */
  const handeSubmit = async () => {
    if (formDataError.note || formDataError.title || formDataError.slot) {
      setFormDataError((prevFormData) => ({
        ...prevFormData,
        action: true,
      }));
    } else {
      try {
        const data = {
          type: "Appoinment",
          title: formData?.title,
          description: formData?.note,
          date: formData?.date + "/" + formData?.slot,
        };

        const postData = await handelPostData(AppUrl.postAppoinment, data);

        if (postData) {
          setSuccessModal(true);
          setFormData(defaultFormData);
          setFormDataError(errorStatus);
        }
      } catch (error) {}
    }
  };

  return (
    <Container>
      {loading && <Loader />}
      <CustomeHead />

      <NewAppoinment
        data={{ formData, setFormData, formDataError, setFormDataError }}
        action={handleChange}
        handeSubmit={handeSubmit}
      />

      <SuccessSheet
        setIsVisible={() => navigation.navigate("Tabs")}
        isVisible={successModal}
        title="Done"
      >
        <Text>Appoinment Added Successfully</Text>
      </SuccessSheet>

      <SuccessSheet
        setIsVisible={setStatusOpen}
        isVisible={statusOpen}
        title="Found"
      >
        <Text>
          Appointment received Successfully. Your Appointment on review
        </Text>
      </SuccessSheet>
    </Container>
  );
};

export default Appointment;

const NewAppoinment = ({ data, action, handeSubmit }) => {
  const { formData, formDataError, setFormData, setFormDataError } = data;
  const [openModal, setOpenModal] = useState(false);
  const navigation = useNavigation();
  const [openslot, setOpenslot] = useState(false);
  const route = useRoute();

  useEffect(() => {
    if (route?.params) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ["slot"]: route?.params.slot,
        ["date"]: route?.params.date,
      }));
    }
  }, [route]);

  const formatTime = (hour) => {
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:00 ${period}`;
  };

  const generateTimeSlots = () => {
    const startHour = 8; // Start at 8:00 AM
    const totalSlots = 10; // Total 10 slots
    const duration = 1; // Each slot is 1 hour

    return Array.from({ length: totalSlots }, (_, index) => {
      const start = startHour + index * duration;
      const end = start + duration;
      return {
        id: index.toString(),
        label: `${formatTime(start)} - ${formatTime(end)}`,
      };
    });
  };

  const generateNextFiveDays = () => {
    return Array.from({ length: 6 }, (_, index) => {
      const date = new Date();
      date.setDate(date.getDate() + index + 1); // Start from tomorrow

      const formattedDate = date
        .toLocaleDateString("en-GB") // Format: DD/MM/YYYY
        .replace(/\//g, "-"); // Replace slashes with dashes

      return {
        id: index.toString(),
        date: formattedDate, // Format: DD-MM-YYYY
        day: date.toLocaleDateString("en-US", { weekday: "long" }), // Full weekday name
      };
    });
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderColor: "#8080808a",
      }}
    >
      <Text style={{ fontSize: 16, color: "#011560" }}>
        Make your Appointment
      </Text>

      <Text
        onPress={() => {
          setOpenslot(false);
          setOpenModal(true);
        }}
        style={[styles.textInput, { textAlign: "center", paddingTop: 10 }]}
      >
        {formData.date === ""
          ? "Select Slot"
          : formData.date + " (" + formData.slot + ")"}
      </Text>
      {formDataError.slot && formDataError.action && (
        <View style={{ width: "100%", paddingLeft: 10, paddingTop: 5 }}>
          <Text style={{ color: "red" }}>Fild Required !</Text>
        </View>
      )}

      <TextInput
        style={styles.textInput}
        placeholder="Subject"
        placeholderTextColor={"gray"}
        value={formData.title}
        onChangeText={(value) => action("title", value)}
      />
      {formDataError.title && formDataError.action && (
        <View style={{ width: "100%", paddingLeft: 10, paddingTop: 5 }}>
          <Text style={{ color: "red" }}>Fild Required !</Text>
        </View>
      )}

      <TextInput
        style={[styles.textInput, { height: 250 }]}
        placeholder="Note"
        placeholderTextColor={"gray"}
        value={formData.note}
        numberOfLines={10}
        multiline
        onChangeText={(value) => action("note", value)}
      />
      {formDataError.note && formDataError.action && (
        <View style={{ width: "100%", paddingLeft: 10, paddingTop: 5 }}>
          <Text style={{ color: "red" }}>Fild Required !</Text>
        </View>
      )}

      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: "#011560", fontSize: 15, fontWeight: "600" }}>
            back
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#011560" }]}
          onPress={handeSubmit}
        >
          <Text style={{ color: "#fff", fontSize: 15, fontWeight: "600" }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>

      <ModalComponent
        title={`Select ${openslot ? "Time Slot" : "Date"}`}
        isVisible={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginVertical: 20,
          }}
        >
          {openslot ? (
            <>
              {generateTimeSlots().map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    width: 150,
                    padding: 6,
                    borderWidth: 1,
                    borderColor: "#004cff29",
                    margin: 3,
                    borderRadius: 5,
                    backgroundColor: "#d9d9d968",
                  }}
                  onPress={() => {
                    setOpenModal(false);
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      ["slot"]: item.label,
                    }));

                    setFormDataError((prevFormData) => ({
                      ...prevFormData,
                      ["slot"]: false,
                    }));
                  }}
                >
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </>
          ) : (
            <>
              {generateNextFiveDays().map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    width: 150,
                    padding: 6,
                    margin: 3,
                    // borderBlockColor: "#bababa",
                    // borderWidth: 1,
                    borderRadius: 5,
                    backgroundColor: "#0015fa25",
                  }}
                  onPress={() => {
                    setOpenslot(true);
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      ["date"]: item.date + "/" + item.day,
                    }));
                  }}
                >
                  <Text style={{ color: "black" }}>{item.date}</Text>
                  <Text style={{ color: "gray" }}>{item.day}</Text>
                </TouchableOpacity>
              ))}
            </>
          )}
        </View>
      </ModalComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: "#80808073",
    marginTop: 24,
    color: "black",
  },
  btn: {
    width: "49%",
    backgroundColor: "#CDD8FF",
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  topButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    paddingVertical: 15,
  },
  textStyle: {
    fontSize: 15,
    fontWeight: "600",
  },

  topButtonActive: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    paddingVertical: 15,
    borderBottomWidth: 3,
    borderColor: "#011560",
  },
});
