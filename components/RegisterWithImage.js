import "expo-dev-client";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Asset } from "expo-asset";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ProgressCircle from "react-native-progress/Circle";
import TesseractOcr, {
  LANG_ENGLISH,
  useEventListener,
} from "react-native-tesseract-ocr";
import * as FileSystem from "expo-file-system";

const DEFAULT_HEIGHT = 500;
const DEFAULT_WIDTH = 600;

export default function RegisterWithImage({ stateChanger, ...props }) {
  const [fetchingTrainingData, setFetchingTrainingData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const imgSrc = require("../assets/images/sample.png");
  const [imgUri, setImgUri] = useState(null);
  const [text, setText] = useState("");

  async function getTrainedData() {
    const trainedDataUrl =
      "https://github.com/tesseract-ocr/tessdata/raw/3.04.00/eng.traineddata";
    const trainedDataDir = FileSystem.cacheDirectory + "tessdata/";
    const trainedDataPath = trainedDataDir + "eng.traineddata";
    const pathInfo = await FileSystem.getInfoAsync(trainedDataPath);
    if (pathInfo.exists) {
      setFetchingTrainingData(false);
    } else {
      alert("Training data does not exist. Downloading...");
      await FileSystem.makeDirectoryAsync(trainedDataDir, {
        intermediates: true,
      });
      FileSystem.downloadAsync(trainedDataUrl, trainedDataPath)
        .then(({ uri }) => {
          alert(`Finished downloading to ${uri}`);
          setFetchingTrainingData(false);
        })
        .catch((error) => {
          alert(error);
        });
    }
  }

  Asset.fromModule(require("../assets/images/sample.png"))
    .downloadAsync()
    .then(({ localUri }) => setImgUri(localUri));

  useEventListener("onProgressChange", (p) => {
    setProgress(p.percent / 100);
  });

  useEffect(() => {
    getTrainedData();
  }, []);

  const recognizeTextFromImage = async (path) => {
    setIsLoading(true);

    try {
      const tesseractOptions = {};
      const recognizedText = await TesseractOcr.recognize(
        path,
        LANG_ENGLISH,
        tesseractOptions
      );
      setText(recognizedText);
    } catch (err) {
      console.error(err);
      setText('Error occurred while recognizing the text');
    }

    setIsLoading(false);
    setProgress(0);
  };

  return (
    <>
      <>
        <View style={styles.container}>
          <Text style={styles.title}>PR Card - Front</Text>
          <StatusBar style="auto" />
          <View style={styles.options}>
            <View style={styles.button}>
              <Button
                disabled={fetchingTrainingData || isLoading}
                title="Scan"
                onPress={() => {
                  recognizeTextFromImage(imgUri);
                }}
              />
              <Text>{'\n'}</Text>
              <Button title="Submit" onPress={stateChanger} />
            </View>
          </View>
          {imgUri && (
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={imgSrc} />
              {isLoading ? (
                <ProgressCircle showsText progress={progress} />
              ) : (
                <Text style={styles.txt}>{text}</Text>
              )}
            </View>
          )}
        </View>
      </>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 100,
    alignItems: "center",
    backgroundColor: "#000",
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  button: {
    marginHorizontal: 10,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    marginVertical: 15,
    height: DEFAULT_HEIGHT / 2.4,
    width: DEFAULT_WIDTH / 1.6,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#fff",
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
  txt: {
    color: "#fff",
  },
  camera: {},
});
