import { View, Text, TouchableOpacity, Image } from "react-native"
import React from "react"

interface GameTypeOptionProps {
  gameType?: string
  image?: any
  onPress?: () => void
  textStyle?: string
}

const GameTypeOption: React.FC<GameTypeOptionProps> = ({
  image,
  gameType,
  onPress,
  textStyle
}) => (
  <TouchableOpacity onPress={onPress}>
    <View className="w-72 h-72 rounded-lg flex justify-center items-center relative bg-gray-400">
      <Image source={image} className="h-full w-full rounded-lg" />
      <View className="absolute">
        <Text className={`text-white text-5xl -rotate-12 capitalize font-bold italic ${textStyle}`}>
          {gameType}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
)

export default GameTypeOption
