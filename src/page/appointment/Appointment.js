import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomeHead from '../../component/CustomeHead';
import {TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import useSendRequest from '../../customeHelper/useSendRequest';
import AppUrl from '../../restApi/AppUrl';
import {useToast} from 'react-native-toast-notifications';
import SuccessSheet from '../../component/SuccessSheet';

const errorStatus = {
  firstName: true,
  lastName: true,
  phone: true,
  email: true,
  reason: true,
  action: false,
};

const defaultFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  reason: '',
  appointmentStatus: 'Pending',
};

const Appointment = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const [formData, setFormData] = useState(defaultFormData);
  const [formDataError, setFormDataError] = useState(errorStatus);
  const [isStatus, setIsStatus] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  const {handelPostData} = useSendRequest();
  const handleChange = (field, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [field]: value,
    }));

    setFormDataError(prevFormData => ({
      ...prevFormData,
      [field]: value.length < 0,
    }));
  };

  const handeSubmit = async () => {
    if (
      formDataError.firstName ||
      formDataError.phone ||
      formDataError.reason ||
      formDataError.lastName ||
      formDataError.email
    ) {
      setFormDataError(prevFormData => ({
        ...prevFormData,
        action: true,
      }));
    } else {
      setSuccessModal(true);
      try {
        const postData = await handelPostData(AppUrl.postAppoinment, formData);
        console.log('data is ready', postData);
      } catch (error) {}
    }
  };

  const checkAppoinment = async () => {
    if (formDataError.phone) {
      setFormDataError(prevFormData => ({
        ...prevFormData,
        action: true,
      }));
    } else {
      setStatusOpen(true);
      try {
        const appoinmentStatus = await handelPostData(
          AppUrl.checkAppoinment + formData.phone,
        );
        console.log('Appoinmnet Status', appoinmentStatus);
      } catch (error) {}
    }
  };

  return (
    <View style={{flex: 1}}>
      <CustomeHead />

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity
          onPress={() => {
            setFormDataError(errorStatus);
            setIsStatus(prev => !prev);
            setFormData(defaultFormData);
          }}
          style={isStatus ? styles.topButton : styles.topButtonActive}>
          <Text style={styles.textStyle}>Make Appoinment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsStatus(prev => !prev);
            setFormDataError(errorStatus);
            setFormData(defaultFormData);
          }}
          style={!isStatus ? styles.topButton : styles.topButtonActive}>
          <Text style={styles.textStyle}>Your Appoinment</Text>
        </TouchableOpacity>
      </View>

      {!isStatus ? (
        <NewAppoinment
          data={{formData, setFormData, formDataError, setFormDataError}}
          action={handleChange}
          handeSubmit={handeSubmit}
        />
      ) : (
        <AppoinmentStatus
          data={{formData, setFormData, formDataError, setFormDataError}}
          action={handleChange}
          handeSubmit={checkAppoinment}
        />
      )}

      <SuccessSheet
        setIsVisible={setSuccessModal}
        isVisible={successModal}
        title="Done">
        <Text>Appoinment Added Successfully</Text>
      </SuccessSheet>

      <SuccessSheet
        setIsVisible={setStatusOpen}
        isVisible={statusOpen}
        title="Found">
        <Text>
          Appoinment Added Successfully this ihhfjkhfjrhfjrhhjfkhfjkrhfhrf
        </Text>
      </SuccessSheet>
    </View>
  );
};

export default Appointment;

const NewAppoinment = ({data, action, handeSubmit}) => {
  const {formData, formDataError} = data;
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#8080808a',
      }}>
      <Text style={{fontSize: 16, color: '#011560'}}>
        Make your Appointment
      </Text>

      <TextInput
        style={styles.textInput}
        placeholder="First Name"
        value={formData.firstName}
        onChangeText={value => action('firstName', value)}
      />
      {formDataError.firstName && formDataError.action && (
        <View style={{width: '100%', paddingLeft: 10, paddingTop: 5}}>
          <Text style={{color: 'red'}}>Fild Required !</Text>
        </View>
      )}
      <TextInput
        style={styles.textInput}
        placeholder="Last Name"
        value={formData.lastName}
        onChangeText={value => action('lastName', value)}
      />
      {formDataError.lastName && formDataError.action && (
        <View style={{width: '100%', paddingLeft: 10, paddingTop: 5}}>
          <Text style={{color: 'red'}}>Fild Required !</Text>
        </View>
      )}
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        value={formData.email}
        onChangeText={value => action('email', value)}
      />
      {formDataError.email && formDataError.action && (
        <View style={{width: '100%', paddingLeft: 10, paddingTop: 5}}>
          <Text style={{color: 'red'}}>Fild Required !</Text>
        </View>
      )}
      <TextInput
        style={styles.textInput}
        placeholder="Phone"
        value={formData.phone}
        keyboardType="name-phone-pad"
        onChangeText={value => action('phone', value)}
      />
      {formDataError.phone && formDataError.action && (
        <View style={{width: '100%', paddingLeft: 10, paddingTop: 5}}>
          <Text style={{color: 'red'}}>Fild Required !</Text>
        </View>
      )}
      <TextInput
        style={[styles.textInput, {height: 100}]}
        placeholder="Reason"
        value={formData.reason}
        numberOfLines={5}
        multiline
        onChangeText={value => action('reason', value)}
      />
      {formDataError.reason && formDataError.action && (
        <View style={{width: '100%', paddingLeft: 10, paddingTop: 5}}>
          <Text style={{color: 'red'}}>Fild Required !</Text>
        </View>
      )}

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.goBack()}>
          <Text style={{color: '#011560', fontSize: 15, fontWeight: '600'}}>
            back
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, {backgroundColor: '#011560'}]}
          onPress={handeSubmit}>
          <Text style={{color: '#fff', fontSize: 15, fontWeight: '600'}}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const AppoinmentStatus = ({data, action, handeSubmit}) => {
  const navigation = useNavigation();
  const {formData, formDataError} = data;
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#8080808a',
      }}>
      <Text style={{fontSize: 16, color: '#011560'}}>
        Check You Appointment Status
      </Text>
      <TextInput
        style={styles.textInput}
        placeholder="Phone"
        value={formData.phone}
        keyboardType="name-phone-pad"
        onChangeText={value => action('phone', value)}
      />
      {formDataError.phone && formDataError.action && (
        <View style={{width: '100%', paddingLeft: 10, paddingTop: 5}}>
          <Text style={{color: 'red'}}>Fild Required !</Text>
        </View>
      )}

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.goBack()}>
          <Text style={{color: '#011560', fontSize: 15, fontWeight: '600'}}>
            back
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, {backgroundColor: '#011560'}]}
          onPress={handeSubmit}>
          <Text style={{color: '#fff', fontSize: 15, fontWeight: '600'}}>
            Check
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: '#80808073',
    marginTop: 24,
  },
  btn: {
    width: '49%',
    backgroundColor: '#CDD8FF',
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  topButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    paddingVertical: 15,
  },
  textStyle: {
    fontSize: 15,
    fontWeight: '600',
  },

  topButtonActive: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    paddingVertical: 15,
    borderBottomWidth: 3,
    borderColor: '#011560',
  },
});
