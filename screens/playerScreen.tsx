import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  ScrollView,
} from "react-native"
import React, { ChangeEvent, useEffect, useState } from "react"
import { Gamepad2Icon, PlusCircleIcon, X } from "lucide-react-native"
import { black, white } from "tailwindcss/colors"
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { TouchableWithoutFeedback } from "react-native"

interface Player {
  name: string
  score: number
  id: number
}

type RootStackParamList = {
  GameType: undefined
  SetPlayer: { gameType: string }
}
type PlayerScreenRouteProp = RouteProp<RootStackParamList, "SetPlayer">

const PlayerScreen = (props: any) => {
  const [playerName, setPlayerName] = useState<string>("")
  const [players, setPlayers] = useState<Player[]>([])
  const route = useRoute<PlayerScreenRouteProp>()
  const [toggle, Settoggle] = useState(true)

  const toggleInput = () => {
    Settoggle((toggle) => !toggle)
  }

  const navigation = useNavigation()

  const addPlayer = () => {
    if (playerName.trim() !== "") {
      const newPlayer: Player = {
        name: playerName,
        score: 0,
        id: players.length + 1,
      }

      setPlayers([...players, newPlayer])
      setPlayerName("")
      console.log(newPlayer)
    }
  }

  const removePlayer = (index: number) => {
    const updatedPlayers = [...players]
    updatedPlayers.splice(index, 1)
    setPlayers(updatedPlayers)
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
      <View className="justify-center items-center bg-red">{renderView()}</View>

      <View className=" mt-10 h-[60%] ">
        <View className="justify-center s ">
          <TouchableOpacity
            onPress={() => {
              addPlayer()
              toggleInput()
            }}
          >
            <View className="items-center justify-center">
              <PlusCircleIcon size={40} color={black} />
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
          className="w-screen space-y-3 "
        >
          <View className=" pt-3">
            <TextInput
              placeholder="Enter Names"
              value={playerName}
              onChangeText={(text) => setPlayerName(text)}
              onSubmitEditing={() => {
                addPlayer()
                toggleInput()
              }} // Add this line
              className={`w-52 h-10 border pl-4   justify-center rounded-lg shadow shadow-black bg-white ${
                toggle ? "hidden" : "block "
              }`}
            />
          </View>
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
                    onPress={() => removePlayer(index)}
                    className=" ml-44 absolute"
                  >
                    <View className="">
                      <X size={30} className="text-red-700" />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </ScrollView>
      </View>

      <View className="h-32 justify-center items absolute bottom-16">
        <TouchableOpacity onPress={() => props.navigation.navigate("Game")}>
          <View className="bg-customGreen px-20 rounded-3xl flex items-center justify-center border">
            <Gamepad2Icon size={60} color={white} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default PlayerScreen
