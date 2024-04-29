import { View, ScrollView } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import GameTypeOption from "../components/GameTypeComponets/GameTypeOption"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Player } from "../utils/types"
import { useFocusEffect } from "@react-navigation/native"

const GameTypeScreen = (props: any) => {
  const [gameType, setGameType] = useState<string>("")
  const [players, setPlayers] = useState<Player[]>([])

  const navigateToCustomCardScreen = () => {
    props.navigation.navigate("customCards")
  }
  const navigateToCustomGroupCardScreen = () => {
    props.navigation.navigate("customGroupCard")
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

  useFocusEffect(
    useCallback(() => {
      const loadPlayers = async () => {
        try {
          const storedPlayers = await AsyncStorage.getItem("players")
          if (storedPlayers !== null) {
            setPlayers(JSON.parse(storedPlayers))
          }
        } catch (error) {
          console.error("Error loading player data:", error)
        }
      }
      loadPlayers()
    }, [])
  )

  /* TODO - 
  Not working as it should?
  */
  const navigateToPlayerScreen = () => {
    // Reset player stats
    const updatedPlayers = players.map((player) => ({
      ...player,
      points: 0,
      score: 0,
      timer: 0,
      turn: 1,
      right: 0,
      wrong: 0,
    }))

    // Update the players array with the reset stats
    setPlayers(updatedPlayers)

    // Log the updated player stats

    // Navigate to player screen after a small delay (for demonstration purposes)
    setTimeout(() => {
      if (gameType !== "") {
        console.log("Navigating to player screen...")
        props.navigation.navigate("SetPlayer")
      }
    }, 300) // Adjust the delay as needed
  }

  useEffect(() => {
    const saveGamesettings = async () => {
      try {
        await AsyncStorage.setItem("Gametype", JSON.stringify(gameType))
        await AsyncStorage.setItem("players", JSON.stringify(players))
        await AsyncStorage.removeItem("rounds")
        console.log(" asynstorage ", gameType)
      } catch (error) {
        console.error("Error saving players:", error)
      }
    }

    saveGamesettings()
  }, [gameType, players])

  console.log("----------- GameTypeScreen ------------")
  console.log("Gametype: ", gameType)
  console.log("players: ", players)

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
              gameType="Custom Free for all Card"
              onPress={() => {
                navigateToCustomCardScreen()
              }}
            />
          </View>
          <View className="h-0.5 w-80 bg-black rounded-lg" />
          <View>
            <GameTypeOption
              gameType="Custom Group Card"
              onPress={() => {
                navigateToCustomGroupCardScreen()
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
