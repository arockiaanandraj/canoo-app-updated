import React, { useState } from "react";
import { View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation";
import { ScreenProvider } from "responsive-native";
import styles from "./Styles";
import Header from "./components/Header";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  setTimeout(() => {
    setAppIsReady(true);
  }, 6500);
  return (
    <>
      {!appIsReady && (
        <View style={styles.container}>
          <Image
            style={styles.splashImg}
            source={require("./assets/images/splash.gif")}
          />
        </View>
      )}
      {appIsReady && (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <ScreenProvider baseFontSize={16}>
              <Header />
              <Navigation />
              <StatusBar hidden />
            </ScreenProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      )}
    </>
  );
}
