import React, { useState } from "react";
import {
  SafeAreaView,
  Button,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "react-native-datepicker";
import RegisterWithCamera from "../components/RegisterWithCamera";

interface IFormInputs {
  familyName: string;
  givenName: string;
  idNumberStr: string;
  dateOfBirth: string;
  expiryDate: string;
}

const schema = yup
  .object({
    familyName: yup.string().required(),
    givenName: yup.string().required(),
    idNumberStr: yup.string().required(),
    dateOfBirth: yup.string().required(),
    expiryDate: yup.string().required(),
  })
  .required();

export default function UserDetailsInputForm({ stateChanger, ...props }) {
  const [familyName, setFamilyName] = useState<string>();
  const [givenName, setGivenName] = useState<string>();
  const [idNumberStr, setIdNumberStr] = useState<string>();
  const [dateOfBirth, setDateOfBirth] = useState<string>();
  const [expiryDate, setExpiryDate] = useState<string>();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: IFormInputs) => {
    console.log(data);
    // return <RegisterWithCamera stateChanger={stateChanger} />
  };
  console.log(watch("dateOfBirth"));
  console.log(watch("expiryDate"));

  return (
    <SafeAreaView>
      <TextInput
        {...register("familyName")}
        onChangeText={setFamilyName}
        value={familyName}
      />
      <Text>{errors.familyName?.message}</Text>

      <TextInput
        {...register("givenName")}
        onChangeText={setGivenName}
        value={givenName}
      />
      <Text>{errors.givenName?.message}</Text>

      <TextInput
        {...register("idNumberStr")}
        onChangeText={setIdNumberStr}
        value={idNumberStr}
      />
      <Text>{errors.idNumberStr?.message}</Text>

      <Controller
        control={control}
        name="dateOfBirth"
        render={({ field }) => (
          <DatePicker
            style={styles.datePickerStyle}
            date={dateOfBirth} //initial date from state
            mode="date" //The enum of date, datetime and time
            placeholder="select date"
            format="DD-MM-YYYY"
            minDate="01-01-2016"
            maxDate="01-01-2019"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                //display: 'none',
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            onDateChange={(date) => {
              setDateOfBirth(date);
            }}
          />
        )}
      />
      {errors.dateOfBirth && <Text>This field is required</Text>}

      <Controller
        control={control}
        name="expiryDate"
        render={({ field }) => (
          <DatePicker
            style={styles.datePickerStyle}
            date={expiryDate} //initial date from state
            mode="date" //The enum of date, datetime and time
            placeholder="select date"
            format="DD-MM-YYYY"
            minDate="01-01-2016"
            maxDate="01-01-2019"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                //display: 'none',
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            onDateChange={(date) => {
              setExpiryDate(date);
            }}
          />
        )}
      />
      {errors.expiryDate && <Text>This field is required</Text>}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
});
