import React, { useEffect, useState } from "react"
import { Text, View, Image } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

const GameScreen = (props: any) => {
  const [timer, setTimer] = useState(120) // Initial timer value in seconds (2 minutes)
  const [isRunning, setIsRunning] = useState(false)
  const [showStartButton, setShowStartButton] = useState(true)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 0) {
            clearInterval(interval)
            setIsRunning(false)
            return 0
          }
          return prevTimer - 1
        })
      }, 1000)
    }

    return () => clearInterval(interval) // Clear interval on component unmount or when timer stops
  }, [isRunning])

  const toggleTimer = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning)
    setShowStartButton(false)
  }

  const pauseTimer = () => {
    setIsRunning(false)
    setShowStartButton(true)
  }

  const resetTimer = () => {
    setTimer(120) // Reset timer to initial value
  }

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`
  }

  return (
    <View className="flex-1 w-full h-full justify-center items-center bg-blue-300">
      {/* Card containing Lorem Ipsum text */}
      <View className="bg-green-700 w-80 h-96 mt-10 justify-center items-center relative">
        <Text className="text-black p-4 rounded-lg">
          <Text className="font-bold">Instructions:</Text> Instructions: Pair up
          two individuals to weigh the same. You have 2 minutes. After the time
          expires, weigh the team members. The team with the least difference in
          weight among its members wins!{"\n\n"}
          <Text className="font-bold">Rules:</Text> During the 2 minutes, you
          cannot re-weigh anyone or anything.{"\n\n"}
          <Text className="font-bold">You will need:</Text> A scale
        </Text>
        <View className="absolute top-1 left-1">
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Settings")}
          >
            <Image
              source={require("../assets/refresh.png")}
              className="h-10 w-10 mb-20 mr-20"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Show Start Button if timer is not running */}
      {showStartButton && (
        <TouchableOpacity
          onPress={toggleTimer}
          className="bg-green-600 p-5 h-16 px-24 rounded-2xl mt-10 flex flex-row items-center justify-center"
        >
          <Image
            source={require("../assets/Start.png")}
            className="h-16 w-12"
          />
        </TouchableOpacity>
      )}

      {/* Show Pause Button if timer is running */}
      {!showStartButton && (
        <TouchableOpacity
          onPress={pauseTimer}
          className="bg-red-600 p-5 h-16 px-13 rounded-2xl mt-10 flex flex-row items-center"
        >
          <Text style={{ fontSize: 18, color: "white" }}>Pause</Text>
          <Text style={{ fontSize: 18, color: "white", marginLeft: 10 }}>
            Timer: {formatTime(timer)}
          </Text>
          <Image
            source={require("../assets/Pause.png")}
            style={{ width: 20, height: 20, marginRight: 10 }}
          />
        </TouchableOpacity>
      )}

      {/* Reset Timer Button */}
      <TouchableOpacity
        className="bg-blue-400 p-5 rounded-2xl mt-5 flex flex-row items-center mb-5"
        onPress={resetTimer}
      >
        <Text className="text-white">Reset timer</Text>
      </TouchableOpacity>
    </View>
  )
}

export default GameScreen
