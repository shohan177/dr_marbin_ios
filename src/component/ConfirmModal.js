import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ConfirmModal = ({
  visible,
  title = "Confirm Delete",
  message = "Are you sure you want to delete this?",
  onCancel,
  onConfirm,
}) => {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>No</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteButton} onPress={onConfirm}>
              <Text style={styles.deleteText}>Yes</Text>
            </TouchableOpacity>
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
    width: 300,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
  },
  message: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color: "#343434",
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
    backgroundColor: "#ddd",
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

export default ConfirmModal;
