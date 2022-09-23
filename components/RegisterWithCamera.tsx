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
import Fuse from "fuse.js";

const { width, height } = Dimensions.get("screen");

export default function RegisterWithCamera({ stateChanger, ...props }) {
  const {
    familyName,
    givenName,
    idNumberStr,
    dateOfBirth,
    expiryDate,
    prSinceDate,
  } = props;
  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
  const [isFrontCaptured, setIsFrontCaptured] = useState<boolean>();
  const [isBackCaptured, setIsBackCaptured] = useState<boolean>();
  const [ocrResultFront, setOcrResultFront] = useState<string>();
  const [ocrResultBack, setOcrResultBack] = useState<string>();
  const [isFamilyNameMatched, setIsFamilyNameMatched] =
    useState<boolean>(false);
  const [isGivenNameMatched, setIsGivenNameMatched] = useState<boolean>(false);
  const [isIdNumberStrMatched, setIsIdNumberStrMatched] =
    useState<boolean>(false);
  const [isDateOfBirthMatched, setIsDateOfBirthMatched] =
    useState<boolean>(false);
  const [isExpiryDateMatched, setIsExpiryDateMatched] =
    useState<boolean>(false);
  const [isPrSinceDateMatched, setIsPrSinceDateMatched] =
    useState<boolean>(false);

  const fuzzySearchOptions = {
    // isCaseSensitive: false,
    includeScore: true,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    minMatchCharLength: 2,
    // location: 0,
    threshold: 0.6,
    distance: 25,
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

    // Fuzzy Search
    // Hardcoded date pattern values, but should be captured and transformed manually on UserDetailsInputForm before navigating to this page
    let matchingResult;
    const fuse = new Fuse(listOfLines, fuzzySearchOptions);
    let isMatching;

    if (page === "front") {
      const familyNamePattern = familyName;
      console.log(familyNamePattern);
      matchingResult = fuse.search(familyNamePattern);
      console.log(matchingResult);
      isMatching = isMatchingScoreWithinThreshold(matchingResult);
      console.log(isMatching);
      setIsFamilyNameMatched(isMatching);

      const givenNamePattern = givenName;
      console.log(givenNamePattern);
      matchingResult = fuse.search(givenNamePattern);
      console.log(matchingResult);
      isMatching = isMatchingScoreWithinThreshold(matchingResult);
      console.log(isMatching);
      setIsGivenNameMatched(isMatching);

      const idPattern = idNumberStr;
      console.log(idPattern);
      matchingResult = fuse.search(idPattern);
      console.log(matchingResult);
      isMatching = isMatchingScoreWithinThreshold(matchingResult);
      console.log(isMatching);
      setIsIdNumberStrMatched(isMatching);

      const dobPattern = "Birth 18 MAY | MAI | 87";
      console.log(dobPattern);
      matchingResult = fuse.search(dobPattern);
      console.log(matchingResult);
      isMatching = isMatchingScoreWithinThreshold(matchingResult);
      console.log(isMatching);
      setIsDateOfBirthMatched(isMatching);

      const expiryDtPattern = "Expiry 24 MAR | MARS | 14";
      console.log(expiryDtPattern);
      matchingResult = fuse.search(expiryDtPattern);
      console.log(matchingResult);
      isMatching = isMatchingScoreWithinThreshold(matchingResult);
      console.log(isMatching);
      setIsExpiryDateMatched(isMatching);
      setOcrResultFront(listOfLines.join(" "));
    } else {
      const prSinceDtPattern = "PR Since 20 MAY MAI 10";
      console.log(prSinceDtPattern);
      matchingResult = fuse.search(prSinceDtPattern);
      console.log(matchingResult);
      isMatching = isMatchingScoreWithinThreshold(matchingResult);
      console.log(isMatching);
      setIsPrSinceDateMatched(isMatching);
      setOcrResultBack(listOfLines.join(" "));
    }
  };

  const isMatchingScoreWithinThreshold = (
    fuseResult: Fuse.FuseResult<any>[]
  ) => {
    let matchingScore: number | undefined = 1;
    let currentScore: number | undefined = 1;
    fuseResult.forEach((result) => {
      currentScore = result.score;
      if (
        currentScore != undefined &&
        matchingScore != undefined &&
        currentScore < matchingScore
      ) {
        matchingScore = result.score;
      }
    });
    console.log(matchingScore);
    return matchingScore < 0.6;
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
          {ocrResultFront && ocrResultBack && (
            <>
              <Text style={styles.titleTxt}>Front - OCR Text</Text>
              <View style={styles.ocrTxtContainer}>
                <Text style={styles.ocrTxt}>{ocrResultFront}</Text>
              </View>
              <Text style={styles.titleTxt}>Back - OCR Text</Text>
              <View style={styles.ocrTxtContainer}>
                <Text style={styles.ocrTxt}>{ocrResultBack}</Text>
              </View>
              <Text style={styles.titleTxt}>Matching Results</Text>
              <View style={styles.matchingResultsContainer}>
                <Text
                  style={
                    isFamilyNameMatched
                      ? styles.matchingTxt
                      : styles.mismatchedTxt
                  }
                >
                  Family Name = {familyName}
                </Text>
                <Text
                  style={
                    isGivenNameMatched
                      ? styles.matchingTxt
                      : styles.mismatchedTxt
                  }
                >
                  Given Name = {givenName}
                </Text>
                <Text
                  style={
                    isIdNumberStrMatched
                      ? styles.matchingTxt
                      : styles.mismatchedTxt
                  }
                >
                  ID No = {idNumberStr}
                </Text>
                <Text
                  style={
                    isDateOfBirthMatched
                      ? styles.matchingTxt
                      : styles.mismatchedTxt
                  }
                >
                  Date of Birth = {dateOfBirth}
                </Text>
                <Text
                  style={
                    isExpiryDateMatched
                      ? styles.matchingTxt
                      : styles.mismatchedTxt
                  }
                >
                  Expiry Date = {expiryDate}
                </Text>
                <Text
                  style={
                    isPrSinceDateMatched
                      ? styles.matchingTxt
                      : styles.mismatchedTxt
                  }
                >
                  PR Since Date = {prSinceDate}
                </Text>
              </View>
              <View style={styles.ocrTxtContainer}>
                <TouchableOpacity
                  style={styles.doneButton}
                  onPress={stateChanger}
                >
                  <Text style={styles.doneButtonTxt}>Done</Text>
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
  doneButton: {
    flex: 1,
    bottom: 100,
    width: 50,
    height: 40,
    borderRadius: 10,
    backgroundColor: "yellow",
    marginLeft: 150,
    marginRight: 150,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  doneButtonTxt: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  ocrTxtContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  ocrTxt: {
    fontSize: 12,
    fontWeight: "100",
    color: "white",
  },
  titleTxt: {
    fontSize: 30,
    fontWeight: "100",
    color: "white",
  },
  matchingResultsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  matchingTxt: {
    fontSize: 16,
    fontWeight: "100",
    color: "lightgreen",
  },
  mismatchedTxt: {
    fontSize: 16,
    fontWeight: "100",
    color: "red",
  },
});
