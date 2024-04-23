import React, { useCallback, useEffect, useState } from "react"
import { View, Text, ActivityIndicator } from "react-native"
import ChallengeCard from "../components/GameScreenComponents/ChallageCard"
import GameButton from "../components/GameScreenComponents/GameButton"
import { Card, Quiz, Player } from "../utils/types"
import { fetchRandomChallenge } from "../api/challengerService"
import { fetchRandomQuiz } from "../api/quizService"
import QuizCard from "../components/GameScreenComponents/QuizCard"
import {
  ArrowRight,
  CheckIcon,
  StarIcon,
  TurtleIcon,
  User,
  Users,
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
  const [quizAnswer, setQuizAnswer] = useState<string>("")
  const [disabled, setDisabled] = useState<boolean>(false)
  const [players, setPlayers] = useState<Player[]>([])
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0)
  const [currentTimer, setCurrentTimer] = useState(0)
  const [rounds, setRounds] = useState<number>(0)
  const [currentround, setCurrentRound] = useState<number>(1)
  const [isLoadingPlayers, setIsLoadingPlayers] = useState<boolean>(true)
  const [isLoadingGameType, setIsLoadingGameType] = useState<boolean>(true)
  const [isLoadingRounds, setIsLoadingRounds] = useState<boolean>(true)
  const [isLoadingCard, setIsLoadingCard] = useState<boolean>(true)
  const isAllTurnsPlayed = players.every((player) => player.turn === 0)

  const fetchChallenge = async () => {
    try {
      if (gameType != "") {
        console.log(" this is game type : ", gameType)

        const challengeCardData = await fetchRandomChallenge(gameType)
        if (challengeCardData) {
          setChallengeData(challengeCardData)
          setTimer(challengeCardData.Time * 1) // change to 1 for faster count
        }
      }
    } catch (error) {
      console.log("error fetching Challenge card: ", error)
    } finally {
      setIsLoadingCard(false)
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

  useFocusEffect(
    useCallback(() => {
      const fetchPlayers = async () => {
        try {
          const storedPlayers = await AsyncStorage.getItem("players")
          const storedGameType = await AsyncStorage.getItem("Gametype")
          const storedRounds = await AsyncStorage.getItem("rounds")

          if (storedPlayers && storedGameType && storedRounds) {
            setPlayers(JSON.parse(storedPlayers))
            setGameType(JSON.parse(storedGameType))
            setRounds(parseInt(storedRounds))
          }
        } catch (error) {
          console.error("Error fetching players:", error)
        } finally {
          setIsLoadingPlayers(false)
          setIsLoadingGameType(false)
          setIsLoadingRounds(false)
        }
      }

      fetchPlayers()
      console.log("players: ", players)
    }, [])
  )

  const fetchQuiz = async () => {
    try {
      if (gameType != "") {
        const quizDatafetch = await fetchRandomQuiz(gameType)
        if (quizDatafetch) {
          setquizData(quizDatafetch)
          setQuizCardAnswer(quizDatafetch.Answer)
        }
      }
    } catch (error) {
      console.log("error fetching quiz card: ", error)
    } finally {
      setIsLoadingCard(false)
    }
  }

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          setCurrentTimer(prevTimer)
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
          ? { ...player, timer: player.timer + currentTimer + 1 } // currenttimmer +1
          : player
      )
    )
  }, [currentPlayerIndex, currentTimer])

  const resetTimer = useCallback(() => {
    if (challengeData) {
      setTimer(challengeData.Time * 1) // change to 1 for faster rounds
    } else {
      setTimer(0)
    }
  }, [challengeData])

  const resetplayerTime = useCallback(() => {
    setPlayers((prevScoreboard) =>
      prevScoreboard.map((player) =>
        player.id === currentPlayerIndex
          ? { ...player, timer: 0, turn: 1 }
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
          setPlayers((prevScoreboard) =>
            prevScoreboard.map((player) =>
              player.id === currentPlayerIndex
                ? { ...player, right: player.right + 1 }
                : player
            )
          )
          setQuizAnswer("Correct")
          setDisabled(true)
        } else {
          setPlayers((prevScoreboard) =>
            prevScoreboard.map((player) =>
              player.id === currentPlayerIndex
                ? { ...player, wrong: player.wrong + 1 }
                : player
            )
          )

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

  console.log(" current  index :", currentPlayerIndex)
  console.log(" players", players)
  console.log(" rounds :", rounds)

  // new
  useEffect(() => {
    const currentPlayer = players[currentPlayerIndex]
    if (currentPlayer?.turn === 0) {
      // If the current player's turn is 0, find the next player whose turn is 1
      const nextPlayerIndex = players.findIndex((player) => player.turn === 1)
      if (nextPlayerIndex !== -1) {
        setCurrentPlayerIndex(nextPlayerIndex)
      }
    }
  }, [players, currentPlayerIndex]) // Run this effect whenever players or currentPlayerIndex changes

  if (
    isLoadingPlayers ||
    isLoadingGameType ||
    isLoadingRounds ||
    isLoadingCard
  ) {
    return (
      <View className="flex-1 justify-center items-center bg-bgBlue">
        <ActivityIndicator size="large" color="black" />
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <View className="flex justify-center items-center w-full h-full bg-bgBlue">
      {gameType == "Quiz" ? (
        <View className="flex justify-center items-center w-screen h-full">
          {currentround <= rounds ? (
            <Text className=" text-base mb-2 font-semibold">
              Question {currentround}/{rounds}
            </Text>
          ) : (
            <Text className=" text-base mb-2 font-semibold">Finished</Text>
          )}

          <QuizCard
            quizData={quizData}
            refreshQuiz={() => {
              fetchQuiz()
            }}
          />
          {currentround <= rounds ? (
            <View className="mt-6 flex flex-row space-x-6">
              <View>
                <GameButton
                  onPress={() => {
                    handleAnswerSelection(true)
                    setCurrentRound((prev) => prev + 1)
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
                    setCurrentRound((prev) => prev + 1)
                  }}
                  icon={<XIcon size={70} className="text-white" />}
                  disabled={disabled}
                  buttonTextStyle="capitalize"
                  buttonStyle={"bg-red-600 w-28 h-16"}
                />
              </View>
            </View>
          ) : (
            <View className=" mt-6">
              <GameButton
                onPress={() => {
                  props.navigation.navigate("Scoreboard")
                }}
                buttonStyle="bg-customGreen"
                image={require("../assets/icons/Leaderboard.png")}
                imageStyle="w-20 h-20"
              />
            </View>
          )}
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
                          /* setCurrentPlayerIndex((prevIndex) => {
                            if (players[currentPlayerIndex]?.turn === 0) {
                              // Kontrollera om turn är 0
                              // Om det är så, öka index med 1 men se till att det inte överskrider längden på players-arrayen
                              return (prevIndex + 1) % players.length
                            } else {
                              // Om turn inte är 0, behåll samma index
                              return prevIndex
                            }
                          })*/
                          setCurrentPlayerIndex((prevIndex) => {
                            const nextIndex = (prevIndex + 1) % players.length // Calculate the index of the next player
                            const currentPlayer = players[prevIndex]

                            // Check if the current player's turn is 0 and the next player's turn is 1
                            if (
                              currentPlayer.turn === 0 &&
                              players[nextIndex]?.turn === 1
                            ) {
                              return nextIndex // Move to the next player
                            } else {
                              return prevIndex // Otherwise, stay with the current player
                            }
                          })
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
