import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";
import DatePicker from "react-native-datepicker";
import { TouchableOpacity } from "react-native-gesture-handler";
import RegisterWithCamera from "../components/RegisterWithCamera";

interface IFormInputs {
  familyName: string;
  givenName: string;
  idNumberStr: string;
  dateOfBirth: string;
  expiryDate: string;
}

const { width, height } = Dimensions.get("screen");

export default function UserDetailsInputForm({ stateChanger, ...props }) {
  const { showCamera } = props;
  const [isCameraCompVisible, setIsCameraCompVisible] =
    useState<boolean>(showCamera);
  const [familyName, setFamilyName] = useState<string>("Specimen");
  const [givenName, setGivenName] = useState<string>("Latika Yasmin");
  const [idNumberStr, setIdNumberStr] = useState<string>("0018-5978");
  const [dateOfBirth, setDateOfBirth] = useState<string>("18/05/1987");
  const [expiryDate, setExpiryDate] = useState<string>("24/04/2014");
  const [prSinceDate, setPrSinceDate] = useState<string>("20/05/2010");

  const onSubmit = () => {
    console.log(familyName);
    console.log(givenName);
    console.log(idNumberStr);
    console.log(dateOfBirth);
    console.log(expiryDate);
    console.log(prSinceDate);
    setIsCameraCompVisible(true);
  };
  return (
    <>
      {!isCameraCompVisible && (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.txtInputContainer}>
              <Text style={styles.titleTxt}>Please enter your information</Text>
            </View>

            <View style={styles.txtInputContainer}>
              <Text style={styles.txtLabel}>Family Name</Text>
              <TextInput
                style={styles.txtInput}
                onChangeText={setFamilyName}
                value={familyName}
              />
            </View>

            <View style={styles.txtInputContainer}>
              <Text style={styles.txtLabel}>Given Name</Text>
              <TextInput
                style={styles.txtInput}
                onChangeText={setGivenName}
                value={givenName}
              />
            </View>

            <View style={styles.txtInputContainer}>
              <Text style={styles.txtLabel}>ID Number</Text>
              <TextInput
                style={styles.txtInput}
                onChangeText={setIdNumberStr}
                value={idNumberStr}
              />
            </View>

            <View style={styles.datePickerContainer}>
              <Text style={styles.txtLabel}>Date of Birth</Text>
              <DatePicker
                style={styles.datePickerStyle}
                date={dateOfBirth}
                mode="date"
                placeholder="select date"
                format="DD-MM-YYYY"
                maxDate="23-09-2022"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  placeholderText: {
                    color: "black",
                  },
                  dateIcon: {
                    //display: 'none',
                    position: "absolute",
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                    backgroundColor: "yellow",
                  },
                }}
                onDateChange={(date) => {
                  setDateOfBirth(date);
                }}
              />
            </View>

            <View style={styles.datePickerContainer}>
              <Text style={styles.txtLabel}>PR Card Expiry Date</Text>
              <DatePicker
                style={styles.datePickerStyle}
                date={expiryDate}
                mode="date"
                placeholder="select date"
                format="DD-MM-YYYY"
                minDate="23-09-2022"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  placeholderText: {
                    color: "black",
                  },
                  dateIcon: {
                    //display: 'none',
                    position: "absolute",
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                    backgroundColor: "yellow",
                  },
                }}
                onDateChange={(date) => {
                  setExpiryDate(date);
                }}
              />
            </View>

            <View style={styles.datePickerContainer}>
              <Text style={styles.txtLabel}>PR Since Date</Text>
              <DatePicker
                style={styles.datePickerStyle}
                date={prSinceDate}
                mode="date"
                placeholder="select date"
                format="DD-MM-YYYY"
                maxDate="23-09-2022"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  placeholderText: {
                    color: "black",
                  },
                  dateIcon: {
                    //display: 'none',
                    position: "absolute",
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                    backgroundColor: "yellow",
                  },
                }}
                onDateChange={(date) => {
                  setPrSinceDate(date);
                }}
              />
            </View>

            <TouchableOpacity style={styles.primaryBtn} onPress={onSubmit}>
              <Text style={styles.primaryBtnTxt}>Submit</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      )}
      {isCameraCompVisible && (
        <RegisterWithCamera
          stateChanger={stateChanger}
          familyName={familyName.toUpperCase()}
          givenName={givenName.toUpperCase()}
          idNumberStr={idNumberStr}
          dateOfBirth={dateOfBirth}
          expiryDate={expiryDate}
          prSinceDate={prSinceDate}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    top: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    color: "white",
  },
  titleTxt: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 5,
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
    color: "yellow",
  },
  datePickerContainer: {
    flex: 0.1,
    // flexDirection: "row",
    paddingBottom: 50,
    justifyContent: "space-between",
    // alignItems: "center"
  },
  txtInputContainer: {
    flex: 0.1,
    paddingBottom: 5,
    justifyContent: "space-between",
  },
  txtInput: {
    width: width / 1.1,
    color: "yellow",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    paddingBottom: 5,
    fontWeight: "100",
  },
  txtLabel: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 5,
  },
  primaryBtn: {
    height: 40,
    width: 200,
    borderRadius: 10,
    backgroundColor: "yellow",
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryBtnTxt: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
});
