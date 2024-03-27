import React from "react"
import { Text, View, Image } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Quiz } from "../../utils/types"

interface QuizCardProps {
  quizData: Quiz | null
  refreshQuiz: () => void
}

const QuizCard: React.FC<QuizCardProps> = ({ quizData, refreshQuiz }) => {
  console.log("component", quizData)
  if (!quizData) {
    return null
  }

  return (
    <View className="bg-customGreen w-80 h-[400px] flex flex-col items-center rounded-2xl relative">
      <View className="top-2 left-2 flex justify-start absolute">
        <TouchableOpacity onPress={refreshQuiz}>
          <Image
            source={require("../../assets/icons/refresh.png")}
            className="w-10 h-10"
          />
        </TouchableOpacity>
      </View>
      <View className="px-3 w-full mt-12">
        <View className=" items-center justify-center ">
          <Text className="font-bold text-2xl item text-center">
            {quizData.Title}
          </Text>
        </View>
        <View className="px-3">
          <Text>{quizData.Context}</Text>
        </View>
      </View>
    </View>
  )
}

export default QuizCard
