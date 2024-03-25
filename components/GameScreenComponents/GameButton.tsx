import React from "react"
import { Text, TouchableOpacity, Image, View } from "react-native"

interface ButtonProps {
  onPress: () => void
  text?: string
  buttonStyle?: string
  buttonTextStyle?: string
  image?: string | any
  imageStyle?: string
  icon?: any
}

const GameButton: React.FC<ButtonProps> = ({
  onPress,
  text,
  buttonStyle,
  buttonTextStyle,
  image,
  imageStyle,
  icon,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-48  h-16 rounded-2xl flex flex-row justify-center items-center ${buttonStyle}`}
    >
      <Text className={`text-white text-3xl ${buttonTextStyle}`}>{text}</Text>
      {icon}
      <Image source={image} className={`${imageStyle}`} />
    </TouchableOpacity>
  )
}

export default GameButton
