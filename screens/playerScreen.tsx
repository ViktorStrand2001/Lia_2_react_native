import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native"
import React, { useEffect, useState } from "react"
import { Gamepad2Icon, PlusCircleIcon, X } from "lucide-react-native"
import { black, white } from "tailwindcss/colors"
import { useRoute, RouteProp } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Player } from "../utils/types"

type RootStackParamList = {
  GameType: undefined
  SetPlayer: { gameType: string }
}
type PlayerScreenRouteProp = RouteProp<RootStackParamList, "SetPlayer">

const PlayerScreen = (props: any) => {
  const [playerName, setPlayerName] = useState<string>("")
  const [players, setPlayers] = useState<Player[]>([])
  const route = useRoute<PlayerScreenRouteProp>()
  const [showInput, setShowInput] = useState<boolean>(false)

    const navigateToScoreboard = () => {
      props.navigation.navigate("Scoreboard", { players })
    }

  const addPlayer = () => {
    if (playerName.trim() !== "") {
      const newPlayer: Player = {
        name: playerName,
        score: 0,
        id: players.length + 1,
      }

      setPlayers([...players, newPlayer])
      setPlayerName("")
      setShowInput(false)
      console.log(newPlayer)
    }
  }

  const removePlayer = (id: number) => {
    const updatedPlayers = players.filter((player) => player.id !== id)
    setPlayers(updatedPlayers)
  }

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        const storedPlayers = await AsyncStorage.getItem("players")
        if (storedPlayers !== null) {
          setPlayers(JSON.parse(storedPlayers))
        }
        console.log("players are from", players);
        
      } catch (error) {
        console.error("Error loading players:", error)
      }
    }

    loadPlayers()
  }, [])

  useEffect(() => {
    const savePlayers = async () => {
      try {
        await AsyncStorage.setItem("players", JSON.stringify(players))
      } catch (error) {
        console.error("Error saving players:", error)
      }
    }

    savePlayers()
  }, [players])

  useEffect(() => {
    navigateToScoreboard()
  }, [])

  const renderTextBastOnGameType = () => {
    const typeOfGame = route.params.gameType
    if (typeOfGame === "free_for_all") {
      return (
        <Text className="text-2xl font-medium capitalize">
          Type your names!
        </Text>
      )
    } else {
      return (
        <Text className="text-2xl font-medium capitalize">
          Type your team names!
        </Text>
      )
    }
  }

  return (
    <View className="flex min-w-full min-h-full bg-bgBlue items-center relative">
      <View className="justify-center items-center bg-red">
        {renderTextBastOnGameType()}
      </View>

      <View className=" mt-10 h-[60%]">
        <View className="flex justify-center items-center mb-3">
          {!showInput && (
            <TouchableOpacity
              onPress={() => setShowInput(true)}
              className="w-10"
            >
              <View className="items-center justify-center">
                <PlusCircleIcon size={40} color={black} />
              </View>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
          className="w-screen space-y-3 "
        >
          {showInput && (
            <View>
              <TextInput
                autoFocus
                placeholder="Enter Names"
                value={playerName}
                onChangeText={(text) => setPlayerName(text)}
                onSubmitEditing={() => {
                  addPlayer()
                }}
                onBlur={() => {
                  if (playerName.trim() === "") {
                    setShowInput(false)
                  } else {
                    addPlayer()
                  }
                }}
                className={`w-52 h-10 border pl-4   justify-center rounded-lg shadow shadow-black bg-white`}
              />
            </View>
          )}
          {players
            .slice(0)
            .reverse()
            .map((player, index) => (
              <View
                key={index}
                className="w-52 h-10 border justify-center rounded-lg  bg-white relative"
              >
                <Text className="pl-4">{player.name}</Text>
                <View className=" justify-center item-center bg-lime-400 absolute ">
                  <TouchableOpacity
                    onPress={() => removePlayer(player.id)}
                    className=" ml-44 absolute"
                  >
                    <View>
                      <X size={30} className="text-red-700" />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </ScrollView>
      </View>

      <View className="h-32 justify-center items absolute bottom-16">
        <TouchableOpacity onPressOut={() => props.navigation.navigate("Game")}>
          <View className="bg-customGreen px-20 rounded-3xl flex items-center justify-center border">
            <Gamepad2Icon size={60} color={white} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPressOut={() => navigateToScoreboard()}>
          <View className="px-20 rounded-3xl flex items-center justify-center border">
            <Text>scoreboard</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default PlayerScreen
