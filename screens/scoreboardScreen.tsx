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

const ScoreboardScreen = (props: any) => {
  const [leaderboard, setLeaderboard] = useState<Player[]>([])
  const [gameType, setGameType] = useState<string>("")

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const storedPlayers = await AsyncStorage.getItem("players")
        const StoredGametype = await AsyncStorage.getItem("Gametype")
        if (storedPlayers && StoredGametype) {
          setLeaderboard(JSON.parse(storedPlayers))
          setGameType(JSON.parse(StoredGametype))
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
    const updatedScoreboard = leaderboard.map((player, index) => ({
      ...player,
      points: 0,
      score: 0,
      timer: 0,
      turn: 1,
      right: 0,
      wrong: 0,
    }))
    setLeaderboard(updatedScoreboard)
    props.navigation.navigate("SetPlayer")
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
  console.log(" Gametype", gameType)

  return (
    <View className="bg-bgBlue min-w-screen min-h-screen flex justify-center items-center pb-20">
      {gameType == "Quiz" ? (
        <>{QuizResult()}</>
      ) : (
        <>
          <Text className="font-bold text-2xl mb-3 capitalize">Scoreboard</Text>
          <View className="w-80 h-[450px] border border-black rounded-lg bg-gray-100 ">
            <ScrollView className="mt-4 mb-4 space-y-4">
              {leaderboard.map((player, index) => (
                <View
                  className="flex justify-center items-center w-full"
                  key={index}
                >
                  <View
                    className={` w-72 h-16 flex flex-row justify-center items-center relative ${
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
          </View>
          <GameButton
            onPress={() => navigateToGame()}
            buttonStyle="bg-customGreen mt-6"
            icon={<Gamepad2Icon size={60} color={white} />}
          />
        </>
      )}
    </View>
  )
}

export default ScoreboardScreen
