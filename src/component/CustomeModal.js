import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import CustomYoutubePlayer from './CustomYoutubePlayer';

export const CustomModal = ({visible, onClose}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <CustomYoutubePlayer videoId="u3JbiOCBUXs" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    height: 500,
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    color: '#000',
    fontSize: 16,
    marginBottom: 20,
  },
});
