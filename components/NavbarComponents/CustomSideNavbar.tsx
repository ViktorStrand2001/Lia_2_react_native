import { Gamepad2Icon, TrophyIcon, UsersRoundIcon } from "lucide-react-native"
import { View, TouchableOpacity, Text } from "react-native"
import Logo from "../Logo"
import { StackNavigationProp } from "@react-navigation/stack"
import { useNavigation } from "@react-navigation/native"
import React from "react"

type RootStackParamList = {
  Players: undefined
  Gamemode: undefined
  Scoreboard: undefined
  // Add other screen names here
}

interface onPress {
  onPress: () => void
}

type ScreenNavigationProp = StackNavigationProp<RootStackParamList>

const CustomSideNavbar: React.FC<onPress> = ({ onPress }) => {
  const navigation = useNavigation<ScreenNavigationProp>()

  const navigateToScreen = (screenName: keyof RootStackParamList) => {
    navigation.navigate(screenName) // Close the menu after navigation
  }
  return (
    <View className="w-[50%] h-full absolute bg-bgBlue opacity-90 z-50">
      <View className="flex items-center mt-10">
        <Logo CSize="text-4xl" TextSize="text-3xl" />
      </View>
      <View className="flex items-start w-full mt-8 ml-6 space-y-3">
        <TouchableOpacity
          className="flex flex-row items-center justify-center space-x-2"
          onPress={() => {
            onPress()
            navigateToScreen("Scoreboard")
          }}
        >
          <TrophyIcon size={40} className="text-black" />
          <Text className="text-black flex justify-center items-center text-lg capitalize">
            scoreboard
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex flex-row items-center justify-center space-x-2"
          onPress={() => {
            onPress()
            navigateToScreen("Gamemode")
          }}
        >
          <Gamepad2Icon size={40} className="text-black" />
          <Text className="text-black flex justify-center items-center text-lg capitalize">
            game
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex flex-row items-center justify-center space-x-2"
          onPress={() => {
            onPress()
            navigateToScreen("Players")
          }}
        >
          <UsersRoundIcon size={40} className="text-black" />
          <Text className="text-black flex justify-center items-center text-lg capitalize">
            players
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CustomSideNavbar
