import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import React, { useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import SettingScreen from "./screens/settingScreen"
import HomeScreen from "./screens/gameScreen"
import { Text, View, Button } from "react-native"
import { GamepadIcon, SettingsIcon } from "lucide-react-native"
import Navbar from "./screens/components/Navbar"

const Tab = createMaterialBottomTabNavigator()

export default function App() {
  const [openLandingPageOpen, setOpenLandingPageOpen] = useState<boolean>(false)

  return (
    <View className="min-w-full min-h-full">
      {!openLandingPageOpen ? (
        <View className="w-full h-full flex justify-center items-center">
          <Text>Landingssida</Text>
          <Button
            title="Play Now!"
            onPress={() => setOpenLandingPageOpen(true)}
          ></Button>
        </View>
      ) : (
        <Navbar/>
      )}
    </View>
  )
}
