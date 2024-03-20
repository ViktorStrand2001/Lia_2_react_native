import React from "react"
import { Text, View, Image } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Card } from "../../utils/types"

interface ChallengeCardProps {
  documentData: Card | null
  refreshChallenge: () => void
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  documentData,
  refreshChallenge,
}) => {
  if (!documentData) {
    return null
  }

  return (
    <View className="bg-customGreen w-80 h-[400px] flex flex-col items-center rounded-2xl relative">
      <View className="top-2 left-2 flex justify-start absolute">
        <TouchableOpacity onPress={refreshChallenge}>
          <Image
            source={require("../../assets/icons/refresh.png")}
            className="w-10 h-10"
          />
        </TouchableOpacity>
      </View>
      <View className="px-3 w-full mt-12">
        <View className=" items-center justify-center ">
          <Text className="font-bold text-2xl item text-center">
            {documentData.title}
          </Text>
        </View>
        <View className="px-3">
            <Text className="font-bold mt-3">Instructions: </Text>
            <Text>{documentData.instructions}</Text>

            <Text className="font-bold mt-3">You will need: </Text>
            <Text>{documentData.youWillNeed}</Text>

            <Text className="font-bold mt-3">Rules: </Text>
            <Text>{documentData.rules}</Text>
        </View>
      </View>
    </View>
  )
}

export default ChallengeCard
