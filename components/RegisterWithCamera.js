import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { Camera } from "expo-camera";

const { width, height } = Dimensions.get("screen");

export default function RegisterWithCamera({ stateChanger, ...props }) {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <>
      <>
        <View style={styles.container}>
          <Camera style={styles.camera} type="back">
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={stateChanger}>
                <Text style={styles.txt}>Submit</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      </>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  txt: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
