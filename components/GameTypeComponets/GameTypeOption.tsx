import { View, Text, TouchableOpacity, Image } from "react-native"
import React from "react"

interface GameTypeOptionProps {
  gameType?: string
  image?: any
  onPress?: () => void
}

const GameTypeOption: React.FC<GameTypeOptionProps> = ({
  image,
  gameType,
  onPress,
}) => (
  <TouchableOpacity onPress={onPress}>
    <View className="w-72 h-72 rounded-lg flex justify-center items-center relative bg-gray-400">
      <Image source={image} className="h-full rounded-lg" />
      <View className="absolute">
        <Text className="text-white text-4xl -rotate-12 capitalize">
          {gameType}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
)

export default GameTypeOption
