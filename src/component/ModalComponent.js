import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";

const ModalComponent = ({ isVisible, onClose, children, title }) => {
  return (
    <Modal transparent animationType="fade" visible={isVisible}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          {children}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Close</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.deleteButton} onPress={onConfirm}>
              <Text style={styles.deleteText}>Yes</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    width: "95%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  message: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color: "black",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    // backgroundColor: "#CDD8FF",
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#ff4d4d",
    borderRadius: 5,
    marginLeft: 5,
  },
  cancelText: {
    fontSize: 16,
    color: "#333",
  },
  deleteText: {
    fontSize: 16,
    color: "white",
  },
});

export default ModalComponent;
