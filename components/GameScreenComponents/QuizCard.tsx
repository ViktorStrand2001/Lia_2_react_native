import React from "react"
import { Text, View, Image, TouchableOpacity } from "react-native"

import { Quiz } from "../../utils/types"
import { cardColors } from "../../lib/cardColors"

interface QuizCardProps {
  quizData: Quiz | null
  refreshQuiz: () => void
  bgColor: string
}

const QuizCard: React.FC<QuizCardProps> = ({ quizData, refreshQuiz, bgColor }) => {
  
  const colors = cardColors[Math.floor(Math.random() * cardColors.length)]
  
  if (!quizData) {
    return null
  }

  return (
    <View className={`bg-${bgColor} w-80 h-[400px] flex flex-col items-center rounded-2xl relative border`}>
      <View className="top-2 left-2 flex justify-start absolute">
        <TouchableOpacity onPress={refreshQuiz}>
          <Image
            source={require("../../assets/icons/refresh.png")}
            className="w-10 h-10"
          />
        </TouchableOpacity>
      </View>
      <View className="px-3 w-full mt-12 items-center justify-center flex text-center">
        <View className=" items-center justify-center ">
          <Text className="font-bold text-2xl item text-center">
            {quizData.Title}
          </Text>
        </View>
        <View className="px-3">
          <Text className="text-base text-center mt-7 ">
            {quizData.Context}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default QuizCard
