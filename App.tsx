import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import React, { useState } from "react"
import { Text, View, TouchableOpacity, Image } from "react-native"
import Logo from "./components/Logo"
import Navbar from "./components/Navbar"

const Tab = createMaterialBottomTabNavigator()

export default function App() {
  const [openLandingPage, setOpenLandingPage] = useState<boolean>(false)

  return (
    <View className="min-w-full min-h-full bg-bgBlue overflow-hidden">
      {!openLandingPage ? (
        <>
          <View className=" flex flex-col justify-center items-center">
            <View className=" mt-20">
              <Logo />
            </View>
            <View className="w-full">
              <Image
                source={require("./assets/card-stack_1.png")}
                className="w-full h-[435px]"
              />
            </View>
            <View className="w-full h-20 flex items-center justify-center relativ ">
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
            <View>
              <TouchableOpacity
                onPress={() => setOpenLandingPage(true)}
                className="transition duration-500 ease-in-out transform hover:scale-110"
              >
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
  )
}
