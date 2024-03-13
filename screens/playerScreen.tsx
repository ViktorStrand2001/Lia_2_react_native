import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native"
import React, { useEffect, useState } from "react"
import { Gamepad2Icon, PlusCircleIcon } from "lucide-react-native"
import { black, white } from "tailwindcss/colors"
import { useRoute, RouteProp } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface Player {
  name: string
  score: number
}

type RootStackParamList = {
  GameType: undefined
  SetPlayer: { gameType: string }
}
type PlayerScreenRouteProp = RouteProp<RootStackParamList, "SetPlayer">

const PlayerScreen = () => {
  const [playerName, setPlayerName] = useState<string>("")
  const [players, setPlayers] = useState<Player[]>([])
  const route = useRoute<PlayerScreenRouteProp>()

  const addPlayer = () => {
    if (playerName.trim() !== "") {
      const newPlayer: Player = {
        name: playerName,
        score: 0,
      }

      setPlayers([...players, newPlayer])
      setPlayerName("")
    }
  }

  useEffect(() => {
    // Load players from AsyncStorage when component mounts
    const loadPlayers = async () => {
      try {
        const storedPlayers = await AsyncStorage.getItem("players")
        if (storedPlayers !== null) {
          setPlayers(JSON.parse(storedPlayers))
        }
      } catch (error) {
        console.error("Error loading players:", error)
      }
    }

    loadPlayers()
  }, [])

  useEffect(() => {
    // Save players to AsyncStorage whenever players state changes
    const savePlayers = async () => {
      try {
        await AsyncStorage.setItem("players", JSON.stringify(players))
      } catch (error) {
        console.error("Error saving players:", error)
      }
    }

    savePlayers()
  }, [players])

  const typeOfGame = route.params.gameType

  const renderView = () => {
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
      <View className="justify-center items-center">{renderView()}</View>
      <View className="space-y-3 mt-10">
        {players.map((player, index) => (
          <View
            key={index}
            className="w-52 h-10 border justify-center rounded-lg shadow shadow-black bg-white"
          >
            <Text className="pl-4">{player.name}</Text>
          </View>
        ))}
        <View>
          <TextInput
            placeholder="Enter Names"
            value={playerName}
            onChangeText={(text) => setPlayerName(text)}
            className="w-52 h-10 text-center border rounded-lg bg-white"
          />
        </View>
        <View className="justify-center items">
          <TouchableOpacity onPress={addPlayer}>
            <View className="items-center justify-center">
              <PlusCircleIcon size={40} color={black} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View className="h-32 justify-center items absolute bottom-16">
        <TouchableOpacity>
          <View className="bg-customGreen px-20 rounded-3xl flex items-center justify-center border">
            <Gamepad2Icon size={60} color={white} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}


export default PlayerScreen