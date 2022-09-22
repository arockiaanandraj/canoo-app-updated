import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { Camera } from "expo-camera";
import MlkitOcr, { MlkitOcrResult } from "react-native-mlkit-ocr";

const { width, height } = Dimensions.get("screen");

export default function RegisterWithCamera({ stateChanger, ...props }) {
  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);

  const [ocrResult, setOcrResult] = useState<MlkitOcrResult | undefined>();
  const getOcrText = async (response: { uri: any }) => {
    console.log("Pic URI -" + response.uri);
    setOcrResult(await MlkitOcr.detectFromUri(response.uri));
  };

  const cameraRef = useRef<Camera>(null);

  const takePicture = useCallback(async (): Promise<void> => {
    console.log("Take picture!");
    if (!isCameraReady) return;

    try {
      if (cameraRef.current !== null) {
        console.log("Taking picture!");
        const result = await cameraRef.current.takePictureAsync();
        await getOcrText(result);
      }
    } catch (error) {
      console.log(error);
    }
  }, [isCameraReady]);

  const [permission, requestPermission] = Camera.useCameraPermissions();
  useEffect(() => {
    (async () => {
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
    })();
  }, [permission]);

  return (
    <>
      <>
        <View style={styles.container}>
          {!ocrResult && (
            <View style={styles.cameraContainer}>
              <Camera
                ref={cameraRef}
                autoFocus="on"
                style={styles.camera}
                type="back"
                onCameraReady={() => setIsCameraReady(true)}
              >
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={takePicture}>
                    <Text style={styles.buttonTxt}>Scan</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={stateChanger}
                  >
                    <Text style={styles.buttonTxt}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </Camera>
            </View>
          )}
          {ocrResult?.map((block) => {
            return block.lines.map((line) => {
              return (
                <View
                  key={line.text}
                  style={{
                    flex: 1,
                  }}
                >
                  <Text style={styles.ocrTxt}>{line.text}</Text>
                </View>
              );
            });
          })}
          {ocrResult && (
            <TouchableOpacity style={styles.button} onPress={stateChanger}>
              <Text style={styles.buttonTxt}>Done</Text>
            </TouchableOpacity>
          )}
        </View>
      </>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraContainer: {
    flex: 1,
    position: "absolute",
    width: width,
    height: height / 2,
  },
  camera: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  buttonTxt: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  ocrTxt: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
});
