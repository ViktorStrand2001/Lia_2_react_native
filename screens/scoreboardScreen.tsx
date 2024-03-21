import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import React, { useEffect, useState } from "react"
import GameButton from "../components/GameScreenComponents/GameButton"
import { useRoute, RouteProp } from "@react-navigation/native"
import { Player } from "../utils/types"

type RootStackParamList = {
  Player: undefined
  SetPlayer: { players: Player[] }
}
type PlayerScreenRouteProp = RouteProp<RootStackParamList, "SetPlayer">

const ScoreboardScreen = () => {
  const route = useRoute<PlayerScreenRouteProp>()
  const [scoreboard, setScoreboard] = useState<Player[]>([])
  const players = route.params.players

  useEffect(() => {
    if (players) {
      setScoreboard(players)
    }
  }, [players])

  console.log(players)
  console.dir(scoreboard)

  return (
    <View className="bg-bgBlue min-w-screen min-h-screen flex justify-center items-center pb-20">
      <Text className="font-bold text-2xl mb-3 capitalize">
        distribute points
      </Text>
      <View className="w-80 h-[450px] border border-black rounded-lg bg-gray-100 ">
        <ScrollView className="mt-4 mb-4 space-y-4">
          {scoreboard.map((player, index) => (
            <TouchableOpacity >
              <View className="flex justify-center items-center w-full">
                <View
                  className={` w-72 h-16 flex justify-center items-center ${
                    index % 2 === 0 ? "bg-primarypink" : "bg-primaryBlue"
                  }`}
                >
                  <Text className="italic text-lg">{player.name}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <GameButton
        onPress={() => ""}
        buttonStyle="bg-gray-200 mt-6"
        image={require("../assets/icons/Leaderboard.png")}
        imageStyle="w-20 h-20"
      />
    </View>
  )
}

export default ScoreboardScreen
