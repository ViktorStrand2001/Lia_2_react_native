import {
  Image,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import React, { useState } from "react"
import { Gamepad2, Gamepad2Icon, PlusCircleIcon } from "lucide-react-native"
import { black, orange } from "tailwindcss/colors"

interface Player {
  name: String
  score: number
}

const PlayerScreen = () => {
  const [playerName, setPlayerName] = useState<string>("")
  const [players, setPlayers] = useState<Player[]>([])

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

  return (
    <View className=" flex min-w-full min-h-full bg-bgBlue  items-center">
      <View className=" justify-center items-center">
        <Text className=" text-2xl font-medium"> Type Your Names!</Text>
      </View>

      {players.map((player, index) => (
        <Text key={index} className="">
          {player.name}
        </Text>
      ))}
      <View className=" ">
        <TextInput
          placeholder="Enter Player Name"
          value={playerName}
          onChangeText={(Text) => setPlayerName(Text)}
          className=" text-center border rounded-lg  bg-whitefdssf"
        />
        <View className="h-32 justify-center items">
          <TouchableOpacity onPress={addPlayer}>
            <View className=" h-16 px-16 rounded-2xl flex items-center justify-center">
              <PlusCircleIcon size={40} color={black} className="" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View className="h-32 justify-center items">
        <TouchableOpacity>
          <View className="bg-customGreen h-16 px-16 rounded-2xl flex items-center justify-center border">
            <Gamepad2Icon size={40} color={black} className="" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default PlayerScreen

const styles = StyleSheet.create({})
