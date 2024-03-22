import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
import React, { useEffect, useState } from "react"
import GameButton from "../components/GameScreenComponents/GameButton"
import { useRoute, RouteProp } from "@react-navigation/native"
import { Player } from "../utils/types"
import ScoreButton from "../components/ScoreBoardComponents/ScoreButton"

type RootStackParamList = {
  Player: undefined
  SetPlayer: { players: Player[] }
}
type PlayerScreenRouteProp = RouteProp<RootStackParamList, "SetPlayer">

const ScoreboardScreen = () => {
  const route = useRoute<PlayerScreenRouteProp>()
  const [scoreboard, setScoreboard] = useState<Player[]>([])
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null)
  const [showPointDistribution, setShowPointDistribution] = useState(false)
  const [availablePoints, setAvailablePoints] = useState<number[]>([])
  const players = route.params.players

  useEffect(() => {
    if (players) {
      setScoreboard(players)
      //shows point buttons baste on players
      setAvailablePoints([...Array(players.length).keys()].map((i) => i + 1))
    }
  }, [players])

  const handlePlayerPress = (playerId: number) => {
    setShowPointDistribution(true)
    setSelectedPlayerId(playerId)
  }

  const handleScoreButtonPress = (points: number) => {
    if (selectedPlayerId !== null) {
      // add score to player
      setScoreboard((prevScoreboard) =>
        prevScoreboard.map((player) =>
          player.id === selectedPlayerId
            ? { ...player, score: player.score + points }
            : player
        )
      )
      // removes used score button
      setAvailablePoints((prevPoints) =>
        prevPoints.filter((point) => point !== points)
      )
      setShowPointDistribution(false)
      setSelectedPlayerId(null)
    }
  }

  const diatributePoint = () => {
    return (
      <View className=" flex justify-center items-center w-screen h-screen bg-black opacity-90  absolute z-50">
        <View className=" bg-white  w-72 h-16"></View>
        <View style={styles.gridContainer}>
          {availablePoints.map((point, index) => (
            <ScoreButton
              onPress={() => handleScoreButtonPress(point)}
              text={`${point}`}
              buttonStyle={"bg-primaryGold"}
              key={index}
            />
          ))}
        </View>
      </View>
    )
  }

  return (
    <View className="bg-bgBlue min-w-screen min-h-screen flex justify-center items-center pb-20">
      {showPointDistribution && diatributePoint()}
      <Text className="font-bold text-2xl mb-3 capitalize">
        distribute points
      </Text>
      <View className="w-80 h-[450px] border border-black rounded-lg bg-gray-100 ">
        <ScrollView className="mt-4 mb-4 space-y-4">
          {scoreboard.map((player, index) => (
            <TouchableOpacity onPress={() => handlePlayerPress(player.id)}>
              <View className="flex justify-center items-center w-full">
                <View
                  className={` w-72 h-16 flex justify-center items-center ${
                    index % 2 === 0 ? "bg-primarypink" : "bg-primaryBlue"
                  }`}
                >
                  <Text className="italic text-lg">{player.name}</Text>
                  <Text>{player.score}</Text>
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

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start", // Align items to the top of the container
    padding: 10,
  },
})

export default ScoreboardScreen
