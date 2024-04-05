import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import React, { useState } from "react"
import { Text, View, TouchableOpacity, Image } from "react-native"
import Logo from "./components/Logo"
import Navbar from "./components/Navbar"
import GameButton from "./components/GameScreenComponents/GameButton"
import { NativeBaseProvider } from "native-base"

const Tab = createMaterialBottomTabNavigator()

export default function App() {
  const [openLandingPage, setOpenLandingPage] = useState<boolean>(false)

  return (
    <NativeBaseProvider>
      <View className="min-w-screen min-h-screen bg-bgBlue overflow-hidden">
        {!openLandingPage ? (
          <View className=" flex justify-center items-center">
            <View className="h-32 justify-center items-end pt-16">
              <Logo />
            </View>
            <View className="w-full">
              <Image
                source={require("./assets/images/card-stack_1.png")}
                className="w-full h-[470px]"
              />
            </View>
            <View className="w-full h-16 mb- flex items-center justify-center relativ">
              <Text className="text-center text-lg font-semibold  absolute -top-1">
                Take on challanges with your
              </Text>
              <Text className="text-center text-lg font-semibold absolute top-4">
                friends and see who becomes the
              </Text>
              <Text className="text-center text-lg font-semibold absolute top-9">
                ultimate challnger!
              </Text>
            </View>
            <View className=" mt-4 justify-center items">
              <GameButton
                onPress={() => setOpenLandingPage(true)}
                buttonStyle="bg-primarypink"
                image={require("./assets/icons/Right-Arrow.png")}
              />
            </View>
          </View>
        ) : (
          <Navbar />
        )}
      </View>
    </NativeBaseProvider>
  )
}
