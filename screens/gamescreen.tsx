import React, { useEffect, useState } from "react"
import { Text, View, Button, Image } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

const GameScreen = (props: any) => {
  const [timer, setTimer] = useState(120) // Initial timer value in seconds (2 minutes)
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [showStartButton, setShowStartButton] = useState(true)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 0) {
            clearInterval(interval)
            setIsRunning(false)
            setShowStartButton(true)
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
    setIsPaused(true)
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
    <View className="flex-1 justify-center items-center bg-blue-300">
      {/* Card containing Lorem Ipsum text */}
      <View className="#  bg flex-1 justify-center items-center mt-20 ">
        <Text className="text-black p-4 rounded-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          fringilla purus quis est tincidunt, sed consequat felis accumsan.
          Vivamus rutrum magna vitae dui pulvinar laoreet. Duis at velit vitae
          neque faucibus dignissim. In fringilla elit non metus tempor, sed
        </Text>
      </View>

      {/* Existing components */}
      <View className="bg bg-green-700"></View>
      <Text className=" mb-2">GameScreen</Text>
      <Button
        title="Game"
        onPress={() => props.navigation.navigate("Settings")}
      />
      {showStartButton && (
        <TouchableOpacity
          onPress={toggleTimer}
          className="bg-green-600 p-5 h-16 px-24  rounded-2xl mt-10 flex flex-row items-center justify-center"
        >
          <Image
            source={require("../assets/Start.png")}
            className="h-10 w-10  "
          />
        </TouchableOpacity>
      )}
      {(isRunning || isPaused) && (
        <TouchableOpacity
          onPress={pauseTimer}
          className="bg-red-600 p-5 rounded-2xl mt-5 flex flex-row items-center"
        >
          <Text style={{ fontSize: 18, color: "white" }}>
            {isPaused ? "Pause" : "Pause"}
          </Text>
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
      <Button title="Reset Timer" onPress={resetTimer} />
    </View>
  )
}

export default GameScreen
