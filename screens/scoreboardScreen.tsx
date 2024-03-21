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

type RootStackParamList = {
  Player: undefined
  SetPlayer: { players: Player[] }
}
type PlayerScreenRouteProp = RouteProp<RootStackParamList, "SetPlayer">

const ScoreboardScreen = () => {
  const route = useRoute<PlayerScreenRouteProp>()
  const [scoreboard, setScoreboard] = useState<Player[]>([])
  const [toggle, setToggle] = useState<boolean>(false)
  const players = route.params.players

  const showPoints = () => {
    setToggle(true)
    console.log(toggle)
  }
  const showsenpoint = () => {
    setToggle(false)
    console.log(toggle)
  }

  useEffect(() => {
    if (players) {
      setScoreboard(players)
    }
  }, [players])

  console.log(players)
  console.dir(scoreboard)

  console.log(toggle)

  const diatributePoint = () => {
    return (
      <View className=" flex justify-center items-center w-screen h-screen bg-black opacity-90  absolute z-50">
        <View className=" bg-white  w-72 h-16"></View>

        <View style={styles.gridContainer}>
          {scoreboard.map((player, index) => (
            <TouchableOpacity key={index} style={styles.gridItem}>
              <View>
                <Text>{index + 1}pt</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    )
  }

  return (
    <View className="bg-bgBlue min-w-screen min-h-screen flex justify-center items-center pb-20">
      {!toggle && diatributePoint()}
      <Text className="font-bold text-2xl mb-3 capitalize">
        distribute points
      </Text>
      <View className="w-80 h-[450px] border border-black rounded-lg bg-gray-100 ">
        <ScrollView className="mt-4 mb-4 space-y-4">
          {scoreboard.map((player, index) => (
            <TouchableOpacity onPress={showPoints}>
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

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start", // Align items to the top of the container
    padding: 10,
  },
  gridItem: {
    width: "30%", // Adjust this percentage as needed for 3 items per row
    height: 40,
      justifyContent: "center",
    alignItems: "center",
    marginVertical: 5, // Adjust vertical margin as needed
    marginHorizontal: 5, // Adjust horizontal margin as needed for spacing between items
    backgroundColor: "lightblue",
  },
})
export default ScoreboardScreen
