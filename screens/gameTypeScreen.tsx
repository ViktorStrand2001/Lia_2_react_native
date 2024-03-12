import { View, Text, TouchableOpacity, Image } from "react-native"
import React, { useEffect, useState } from "react"
import Logo from "../components/Logo"

const GameTypeScreen = (props: any) => {
    const [gameType, setGameType] = useState<string>("")
    
    useEffect(() => {
      console.log(gameType)
    }, [console.log(gameType)])

  return (
    <View className="min-w-full min-h-full bg-bgBlue">
      <View className="flex justify-center items-center space space-y-3">
        <TouchableOpacity
          onPressOut={() => {
            props.navigation.navigate("Settings"), setGameType("group_battle")
          }}
        >
          <View className=" w-72 h-72 rounded-lg flex justify-center items-center relative">
            <Image
              source={require("../assets/group_battle_1.png")}
              className="h-full rounded-lg"
            />
            <View className="absolute">
              <Text className="text-white text-4xl -rotate-12 capitalize">
                group battle
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View className="h-0.5 w-80 bg-black rounded-lg" />
        <TouchableOpacity
          onPressOut={() => {
            props.navigation.navigate("Settings"), setGameType("free_for_all")
          }}
        >
          <View className=" bg-gray-900 w-72 h-72 rounded-lg flex justify-center items-center relative">
            <Image
              source={require("../assets/free_for_all_1.png")}
              className="h-full rounded-lg"
            />
            <View className="absolute">
              <Text className="text-white text-4xl -rotate-12 capitalize">
                free for all
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default GameTypeScreen
