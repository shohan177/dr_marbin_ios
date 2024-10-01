import axios from 'axios';
import React, {useState} from 'react';
import {useToast} from 'react-native-toast-notifications';
import Toast from 'react-native-simple-toast';

const useSendRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState([]);
  const toast = useToast();

  let axiosConfig = {
    headers: {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        // Authorization: `Bearer ${userToken}`,
        enctype: 'multipart/form-data',
      },
    },
  };
  /**
   * get request sent
   */
  const handelGetData = async (url = null) => {
    setLoading(true);

    if (url) {
      try {
        const response = await axios.get(url, axiosConfig);
        // console.log('custome hook data____', response.data);
        setLoading(false);
        return response.data;
      } catch (error) {
        if (error.response) {
          // Server responded with a status other than 200 range
          console.error('Server error:', error.response.data);
        } else if (error.request) {
          // Request was made but no response received

          toast.show('Please check your internet connection !');

          console.error(
            'Please check your internet connection !',
            error.request,
          );
        } else {
          // Something happened in setting up the request
          console.error('Error setting up request:', error.message);
        }
        setLoading(false);
        // throw error;
      }
    }
  };
  const handelPostData = async (url = null, data) => {
    if (url) {
      try {
        const response = await axios.post(url, data, axiosConfig);
        console.log('custome hook data____', response.data);
        return response;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('Error Data:', error.response?.data.message);
          Toast.show(error.response?.data.message, 1);
        } else {
          console.log('Unexpected Error:', error);
        }
      }
    }
  };

  const formatDate = dateString => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const date = new Date(dateString);
    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    const day = date.getDate();
    const formattedDate = `${months[monthIndex]} ${day}, ${year}`;
    return formattedDate;
  };

  return {
    handelGetData,
    handelPostData,
    loading,
    error,
    response,
    formatDate,
  };
};

export default useSendRequest;
