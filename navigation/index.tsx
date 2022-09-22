import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  AntDesign,
  Feather,
  Fontisto,
  MaterialIcons,
} from "@expo/vector-icons";
import LinkingConfiguration from "./LinkingConfiguration";
import Home from "../screens/Home";
import Explore from "../screens/Explore";
import CheckIn from "../screens/CheckIn";
import Favourites from "../screens/Favourites";
import More from "../screens/More";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <>
      <NavigationContainer theme={DarkTheme} linking={LinkingConfiguration}>
        <StackNavigtor />
      </NavigationContainer>
    </>
  );
}

function StackNavigtor() {
  return (
    <Tab.Navigator
      backBehavior="history"
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: "#fef109",
        tabBarInactiveTintColor: "#ffffff",
        headerShown: false,
        tabBarStyle: { height: 70 },
        tabBarLabelStyle: {
          fontSize: 16,
          margin: 0,
          padding: 0,
        }
      }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="explore"
        component={Explore}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="add-location" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="checkin"
        component={CheckIn}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="login" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="favourites"
        component={Favourites}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="favorite-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="more"
        component={More}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="more-v" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
