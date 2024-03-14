import { View, Text, TouchableOpacity, Image } from "react-native"
import React, { useEffect, useState } from "react"
import Logo from "../components/Logo"

const GameTypeScreen = (props: any) => {
  const [gameType, setGameType] = useState<string>("")

  // sending data to playerScreeen
  const navigateToPlayerScreen = () => {
    gameType
  }

  console.log(gameType)

  useEffect(() => {
    if (gameType) {
      const timer = setTimeout(() => {
        props.navigation.navigate("SetPlayer", { gameType })
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [gameType, props.navigation])

  console.log(gameType)

  return (
    <View className="min-w-full min-h-full bg-bgBlue">
      <View className="flex justify-center items-center space space-y-3">
        <TouchableOpacity
          onPressOut={() => {
            setGameType("group_battle"), navigateToPlayerScreen()
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
            setGameType("free_for_all"), navigateToPlayerScreen()
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
