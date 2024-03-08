import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import React, { useState } from "react"
import { Text, View, Button } from "react-native"
import Navbar from "./components/Navbar"
import Logo from "./components/Logo"

const Tab = createMaterialBottomTabNavigator()

export default function App() {
  const [openLandingPageOpen, setOpenLandingPageOpen] = useState<boolean>(false)

  return (
    <View className="min-w-full min-h-full relative bg-blue-200">
      <View className="absolute w-full flex items-center top-10">
        <Logo />
      </View>
      {!openLandingPageOpen ? (
        <View className="w-full h-full flex justify-center items-center">
          <Text>Landingssida</Text>
          <Button
            title="Play Now!"
            onPress={() => setOpenLandingPageOpen(true)}
          ></Button>
        </View>
      ) : (
        <Navbar />
      )}
    </View>
  )
}
