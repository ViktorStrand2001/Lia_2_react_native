import { collection, getDocs, query } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { Text, View, Image } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { FIRESTORE_DB } from "../firebaseConfig"

interface Card {
  Title: string
  Instruction: string
  Rules: string
  YouWillNeed: string
  Time: number
}

const GameScreen: React.FC = (props: any) => {
  const [timer, setTimer] = useState<number>(Number)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [showStartButton, setShowStartButton] = useState<boolean>(true)
  const [documentData, setDocumentData] = useState<Card | null>(null)

  const fetchRandomChallenge = async () => {
    try {
      const challengesRef = collection(FIRESTORE_DB, "Lia2-challange")
      const queryRef = query(challengesRef)
      const querySnapshot = await getDocs(queryRef)
      const randomIndex = Math.floor(Math.random() * querySnapshot.docs.length)
      const randomChallengeDoc = querySnapshot.docs[randomIndex]
      const cardData = randomChallengeDoc.data() as Card
      setDocumentData(cardData)
      setTimer(cardData.Time * 60)
      console.log(documentData)
    } catch (error) {
      console.error("Error fetching document:", error)
    }
  }

  useEffect(() => {
    fetchRandomChallenge()
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

  const toggleTimer = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning)
    setShowStartButton(false)
    console.log(showStartButton)
  }

  const pauseTimer = () => {
    setIsRunning(false)
    setShowStartButton(true)
  }

  const resetTimer = () => {
    if (documentData) {
      setTimer(documentData.Time * 60)
    } else {
      setTimer(0)
    }
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
    <View className=" flex justify-center items-center w-full h-full  bg-bgBlue">
      <View className=" flex justify-center items-center space-y-10">
        <View className="bg-customGreen w-80 h-96 flex  items-center rounded-2xl justify-center">
          {documentData && (
            <>
              <View className="h-full w-full ">
                <View className="p-2  h-[10%]">
                  <TouchableOpacity
                    onPress={() => {
                      fetchRandomChallenge()
                      resetTimer()
                      pauseTimer()
                    }}
                  >
                    <Image
                      source={require("../assets/refresh.png")}
                      className="w-10 h-10 "
                    />
                  </TouchableOpacity>
                </View>
                <View className=" h-[20%] items-center justify-center">
                  <Text className=" font-bold text-3xl item">
                    {documentData.Title}
                  </Text>
                </View>
                <View className="px-6">
                  <View className="h-[40%] ">
                    <Text className=" font-bold ">Instructions: </Text>
                    <Text>{documentData.Instruction}</Text>
                  </View>

                  <View className="h-[20%]">
                    <Text className=" font-bold">You wil need: </Text>
                    <Text>{documentData.YouWillNeed}</Text>
                  </View>

                  <View className="h-[20%]">
                    <Text className=" font-bold">Rules: </Text>
                    <Text>{documentData.Rules}</Text>
                  </View>
                </View>
              </View>
            </>
          )}
        </View>
        {showStartButton && (
          <TouchableOpacity
            onPress={toggleTimer}
            className="bg-customGreen w-48 h-16 rounded-2xl flex flex-row justify-center items-center "
          >
            <Image
              source={require("../assets/Start.png")}
              className="h-12 w-12"
            />
          </TouchableOpacity>
        )}
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
        <TouchableOpacity
          onPress={() => {
            resetTimer()
            pauseTimer()
          }}
        >
          <Text className="text-black mb-">Reset timer</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default GameScreen
