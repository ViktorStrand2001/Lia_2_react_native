import { View, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import GameTypeOption from "../components/GameTypeComponets/GameTypeOption"

const GameTypeScreen = (props: any) => {
  const [gameType, setGameType] = useState<string>("")

  // sending data to playerScreeen
  const navigateToPlayerScreen = () => {
    if (gameType != "") {
      props.navigation.navigate("SetPlayer", { gameType })
    }
  }
  const navigateToCustomCardScreen = () => {
    props.navigation.navigate("customCards")
  }

  const handleGameTypeSelection = (type: string) => {
    setGameType(type)
  }

  useEffect(() => {
    if (gameType != "") {
      navigateToPlayerScreen()
    }
  }, [gameType])

  return (
    <ScrollView>
      <View className="min-w-full min-h-full bg-bgBlue">
        <View className="flex justify-center items-center space-y-3">
          <View>
            <GameTypeOption
              image={require("../assets/images/group_battle_1.png")}
              gameType="Group-battle"
              onPress={() => {
                navigateToPlayerScreen()
                handleGameTypeSelection("Group-Battles")
              }}
            />
          </View>
          <View className="h-0.5 w-80 bg-black rounded-lg" />
          <View>
            <GameTypeOption
              image={require("../assets/images/free_for_all_1.png")}
              gameType="free for all"
              onPress={() => {
                navigateToPlayerScreen()
                handleGameTypeSelection("Free-for-all")
              }}
            />
          </View>
          <View className="h-0.5 w-80 bg-black rounded-lg" />
          <View>
            <GameTypeOption
              textStyle="text-6xl"
              gameType="quiz!"
              image={require("../assets/images/quiz.png")}
              onPress={() => {
                navigateToPlayerScreen()
                handleGameTypeSelection("Quiz")
              }}
            />
          </View>
          <View className="h-0.5 w-80 bg-black rounded-lg" />
          <View>
            <GameTypeOption
              gameType="Custom Card"
              onPress={() => {
                navigateToCustomCardScreen()
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default GameTypeScreen
