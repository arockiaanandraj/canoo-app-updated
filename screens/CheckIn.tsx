import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import styles from "../Styles";
import RegisterWithCamera from "../components/RegisterWithCamera";

export default function CheckIn() {
  const [userIsRegistered, setUserIsRegistered] = useState(false);
  const [registerWithCameraActive, setRegisterWithCameraActive] = useState(false);
  const onPressRegister = () => {
    setRegisterWithCameraActive(false);
    setUserIsRegistered(true);
  };

  const onPressRegisterAgain = () => {
    setUserIsRegistered(false);
  }

  return (
    <>
      {!userIsRegistered && !registerWithCameraActive && (
        <View style={styles.container}>
          <Text style={styles.txt}>Register to check into a venue{"\n"}</Text>
          <TouchableOpacity
            onPress={() => setRegisterWithCameraActive(true)}
            style={styles.primaryBtn}
          >
            <Text style={styles.primaryBtnTxt}>Register with Camera</Text>
          </TouchableOpacity>
        </View>
      )}
      {!userIsRegistered && registerWithCameraActive && (
        <RegisterWithCamera stateChanger={onPressRegister} />
      )}
      {userIsRegistered && !registerWithCameraActive && (
        <View style={styles.container}>
          <Text style={styles.txt}>Check into a venue{"\n"}</Text>
          <TouchableOpacity style={styles.primaryBtn}>
            <Text style={styles.primaryBtnTxt}>Check in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressRegisterAgain}
            style={styles.primaryBtn}
          >
            <Text style={styles.primaryBtnTxt}>Register Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}
