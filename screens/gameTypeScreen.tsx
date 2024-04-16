import { View, ScrollView } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import GameTypeOption from "../components/GameTypeComponets/GameTypeOption"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect } from "@react-navigation/native"

const GameTypeScreen = (props: any) => {
  const [gameType, setGameType] = useState<string>("")

  // sending data to playerScreeen
  const navigateToPlayerScreen = () => {
    if (gameType != "") {
      props.navigation.navigate("SetPlayer")
    }
  }
  const navigateToCustomCardScreen = () => {
    props.navigation.navigate("customCards")
  }

  const navigateToCustomQuizCardScreen = () => {
    props.navigation.navigate("customQuiz")
  }

  const handleGameTypeSelection = (type: string) => {
    setGameType(type)
  }

  useEffect(() => {
    if (gameType != "") {
      navigateToPlayerScreen()
    }
  }, [gameType])

  useEffect(() => {
    const saveGamesettings = async () => {
      try {
        await AsyncStorage.setItem("Gametype", JSON.stringify(gameType))

        console.log(" asynstorage ", gameType)
      } catch (error) {
        console.error("Error saving players:", error)
      }
    }

    saveGamesettings()
  }, [gameType])

  console.log("Gametype :", gameType)

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

          <View className="h-0.5 w-80 bg-black rounded-lg" />
          <View>
            <GameTypeOption
              gameType="customQuiz"
              onPress={() => {
                navigateToCustomQuizCardScreen()
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default GameTypeScreen
