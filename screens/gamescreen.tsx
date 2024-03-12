import React, { useEffect, useState } from "react"
import { Text, View, Image, Button } from "react-native"
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
    <View className=" flex justify-center items-center w-full h-full  bg-blue-300">
      {/* Card containing Lorem Ipsum text */}

      <View className=" flex justify-center items-center space-y-10">
        <View className="bg-green-700 pt-16 pb-16 mx-6 mt-5 flex items-center rounded-2xl justify-center relative">
          <View className="absolute top-3 left-3">
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Settings")}
            >
              <Image
                source={require("../assets/refresh.png")}
                className="h-12 w-12 mb-20 mr-20"
              />
            </TouchableOpacity>
          </View>

          <View className=" flex items-center justify-center">
            <Text className=" font-bold text-3xl item">Team Balance</Text>
          </View>

          <View className="text-black p-4 rounded-lg space-y-3 px-4">
            <View className="">
              <Text className=" font-bold ">Instructions: </Text>
              <Text>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni
                doloribus facere praesentium adipisci voluptatibus, ducimus,
                dicta, aut asperiores amet obcaecati non? In iusto quas quos
                laboriosam iure ducimus magnam numquam.
              </Text>
            </View>

            <View>
              <Text className=" font-bold">You wil need: </Text>
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nesciunt, iste?
              </Text>
            </View>

            <View>
              <Text className=" font-bold">Rules: </Text>
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nesciunt, iste?
              </Text>
            </View>
          </View>
        </View>

        {/* Show Start Button if timer is not running */}
        {showStartButton && (
          <TouchableOpacity
            onPress={toggleTimer}
            className="bg-green-600 w-48 h-16 rounded-2xl flex flex-row justify-center items-center "
          >
            <Image
              source={require("../assets/Start.png")}
              className="h-12 w-12"
            />
          </TouchableOpacity>
        )}

        {/* Show Pause Button if timer is running */}
        {!showStartButton && (
          <View>
            <TouchableOpacity
              onPress={pauseTimer}
              className="bg-red-600 w-48  h-16 rounded-2xl flex flex-row justify-center items-center "
            >
              <Text className="text-white text-3xl">{formatTime(timer)}</Text>
              <Image
                source={require("../assets/Pause.png")}
                className="h-12 w-12"
              />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View className="mt-6 flex justify-center items-center">
        <TouchableOpacity onPress={resetTimer} className=" ">
          <Text className="text-black mb-">Reset timer</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default GameScreen
