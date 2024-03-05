import "react-native-gesture-handler"
import { createStackNavigator } from "@react-navigation/stack"
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import React, { useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import SettingScreen from "../settingScreen"
import HomeScreen from "../gameScreen"
import { Text, View, Button } from "react-native"
import { GamepadIcon, SettingsIcon } from "lucide-react-native"

const Stack = createStackNavigator()

const Navbar = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Game">
        <Stack.Screen name="Game" component={HomeScreen} />
        <Stack.Screen name="Settings" component={SettingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navbar
