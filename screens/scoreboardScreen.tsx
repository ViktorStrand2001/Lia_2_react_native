import { View, Text, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import GameButton from "../components/GameScreenComponents/GameButton"
import { useRoute, RouteProp } from "@react-navigation/native"
import { Player } from "../utils/types"
import { Gamepad2Icon } from "lucide-react-native"
import { white } from "tailwindcss/colors"

// behövs för att skicka vidare useState value
type RootStackParamList = {
  Player: undefined
  data: { scoreboard: Player[] }
}
type ScoreboardScreenRouteProp = RouteProp<RootStackParamList, "data">
//

const ScoreboardScreen = (props: any) => {
  // behövs för att skicka vidare useState value
  const route = useRoute<ScoreboardScreenRouteProp>()
  const [leaderboard, setLeaderboard] = useState<Player[]>([])
  useEffect(() => {
    const sortedLeaderboard = [...route.params.scoreboard].sort((a, b) => b.score - a.score)
    setLeaderboard(sortedLeaderboard)
  }, [])
  //

  return (
    <View className="bg-bgBlue min-w-screen min-h-screen flex justify-center items-center pb-20">
      <Text className="font-bold text-2xl mb-3 capitalize">Scoreboard</Text>
      <View className="w-80 h-[450px] border border-black rounded-lg bg-gray-100 ">
        <ScrollView className="mt-4 mb-4 space-y-4">
          {leaderboard.map((player, index) => (
            <View className="flex justify-center items-center w-full">
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
        onPress={() => props.navigation.navigate("Game")}
        buttonStyle="bg-customGreen mt-6"
        icon={<Gamepad2Icon size={60} color={white} />}
      />
    </View>
  )
}

export default ScoreboardScreen
