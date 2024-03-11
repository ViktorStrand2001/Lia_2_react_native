import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import React, { useState } from "react"
import { Text, View, TouchableOpacity, Image } from "react-native"
import Logo from "./components/Logo"
import Navbar from "./components/Navbar"

const Tab = createMaterialBottomTabNavigator()

export default function App() {
  const [openLandingPage, setOpenLandingPage] = useState<boolean>(false)

  return (
    <View className="min-w-full min-h-full bg-bgBlue">
      {!openLandingPage ? (
        <>
          <View className="min-w-full min-h-full overflow-hidden">
            <View className="w-full h-[14%] flex justify-end items-center z-30">
              <Logo />
            </View>
            <View className="w-full h-[1/2] z-10 pb-2">
              <Image
                source={require("./assets/card-stack.png")}
                className="z-20 w-full h-[470px]"
              />
            </View>
            <View className="w-full h-20 flex items-center justify-center relativ">
              <Text className="text-center text-lg font-semibold  absolute top-1">
                Take on challanges with your
              </Text>
              <Text className="text-center text-lg font-semibold absolute">
                friends and see who becomes the
              </Text>
              <Text className="text-center text-lg font-semibold absolute bottom-1">
                ultimate challnger!
              </Text>
            </View>
            <View className="w-full h-24 flex justify-center items-center">
              <TouchableOpacity onPress={() => setOpenLandingPage(true)} className="transition duration-500 ease-in-out transform hover:scale-110">
                <View className="bg-primarypink h-16 px-16 rounded-2xl flex items-center justify-center border">
                  <Image source={require("./assets/Right-Arrow.png")} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <Navbar />
      )}
    </View>
  )
}
