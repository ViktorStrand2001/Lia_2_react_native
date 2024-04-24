import { View, Text, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import GameButton from "../components/GameScreenComponents/GameButton"
import { Player } from "../utils/types"
import {
  CheckSquare,
  CheckSquare2,
  Gamepad2Icon,
  XSquare,
  icons,
} from "lucide-react-native"
import { white } from "tailwindcss/colors"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { TouchableOpacity } from "react-native-gesture-handler"

const ScoreboardScreen = (props: any) => {
  const [leaderboard, setLeaderboard] = useState<Player[]>([])
  const [gameType, setGameType] = useState<string>("")
  const [rounds, setRounds] = useState<number>()

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const storedPlayers = await AsyncStorage.getItem("players")
        const StoredGametype = await AsyncStorage.getItem("Gametype")
        const StoredRounds = await AsyncStorage.getItem("rounds")
        if (storedPlayers && StoredGametype && StoredRounds) {
          setLeaderboard(JSON.parse(storedPlayers))
          setGameType(JSON.parse(StoredGametype))
          setRounds(parseInt(StoredRounds))
        }
      } catch (error) {
        console.error("Error fetching players:", error)
      }
    }

    fetchPlayers()
  }, [props.navigation])

  useEffect(() => {
    const savePlayerStats = async () => {
      try {
        await AsyncStorage.setItem("players", JSON.stringify(leaderboard))
      } catch (error) {
        console.error("Error saving players:", error)
      }
    }
    console.log("svae: ", leaderboard)
    savePlayerStats()
  }, [leaderboard])

  // behövs för att skicka vidare useState value
  useEffect(() => {
    const sortedLeaderboard = [...leaderboard].sort((a, b) => b.score - a.score)
    setLeaderboard(sortedLeaderboard)
  }, [])
  //

  const navigateToGame = () => {
    if (rounds !== undefined && rounds <= 0) {
      const updatedScoreboard = leaderboard.map((player) => ({
        ...player,
        points: 0,
        score: 0,
        timer: 0,
        turn: 1,
        right: 0,
        wrong: 0,
      }))
      setLeaderboard(updatedScoreboard)
      props.navigation.navigate("GameType")
    } else {
      props.navigation.navigate("Game")
    }
  }

  const QuizResult = () => {
    return (
      <View className=" w-full h-full flex justify-center items-center">
        <View className="  w-full h-[450px]  flex flex-row items-center justify-center">
          <View className=" h-72 w-[48%]  items-center relative">
            <CheckSquare2 size={80} className="text-customGreen" />
            {leaderboard.map((player) => (
              <Text className=" absolute bottom-10 text-5xl">
                {player.right}
              </Text>
            ))}
          </View>
          <View className=" bg-black h-96 w-[1px]" />
          <View className="  h-72 w-[48%] items-center">
            <XSquare size={80} className=" text-red-600 item " />
            {leaderboard.map((player) => (
              <Text className=" absolute bottom-10 text-5xl">
                {player.wrong}
              </Text>
            ))}
          </View>
        </View>
        <GameButton
          onPress={() => navigateToGame()}
          buttonStyle="bg-customGreen mt-6"
          icon={<Gamepad2Icon size={60} color={white} />}
        />
      </View>
    )
  }

  console.log("------------ Scoreboard --------------")
  console.log("GameType: ", gameType)
  console.log("players: ", leaderboard)
  console.log("rounds: ", rounds)

  return (
    <View className="flex-1">
      {gameType == "Quiz" ? (
        <>{QuizResult()}</>
      ) : (
        <View className="w-full h-full flex justify-center items-center relative">
          <Text className="font-bold text-2xl  capitalize py-4">
            Scoreboard
          </Text>

            <ScrollView className="space-y-4 w-full">
              {leaderboard.map((player, index) => (
                <View
                  className="flex justify-center items-center w-full"
                  key={index}
                >
                  <View
                    className={` w-72 h-16 flex flex-row justify-center z-50 items-center relative border shadow-md ${
                      (index === 0 && "bg-primaryGold") ||
                      (index === 1 && "bg-primarySilver") ||
                      (index === 2 && "bg-primaryBronze") ||
                      (index % 2 === 0 ? "bg-primarypink" : "bg-primaryBlue")
                    }`}
                  >
                    <Text className="italic text-lg">{player.name}</Text>
                    <View className="absolute right-7">
                      <Text
                        className={`text-lg  ${
                          player.score == 0 ? "hidden" : "block"
                        }`}
                      >
                        {player.score}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          <View className="mb-7 mt-20">
            <GameButton
              onPress={() => navigateToGame()}
              buttonStyle="bg-customGreen"
              icon={<Gamepad2Icon size={60} color={white} />}
            />
          </View>
        </View>
      )}
    </View>
  )
}

export default ScoreboardScreen
