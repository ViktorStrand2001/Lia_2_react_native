import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import SettingScreen from "./screens/settingScreen"
import HomeScreen from "./screens/homeScreen"
import { StyleSheet, Text, View } from "react-native"

const Tab = createMaterialBottomTabNavigator()

export default function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Feed"
          activeColor="#e91e63"
          barStyle={{ backgroundColor: "tomato" }}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Settings" component={SettingScreen} />
        </Tab.Navigator>
      </NavigationContainer>
  )
}
