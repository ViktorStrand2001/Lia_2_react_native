import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
import React, { useEffect, useState } from "react"
import GameButton from "../components/GameScreenComponents/GameButton"
import { Player } from "../utils/types"
import ScoreButton from "../components/ScoreBoardComponents/ScoreButton"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRoute, RouteProp } from "@react-navigation/native"

type RootStackParamList = {
  Player: undefined
  data: { players: Player[] }
}
type DiatributePointScreenRouteProp = RouteProp<RootStackParamList, "data">

const DiatributePointScreen = (props: any) => {
  const route = useRoute<DiatributePointScreenRouteProp>()
  const [scoreboard, setScoreboard] = useState<Player[]>([])
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null)
  const [showPointDistribution, setShowPointDistribution] = useState(false)
  const [availablePoints, setAvailablePoints] = useState<number[]>([])

  const players = route.params.players
  const isPointsSet = scoreboard.some((player) => player.points === 0)

  const navigateToScoreboard = () => {
    props.navigation.navigate("Scoreboard", { scoreboard })
  }

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const storedPlayers = await AsyncStorage.getItem("players")
        if (storedPlayers) {
          setScoreboard(JSON.parse(storedPlayers))
        }
      } catch (error) {
        console.error("Error fetching players:", error)
      }
    }

    fetchPlayers()
  }, [])

  useEffect(() => {
    if (players) {
      setAvailablePoints([...Array(players.length).keys()].map((i) => i + 1))
    }
  }, [players])

  useEffect(() => {
    const savePlayerStats = async () => {
      try {
        await AsyncStorage.setItem("players", JSON.stringify(scoreboard))
      } catch (error) {
        console.error("Error saving players:", error)
      }
    }
    console.log(scoreboard)
    savePlayerStats()
  }, [scoreboard])

  const handlePlayerPress = (playerId: number) => {
    setShowPointDistribution(true)
    setSelectedPlayerId(playerId)
  }

  const handleScoreButtonPress = (pointGiven: number) => {
    if (selectedPlayerId !== null) {
      setScoreboard((prevScoreboard) =>
        prevScoreboard.map((player) =>
          player.id === selectedPlayerId
            ? { ...player, points: player.points + pointGiven }
            : player
        )
      )
      setScoreboard((prevScoreboard) =>
        prevScoreboard.map((player) =>
          player.id === selectedPlayerId
            ? { ...player, score: player.points + player.score }
            : player
        )
      )
      // removes used score button
      setAvailablePoints((prevPoints) =>
        prevPoints.filter((point) => point !== pointGiven)
      )
      setShowPointDistribution(false)
      setSelectedPlayerId(null)
    }
  }

  const diatributePoint = () => {
    const selectedPlayer = scoreboard.find(
      (player) => player.id === selectedPlayerId
    )

    return (
      <View className=" flex justify-center items-center w-screen h-screen bg-black opacity-90  absolute z-50">
        <View className=" bg-white  w-72 h-16 flex justify-center items-center">
          <Text className="text-2xl">{selectedPlayer?.name}</Text>
        </View>
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
            <TouchableOpacity
              key={index}
              onPress={() => handlePlayerPress(player.id)}
              disabled={player.points > 0}
            >
              <View className="flex justify-center items-center w-full">
                <View
                  className={` w-72 h-16 flex flex-row justify-center items-center relative ${
                    index % 2 === 0 ? "bg-primarypink" : "bg-primaryBlue"
                  }`}
                >
                  <Text className="italic text-lg">{player.name}</Text>
                  <View className="absolute right-7">
                    <Text
                      className={`text-lg  ${
                        player.points == 0 ? "hidden" : "block"
                      }`}
                    >
                      + {player.points} pt
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <GameButton
        onPress={() => navigateToScoreboard()}
        buttonStyle={` mt-6 ${isPointsSet ? "bg-gray-300" : "bg-customGreen"}`}
        disabled={isPointsSet}
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

export default DiatributePointScreen
