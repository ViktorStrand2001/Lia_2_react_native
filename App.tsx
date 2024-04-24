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
    <View className="w-full h-full bg-bgBlue overflow-hidden">
      {!openLandingPage ? (
        <View className=" flex justify-center items-center relative h-full pb-20">
          <Logo />
          <View className="w-full">
            <Image
              source={require("./assets/images/card-stack_1.png")}
              className="w-full h-[500px]"
            />
          </View>
          <View className="flex items-center justify-center">
            <Text className="text-center text-lg font-semibold  ">
              Take on challanges with your
            </Text>
            <Text className="text-center text-lg font-semibold ">
              friends and see who becomes the
            </Text>
            <Text className="text-center text-lg font-semibold ">
              ultimate challnger!
            </Text>
          </View>
          <View className=" absolute bottom-7 justify-center items">
            <GameButton
              onPress={() => setOpenLandingPage(true)}
              buttonStyle="bg-primarypink"
              image={require("./assets/icons/Right-Arrow.png")}
            />
          </View>
        </View>
      ) : (
        <NativeBaseProvider>
          <Navbar />
        </NativeBaseProvider>
      )}
    </View>
  )
}
