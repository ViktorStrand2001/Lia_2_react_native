import React from "react"
import { Text, View, Image } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Card } from "../../utils/types"

interface ChallengeCardProps {
  documentData: Card | null
  refreshChallenge: () => void
  bgcolor: string
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  documentData,
  refreshChallenge,
  bgcolor
}) => {
  


  if (!documentData) {
    return null
  }



  return (
    <View
      className={`${bgcolor} w-80 min-h-[500px] pb-4 flex flex-col items-center rounded-2xl relative border`}
    >
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
          <Text className="font-bold text-2xl item text-center z-50">
            {documentData.Title}
          </Text>
        </View>
        <View className="px-3">
          <Text className="font-bold mt-5">Instructions: </Text>
          <Text>{documentData.Instructions}</Text>

          <Text className="font-bold mt-5">You will need: </Text>
          <Text>{documentData.YouWillNeed}</Text>

          <Text className="font-bold mt-5">Rules: </Text>
          <Text>{documentData.Rules}</Text>
        </View>
      </View>
    </View>
  )
}

export default ChallengeCard
