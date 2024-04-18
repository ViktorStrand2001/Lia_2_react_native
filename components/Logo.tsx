import { View, Text } from "react-native"
import React from "react"

interface logoText{
  CSize?: string,
  TextSize?: string
}

const Logo:React.FC<logoText> = ({CSize, TextSize}) => {
  return (
    <View className="flex flex-row items-center -rotate-12 ">
  <Text className={` text-primarypink text-6xl italic font-bold ${CSize}`}>C</Text>
      <Text className={`italic font-bold text-5xl ${TextSize}`}>hallenger</Text>
    </View>
  )
}

export default Logo
