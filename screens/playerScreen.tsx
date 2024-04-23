import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import {
  CheckIcon,
  Gamepad2Icon,
  PlusCircleIcon,
  X,
} from "lucide-react-native"
import { black, white } from "tailwindcss/colors"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Player } from "../utils/types"
import { Center, FormControl, Select } from "native-base"
import GameButton from "../components/GameScreenComponents/GameButton"
import { useFocusEffect } from "@react-navigation/native"

const PlayerScreen = (props: any) => {
  const [playerName, setPlayerName] = useState<string>("")
  const [players, setPlayers] = useState<Player[]>([])
  const [showInput, setShowInput] = useState<boolean>(false)
  const [gameType, setGameType] = useState<string>("")
  const [rounds, setRounds] = useState<number>(0)

  const navigateToGame = () => {
    if (gameType != "" || rounds != 0) {
      props.navigation.navigate("Game")
    }
  }

  const addPlayer = () => {
    if (playerName.trim() !== "") {
      const newPlayer: Player = {
        name: playerName,
        score: 0,
        id: players.length,
        points: 0,
        turn: 1,
        timer: 0,
        right: 0,
        wrong: 0,
      }

      setPlayers([...players, newPlayer])
      setPlayerName("")
      setShowInput(false)
    }
  }

  const removePlayer = (id: number) => {
    const updatedPlayers = players.filter((player) => player.id !== id)
    setPlayers(updatedPlayers)
  }

  useEffect(() => {
    const clearStoredPlayers = async () => {
      try {
        if (gameType === "Quiz") {
          await AsyncStorage.removeItem("players")
          setPlayers([])
        }
      } catch (error) {
        console.log("Player could not be removed: ", error)
      }
    }

    clearStoredPlayers()
  }, [gameType])

  useFocusEffect(
    useCallback(() => {
      const loadPlayers = async () => {
        try {
          const storedPlayers = await AsyncStorage.getItem("players")
          const storedRounds = await AsyncStorage.getItem("rounds")
          const storedGameType = await AsyncStorage.getItem("Gametype")
          if (storedPlayers !== null) {
            setPlayers(JSON.parse(storedPlayers))
          }
          if (storedRounds !== null) {
            setRounds(parseInt(storedRounds))
          }
          if (storedGameType !== null) {
            setGameType(JSON.parse(storedGameType))
          }
        } catch (error) {
          console.error("Error loading player data:", error)
        }
      }
      loadPlayers()
    }, [])
  )

  useEffect(() => {
    const saveGameSettings = async () => {
      try {
        await AsyncStorage.setItem("players", JSON.stringify(players))
        await AsyncStorage.setItem("rounds", JSON.stringify(rounds))
      } catch (error) {
        console.error("Error saving player data:", error)
      }
    }

    saveGameSettings()
  }, [players, rounds])

  const renderTextBastOnGameType = () => {
    if (gameType === "Group-Battles") {
      return (
        <Text className="text-2xl font-medium capitalize">
          type your team names!
        </Text>
      )
    }
    if (gameType === "Free-for-all") {
      return (
        <Text className="text-2xl font-medium capitalize">
          Type your names!
        </Text>
      )
    }
    if (gameType === "Quiz") {
      return (
        <Text className="text-2xl font-medium capitalize">Type your name!</Text>
      )
    }
  }

  console.log("------------- playerScreen -------------");
  console.log("amount of players: ", players.length)
  console.log("gametype: ", gameType)
  console.log("players: ", players)
  console.log("rounds: ", rounds)

  return (
    <View className="flex w-full h-full bg-bgBlue items-center relative">
      <View className="justify-center items-center">
        {renderTextBastOnGameType()}
      </View>
      {gameType === "Quiz" ? (
        <View className="w-full h-full flex items-center relative">
          <View className="flex justify-center items-center absolute top-56">
            {players.length <= 0 && (
              <TouchableOpacity
                onPress={() => setShowInput(true)}
                className="w-10"
              >
                <View className="items-center justify-center">
                  <PlusCircleIcon size={60} color={black} />
                </View>
              </TouchableOpacity>
            )}
          </View>
          {showInput && (
            <View className="absolute top-56 ">
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
                className={`w-72 h-16 border pl-4 justify-center rounded-lg shadow shadow-black bg-white text-xl`}
              />
            </View>
          )}
          <View className="absolute top-56">
            {players
              .slice(0)
              .reverse()
              .map((player, index) => (
                <View
                  key={index}
                  className="w-72 h-16 border justify-center rounded-lg shadow-md shadow-black bg-white relative"
                >
                  <Text className="pl-4 text-xl">{player.name}</Text>
                  <View className=" justify-center item-center right-3 absolute ">
                    <TouchableOpacity onPress={() => removePlayer(player.id)}>
                      <View>
                        <X size={40} className="text-red-700" />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
          </View>
        </View>
      ) : (
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
                  className="w-52 h-10 border justify-center rounded-lg shadow-md shadow-black bg-white relative"
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
      )}

      <View className="flex flex-row justify-center items-center absolute bottom-28">
        {gameType === "Quiz" ? (
          <Text className="capitalize">amount of questions </Text>
        ) : (
          <Text className="capitalize">game rounds </Text>
        )}
        <Center>
          <FormControl isRequired >
            <Select
              minWidth="130"
              accessibilityLabel="Rounds"
              placeholder="amount"
              _selectedItem={{
                bg: "black",
                endIcon: <CheckIcon size={5} />,
              }}
              mt="1"
              borderColor={"black"}
              placeholderTextColor="gray.500"
              fontSize={18}
              onValueChange={(value) => setRounds(parseInt(value))}
            >
              <Select.Item label="5" value="5" />
              <Select.Item label="10" value="10" />
            </Select>
          </FormControl>
        </Center>
      </View>

      <View className="h-32 justify-center items absolute bottom-0">
        <GameButton
          onPress={() => navigateToGame()}
          buttonStyle={`  ${
            players.length > 0 && rounds > 0 ? "bg-customGreen" : "bg-gray-300"
          }`}
          disabled={!(players.length > 0 && rounds > 0)}
          icon={<Gamepad2Icon size={60} color={white} />}
        />
      </View>
    </View>
  )
}

export default PlayerScreen
