import { View, Text, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import GameButton from "../components/GameScreenComponents/GameButton"
import { Player } from "../utils/types"
import { Gamepad2Icon } from "lucide-react-native"
import { white } from "tailwindcss/colors"
import AsyncStorage from "@react-native-async-storage/async-storage"

const ScoreboardScreen = (props: any) => {
  const [leaderboard, setLeaderboard] = useState<Player[]>([])

   useEffect(() => {
     const fetchPlayers = async () => {
       try {
         const storedPlayers = await AsyncStorage.getItem("players")
         if (storedPlayers) {
           setLeaderboard(JSON.parse(storedPlayers))
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
    console.log("svae: ",leaderboard)
    savePlayerStats()
  }, [leaderboard])
  
  // behövs för att skicka vidare useState value
  useEffect(() => {
    const sortedLeaderboard = [...leaderboard].sort(
      (a, b) => b.score - a.score
    )
    setLeaderboard(sortedLeaderboard)
  }, [])
  //

  const navigateToGame = () => {
  props.navigation.navigate("SetPlayer");
};

  return (
    <View className="bg-bgBlue min-w-screen min-h-screen flex justify-center items-center pb-20">
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
    </View>
  )
}

export default ScoreboardScreen
