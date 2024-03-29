import React, { useCallback, useEffect, useState } from "react"
import { View } from "react-native"
import ChallengeCard from "../components/GameScreenComponents/ChallageCard"
import GameButton from "../components/GameScreenComponents/GameButton"
import { Card } from "../utils/types"
import { fetchRandomChallenge } from "../api/challengerService"

const GameScreen: React.FC = () => {
  const [timer, setTimer] = useState<number>(Number)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [showStartButton, setShowStartButton] = useState<boolean>(true)
  const [documentData, setDocumentData] = useState<Card | null>(null)

  const fetchChallenge = async () => {
    const cardData = await fetchRandomChallenge()
    if (cardData) {
      setDocumentData(cardData)
      setTimer(cardData.time * 60)
    }
  }

  useEffect(() => {
    fetchChallenge()
  }, [])

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
    return () => clearInterval(interval)
  }, [isRunning])

  const toggleTimer = useCallback(() => {
    setIsRunning((prevIsRunning) => !prevIsRunning)
    setShowStartButton(false)
  }, [])

  const pauseTimer = useCallback(() => {
    setIsRunning(false)
    setShowStartButton(true)
  }, [])

  const resetTimer = useCallback(() => {
    if (documentData) {
      setTimer(documentData.time * 60)
    } else {
      setTimer(0)
    }
  }, [documentData])

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`
  }

  return (
    <View className="flex justify-center items-center w-full h-full bg-bgBlue">
      <View className="flex justify-center items-center">
        <ChallengeCard
          documentData={documentData}
          refreshChallenge={() => {
            fetchChallenge()
            resetTimer()
            pauseTimer()
          }}
        />
        <View className="mt-6">
          {showStartButton ? (
            <GameButton
              onPress={toggleTimer}
              buttonStyle={"bg-customGreen"}
              image={require("../assets/icons/Start.png")}
              imageStyle={"w-16 h-16"}
            />
          ) : (
            <GameButton
              onPress={pauseTimer}
              text={`${formatTime(timer)}`}
              buttonStyle={"bg-red-600"}
              image={require("../assets/icons/Pause.png")}
              imageStyle={"w-16 h-16"}
            />
          )}
        </View>
      </View>
      <View className="w-16 h-16">
        {showStartButton ? null : (
          <View className="flex justify-center items-center">
            <GameButton
              onPress={() => {
                resetTimer()
                pauseTimer()
              }}
              text="Reset timer"
              buttonTextStyle="text-base text-red-600"
            />
          </View>
        )}
      </View>
    </View>
  )
}

export default GameScreen
