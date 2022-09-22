import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";
import { Camera } from "expo-camera";
import MlkitOcr, { MlkitOcrResult } from "react-native-mlkit-ocr";
import Fuse from 'fuse.js'

const { width, height } = Dimensions.get("screen");

export default function RegisterWithCamera({ stateChanger, ...props }) {
  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
  const [isFrontCaptured, setIsFrontCaptured] = useState<boolean>(false);
  const [isBackCaptured, setIsBackCaptured] = useState<boolean>(false);
  const [ocrResultFront, setOcrResultFront] = useState<string>();
  const [ocrResultBack, setOcrResultBack] = useState<string>();

  const fuzzySearchOptions = {
    // isCaseSensitive: false,
    includeScore: true,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    minMatchCharLength: 2,
    // location: 0,
    threshold: 0.6,
    // distance: 100,
    useExtendedSearch: true,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
  };

  const getOcrText = async (response: { uri: any }, page: string) => {
    console.log("Pic URI -" + response.uri);
    const mlkitOcrResult = await MlkitOcr.detectFromUri(response.uri);
    console.log(page);
    let listOfLines: string[] = getAllLinesFromOcrTxt(mlkitOcrResult);
    console.log(listOfLines.join(" | "));
    const fuse = new Fuse(listOfLines, fuzzySearchOptions);
    const pattern = "LATIKA | YASMIN";
    console.log(fuse.search(pattern));
    if (page === "front") {
      setOcrResultFront(listOfLines.join(" "));
    } else {
      setOcrResultBack(listOfLines.join(" "));
    }
  };

  const getAllLinesFromOcrTxt = (ocrResult: MlkitOcrResult) => {
    let listOfLines: string[] = [];
    if (ocrResult) {
      ocrResult?.forEach((block) => {
        block.lines.forEach((line) => {
          listOfLines.push(line.text);
        });
      });
    }
    return listOfLines;
  };

  const cameraRef = useRef<Camera>(null);

  const takePicture = useCallback(
    async (page: string): Promise<void> => {
      console.log("Take picture!");
      if (!isCameraReady) return;

      try {
        if (cameraRef.current !== null) {
          console.log("Taking picture!");
          const result = await cameraRef.current.takePictureAsync();
          if (page === "front") {
            await getOcrText(result, "front");
            setIsFrontCaptured(true);
          } else {
            await getOcrText(result, "back");
            setIsBackCaptured(true);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    [isCameraReady]
  );

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
          {(!ocrResultFront || !ocrResultBack) && (
            <>
              <View style={styles.cameraContainer}>
                <View style={styles.topItemsContainer}>
                  {!isFrontCaptured && (
                    <Image
                      style={styles.topImg}
                      source={require("../assets/images/PR_Card_Front_Selected.png")}
                    />
                  )}
                  {!isFrontCaptured && !isBackCaptured && (
                    <Image
                      style={styles.topImg}
                      source={require("../assets/images/PR_Card_Back_Default.png")}
                    />
                  )}
                  {isFrontCaptured && (
                    <Image
                      style={styles.topImg}
                      source={require("../assets/images/PR_Card_Front_Done.png")}
                    />
                  )}
                  {isFrontCaptured && !isBackCaptured && (
                    <Image
                      style={styles.topImg}
                      source={require("../assets/images/PR_Card_Back_Selected.png")}
                    />
                  )}
                </View>
                <Camera
                  ref={cameraRef}
                  autoFocus="on"
                  style={styles.camera}
                  type="back"
                  onCameraReady={() => setIsCameraReady(true)}
                ></Camera>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    !isFrontCaptured
                      ? takePicture("front")
                      : takePicture("back")
                  }
                >
                  <Text style={styles.buttonTxt}>Scan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={stateChanger}>
                  <Text style={styles.buttonTxt}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
          {}
          {ocrResultFront && ocrResultBack && (
            <>
              <View style={styles.ocrTxtContainer}>
                <Text style={styles.ocrTxt}>{ocrResultFront}</Text>
              </View>
              <View style={styles.ocrTxtContainer}>
                <Text style={styles.ocrTxt}>{ocrResultBack}</Text>
              </View>
              <View style={styles.ocrTxtContainer}>
                <TouchableOpacity style={styles.button} onPress={stateChanger}>
                  <Text style={styles.buttonTxt}>Done</Text>
                </TouchableOpacity>
              </View>
            </>
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
  topItemsContainer: {
    flex: 0.001,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  topImg: {
    top: -100,
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
    bottom: 64,
  },
  button: {
    flex: 1,
    width: 50,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  buttonTxt: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  ocrTxtContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  ocrTxt: {
    fontSize: 10,
    fontWeight: "100",
    color: "white",
  },
});
