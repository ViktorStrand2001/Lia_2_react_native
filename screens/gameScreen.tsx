import React, { useCallback, useEffect, useState } from "react"
import { View, Text, Animated } from "react-native"
import ChallengeCard from "../components/GameScreenComponents/ChallageCard"
import GameButton from "../components/GameScreenComponents/GameButton"
import { Card, Quiz, Player } from "../utils/types"
import { fetchRandomChallenge } from "../api/challengerService"
import { fetchRandomQuiz } from "../api/quizService"
import { RouteProp, useRoute } from "@react-navigation/core"
import QuizCard from "../components/GameScreenComponents/QuizCard"
import {
  ArrowRight,
  CheckIcon,
  StarIcon,
  User,
  Users,
  X,
  XIcon,
} from "lucide-react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect } from "@react-navigation/native"

const GameScreen = (props: any) => {
  const [timer, setTimer] = useState<number>(Number)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [showStartButton, setShowStartButton] = useState<boolean>(true)
  const [challengeData, setChallengeData] = useState<Card | null>(null)
  const [quizData, setquizData] = useState<Quiz | null>(null)
  const [gameType, setGameType] = useState<string>("")
  const [quizCardAnswer, setQuizCardAnswer] = useState<boolean | undefined>()
  const [quizScore, setQuizScore] = useState<number>(0)
  const [quizAnswer, setQuizAnswer] = useState<string>("")
  const [disabled, setDisabled] = useState<boolean>(false)
  const [players, setPlayers] = useState<Player[]>([])
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0)
  const [currentTimer, setCurrentTimer] = useState(0)
  const isAllTurnsPlayed = players.every((player) => player.turn === 0)

  const fetchChallenge = async () => {
    if (gameType != "") {
      console.log(" this is game type : ", gameType)

      const challengeCardData = await fetchRandomChallenge(gameType)
      if (challengeCardData) {
        setChallengeData(challengeCardData)
        setTimer(challengeCardData.Time * 1)
      }
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (gameType === "Free-for-all" || gameType === "Group-Battles") {
        fetchChallenge()
      } else {
        fetchQuiz()
      }
    }, [gameType])
  )

  // Use useFocusEffect to fetch players when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      const fetchPlayers = async () => {
        try {
          const storedPlayers = await AsyncStorage.getItem("players")
          const storedGameType = await AsyncStorage.getItem("Gametype")

          if (storedPlayers && storedGameType) {
            setPlayers(JSON.parse(storedPlayers))
            setGameType(JSON.parse(storedGameType))
          }
        } catch (error) {
          console.error("Error fetching players:", error)
        }
      }

      fetchPlayers()
      console.log("players: ", players)
    }, [])
  )

  const fetchQuiz = async () => {
    if (gameType != "") {
      const quizDatafetch = await fetchRandomQuiz(gameType)
      if (quizDatafetch) {
        setquizData(quizDatafetch)
        setQuizCardAnswer(quizDatafetch.Answer)
      }
    }
  }

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          setCurrentTimer(prevTimer) // Update the currentTimer state with the current timer value
          if (challengeData && challengeData.GameType === "timedown") {
            if (prevTimer <= 0) {
              clearInterval(interval)
              setIsRunning(false)
              return 0
            }
            return prevTimer - 1
          } else {
            return prevTimer + 1
          }
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  const toggleTimer = useCallback(() => {
    setIsRunning((prevIsRunning) => !prevIsRunning)

    if (players[currentPlayerIndex]?.turn !== 0) {
      setPlayers((prevScoreboard) =>
        prevScoreboard.map((player) =>
          player.id === currentPlayerIndex ? { ...player, turn: 0 } : player
        )
      )
    }
    setShowStartButton(false)
  }, [currentPlayerIndex, players])

  const pauseTimer = useCallback(() => {
    setIsRunning(false)
    setShowStartButton(true)
  }, [currentPlayerIndex, currentTimer])

  const setPlayerTime = useCallback(() => {
    setPlayers((prevScoreboard) =>
      prevScoreboard.map((player) =>
        player.id === currentPlayerIndex
          ? { ...player, timer: player.timer + currentTimer + 1 } // Add the current timer value to the player's timer
          : player
      )
    )
  }, [currentPlayerIndex, currentTimer])

  const resetTimer = useCallback(() => {
    if (challengeData) {
      setTimer(challengeData.Time * 1)
    } else {
      setTimer(0)
    }
  }, [challengeData])

  const resetplayerTime = useCallback(() => {
    setPlayers((prevScoreboard) =>
      prevScoreboard.map((player) =>
        player.id === currentPlayerIndex
          ? { ...player, timer: 0, turn: 1 } // Add the current timer value to the player's timer
          : player
      )
    )
  }, [challengeData])

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`
  }

  const handleAnswerSelection = useCallback(
    (selectedAnswer: boolean) => {
      if (quizData) {
        const isCorrect = selectedAnswer === quizData.Answer
        if (isCorrect) {
          setQuizScore((prevQuizScore) => prevQuizScore + 1)
          setQuizAnswer("Correct")
          setDisabled(true)
        } else {
          setQuizAnswer("Incorrect")
          setDisabled(true)
        }
      }
      setTimeout(() => {
        setQuizAnswer("")
        fetchQuiz()
      }, 1000)
      setTimeout(() => {
        setDisabled(false)
      }, 2000)
    },
    [quizData]
  )

  useEffect(() => {
    const savePlayerStats = async () => {
      try {
        await AsyncStorage.setItem("players", JSON.stringify(players))
      } catch (error) {
        console.error("Error saving players:", error)
      }
    }
    savePlayerStats()
  }, [players])

  const FadeInView = (props: any) => {
    const [fadeAnim] = useState(new Animated.Value(1))

    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start()
    }, [fadeAnim])

    return (
      <Animated.View
        style={{
          ...props.style,
          opacity: fadeAnim,
        }}
      >
        {props.children}
      </Animated.View>
    )
  }
  console.log(" current  index :", currentPlayerIndex)

  return (
    <View className="flex justify-center items-center w-full h-full bg-bgBlue">
      {gameType == "Quiz" ? (
        <View className="flex justify-center items-center w-screen h-full">
          {quizAnswer === "Correct" ? (
            <View className="z-50 absolute top-0">
              <FadeInView>
                <CheckIcon size={200} className="text-green-900" />
              </FadeInView>
            </View>
          ) : null}
          {quizAnswer === "Incorrect" ? (
            <View className="z-50 absolute top-0">
              <FadeInView>
                <XIcon size={200} className="text-red-700" />
              </FadeInView>
            </View>
          ) : null}
          <QuizCard
            quizData={quizData}
            refreshQuiz={() => {
              fetchQuiz()
            }}
          />
          <View className="mt-6 flex flex-row space-x-6">
            <View>
              <GameButton
                onPress={() => {
                  handleAnswerSelection(true)
                }}
                disabled={disabled}
                icon={<CheckIcon size={70} className="text-white" />}
                buttonTextStyle="capitalize"
                buttonStyle={"bg-customGreen w-28 h-16"}
              />
            </View>
            <View>
              <GameButton
                onPress={() => {
                  handleAnswerSelection(false)
                }}
                icon={<XIcon size={70} className="text-white" />}
                disabled={disabled}
                buttonTextStyle="capitalize"
                buttonStyle={"bg-red-600 w-28 h-16"}
              />
            </View>
          </View>
        </View>
      ) : (
        <View className="flex justify-center items-center">
          <Text style={{ fontSize: 20, marginBottom: 10 }}>
            {players[currentPlayerIndex]?.name}'s Turn
          </Text>
          <ChallengeCard
            documentData={challengeData}
            refreshChallenge={() => {
              fetchChallenge()
              resetTimer()
              pauseTimer()
            }}
          />
          <View className="mt-6">
            {/* Conditionally render Start/Pause button or Next User button based on showStartButton state */}
            {showStartButton ? (
              <>
                {challengeData?.GameType == "timeup" &&
                players[currentPlayerIndex]?.turn <= 0 ? (
                  <>
                    {isAllTurnsPlayed ? (
                      <GameButton
                        onPress={() => {
                          props.navigation.navigate("Points", { players }),
                            pauseTimer()
                          setCurrentPlayerIndex(0)
                        }}
                        buttonStyle={"bg-customGreen"}
                        icon={
                          <View className=" flex flex-row justify-center items-center ">
                            <StarIcon size={40} className=" text-white" />
                          </View>
                        }
                      />
                    ) : (
                      <GameButton
                        onPress={() => {
                          setShowStartButton(true)
                          resetTimer()
                          pauseTimer()
                          setCurrentPlayerIndex((prevIndex) => prevIndex + 1)
                        }}
                        buttonStyle={"bg-customGreen"}
                        icon={
                          <View className=" flex flex-row justify-center items-center ">
                            <User size={50} className=" text-white" />
                            <ArrowRight size={35} className=" text-white" />
                            <Users size={50} className=" text-white" />
                          </View>
                        }
                      />
                    )}
                  </>
                ) : (
                  <GameButton
                    onPress={toggleTimer}
                    buttonStyle={"bg-customGreen"}
                    image={require("../assets/icons/Start.png")}
                    imageStyle={"w-16 h-16"}
                  />
                )}
              </>
            ) : (
              <>
                {challengeData?.GameType == "timeup"
                  ? timer >= 0 && (
                      <GameButton
                        onPress={() => {
                          pauseTimer(), setPlayerTime()
                        }}
                        text={`${formatTime(timer)}`}
                        buttonStyle={"bg-red-600"}
                        image={require("../assets/icons/Pause.png")}
                        imageStyle={"w-16 h-16"}
                      />
                    )
                  : timer > 0 && (
                      <GameButton
                        onPress={pauseTimer}
                        text={`${formatTime(timer)}`}
                        buttonStyle={"bg-red-600"}
                        image={require("../assets/icons/Pause.png")}
                        imageStyle={"w-16 h-16"}
                      />
                    )}
              </>
            )}
          </View>

          {/* Conditionally render Next User button when timer reaches 0 */}
          {timer <= 0 && challengeData?.GameType == "timedown" && (
            <>
              {isAllTurnsPlayed ? (
                <>
                  {gameType !== "Quiz" && (
                    <GameButton
                      onPress={() => {
                        props.navigation.navigate("Points", { players }),
                          pauseTimer()
                        setCurrentPlayerIndex(0)
                      }}
                      buttonStyle={"bg-customGreen"}
                      icon={
                        <View className=" flex flex-row justify-center items-center ">
                          <StarIcon size={40} className=" text-white" />
                        </View>
                      }
                    />
                  )}
                </>
              ) : (
                <>
                  <GameButton
                    onPress={() => {
                      setShowStartButton(true)
                      resetTimer()
                      pauseTimer()
                      setCurrentPlayerIndex(
                        (prevIndex) => (prevIndex + 1) % players.length
                      )
                    }}
                    buttonStyle={"bg-customGreen"}
                    icon={
                      <View className=" flex flex-row justify-center items-center ">
                        <User size={50} className=" text-white" />
                        <ArrowRight size={35} className=" text-white" />
                        <Users size={50} className=" text-white" />
                      </View>
                    }
                  />
                </>
              )}
            </>
          )}

          {/* Reset timer button */}
          <View className="w-16 h-16">
            {players[currentPlayerIndex]?.turn == 0 && (
              <View className="flex justify-center items-center">
                <GameButton
                  onPress={() => {
                    resetTimer()
                    pauseTimer()
                    resetplayerTime()
                  }}
                  text="Reset timer"
                  buttonTextStyle="text-base text-red-600"
                />
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  )
}

export default GameScreen
