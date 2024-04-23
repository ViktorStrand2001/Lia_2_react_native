import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native"
import GameButton from "../components/GameScreenComponents/GameButton"
import { Player } from "../utils/types"
import ScoreButton from "../components/ScoreBoardComponents/ScoreButton"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRoute, RouteProp } from "@react-navigation/native"
import { Gamepad2Icon, StarIcon, Timer, TimerIcon, User2Icon } from "lucide-react-native"
import { black, white } from "tailwindcss/colors"

type RootStackParamList = {
  Player: undefined
  data: { players: Player[] }
}

type DistributePointScreenRouteProp = RouteProp<RootStackParamList, "data">

const DistributePointScreen = (props: any) => {
  const route = useRoute<DistributePointScreenRouteProp>()
  const [scoreboard, setScoreboard] = useState<Player[]>([])
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null)
  const [showPointDistribution, setShowPointDistribution] = useState(false)
  const [availablePoints, setAvailablePoints] = useState<number[]>([])
  const [rounds, setRounds] = useState<number>()
  const players = route.params.players
  const isPointsSet = scoreboard.some((player) => player.points === 0)
  const isPlayerTimed = scoreboard.some((player) => player.timer > 0)

  const navigateToScoreboard = async () => {
    const storedRounds = await AsyncStorage.getItem("rounds")
    if (storedRounds) {
      const updatedRounds = parseInt(storedRounds) - 1
      await AsyncStorage.setItem("rounds", updatedRounds.toString())
    }

    props.navigation.navigate("Scoreboard")
  }

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const storedPlayers = await AsyncStorage.getItem("players")
        const storedRounds = await AsyncStorage.getItem("rounds")

        if (storedPlayers && storedRounds) {
          setRounds(parseInt(storedRounds))
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

    savePlayerStats()
  }, [scoreboard])

  useEffect(() => {
    if (isPlayerTimed) {
      // Calculate points to distribute
      const numPlayers = scoreboard.length
      const pointsToDistribute = numPlayers

      // Sort players by timer
      const sortedPlayers = [...scoreboard].sort((a, b) => a.timer - b.timer)

      // Distribute points and update scores
      const updatedScoreboard = sortedPlayers.map((player, index) => ({
        ...player,
        points: player.points + pointsToDistribute - index,
        score: player.score + player.points, // Update the score based on points earned during the round
      }))

      // Update the scoreboard
      setScoreboard(updatedScoreboard)
      console.log(" updated 2", updatedScoreboard)

      // Reset points for the next round
      setAvailablePoints([...Array(players.length).keys()].map((i) => i + 1))
    }
  }, [isPlayerTimed, showPointDistribution])

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

      setAvailablePoints((prevPoints) =>
        prevPoints.filter((point) => point !== pointGiven)
      )

      setShowPointDistribution(false)
      setSelectedPlayerId(null)
    }
  }

  const resetPoints = () => {
    const resetScoreboard = scoreboard.map((player) => ({
      ...player,
      points: 0,
    }))

    setScoreboard(resetScoreboard)
    setAvailablePoints([...Array(players.length).keys()].map((i) => i + 1))
  }

  const navigateToGame = async () => {
    const storedRounds = await AsyncStorage.getItem("rounds")
    if (storedRounds) {
      const updatedRounds = parseInt(storedRounds) - 1
      await AsyncStorage.setItem("rounds", updatedRounds.toString())
    }

    const updatedScoreboard = scoreboard.map((player) => ({
      ...player,
      score: player.score + player.points, // Update the score based on points earned during the round
      points: 0, // Reset points for the next round
      turn: 1,
      timer: 0,
    }))

    setScoreboard(updatedScoreboard)

    props.navigation.navigate("Game")
  }

  console.log("----------- PointScreen -----------");
  console.log("players: ", scoreboard)
  console.log("rounds: ", rounds)
  console.log("scoreboard: ", scoreboard)

  const distributePoint = () => {
    if (!showPointDistribution) return null

    return (
      <View className=" flex justify-center items-center w-screen h-screen bg-black opacity-90  absolute z-50">
        <View className=" bg-white  w-72 h-16 flex justify-center items-center">
          <Text className="text-2xl">
            {scoreboard.find((player) => player.id === selectedPlayerId)?.name}
          </Text>
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
  const numPlayers = scoreboard.length
  const pointsToDistribute = numPlayers

  // Sort players by timer
  const sortedPlayers = [...scoreboard].sort((a, b) => a.timer - b.timer)

  // Calculate total points earned for distribution
  const totalPointsEarned = pointsToDistribute

  const updatedScoreboard = scoreboard.map((player, index) => ({
    ...player,
    points: player.points + totalPointsEarned - index, // Update the score based on points earned during the round
    score: player.points,
    turn: 1,
    timer: 0,
  }))
  console.log("totla point", totalPointsEarned)
  console.log(" updated stats", updatedScoreboard)

  const autoDistributePoints = () => {
    if (!isPlayerTimed || showPointDistribution) return null

    return (
      <>
        <View className="w-full flex justify-center items-center">
          <View className="w-72 flex flex-row justify-evenly space-x-10">
            <User2Icon color={black} />
            <TimerIcon color={black} />
            <StarIcon color={black} />
          </View>
        </View>
        <View className="w-80 h-[450px]">
          <ScrollView className="mt-4 mb-4 space-y-4">
            {sortedPlayers.map((player, index) => (
              <View
                className="flex justify-center items-center w-full"
                key={index}
              >
                <View
                  className={`w-72 h-16 flex flex-row items-center relative shadow ${
                    index % 2 === 0 ? "bg-primarypink" : "bg-primaryBlue"
                  }`}
                >
                  <Text className="italic text-lg pl-6">{player.name}</Text>
                  <View className="w-full flex justify-center items-center absolute">
                    <Text className={`text-lg`}>{player.timer} sec</Text>
                  </View>
                  <View className="absolute right-7">
                    <Text className={`text-lg`}>{`${player.points} pt`}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </>
    )
  }

  const bounceValue = new Animated.Value(0.9)

  const bounceAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0.9,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start()
  }

  useEffect(() => {
    const playersWithZeroScore = scoreboard.filter(
      (player) => player.points === 0
    )
    if (playersWithZeroScore.length > 0) {
      bounceAnimation()
    } else {
      bounceValue.setValue(0)
    }
  }, [scoreboard])

  return (
    <View className="bg-bgBlue min-w-screen min-h-screen flex justify-center items-center pb-20">
      {distributePoint()}
      {autoDistributePoints()}
      {!isPlayerTimed && (
        <View className="w-80 h-[450px]  rounded-lg  ">
          <ScrollView className="mt-4 mb-4 ">
            <View className=" flex flex-row">
              <GameButton
                onPress={() => resetPoints()}
                buttonStyle={"  w-16 h-7  "}
                image={require("../assets/icons/refresh.png")}
                imageStyle=" w-8 h-8"
              />
              <Text className="font-bold text-2xl mb-3 capitalize">
                distribute points
              </Text>
            </View>
            {scoreboard.map((player, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handlePlayerPress(player.id)}
                disabled={player.points > 0}
              >
                <View className="flex justify-center items-center w-full py-3 z-50 ">
                  <Animated.View
                    style={[
                      {
                        transform: [
                          { scale: player.points === 0 ? bounceValue : 1 },
                        ],
                      },
                    ]}
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
                  </Animated.View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {rounds == 0 ? (
        <GameButton
          onPress={() => {
            navigateToScoreboard()
          }}
          buttonStyle={` mt-6 ${
            isPointsSet && !isPlayerTimed ? "bg-gray-300" : "bg-customGreen"
          }`}
          disabled={isPointsSet && !isPlayerTimed}
          image={require("../assets/icons/Leaderboard.png")}
          imageStyle="w-20 h-20"
        />
      ) : (
        <GameButton
          onPress={() => navigateToGame()}
          buttonStyle={` mt-6 ${
            isPointsSet && !isPlayerTimed ? "bg-gray-300" : "bg-customGreen"
          }`}
          disabled={isPointsSet && !isPlayerTimed}
          icon={<Gamepad2Icon size={60} color={white} />}
        />
      )}
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

export default DistributePointScreen
