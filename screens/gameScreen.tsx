import React, { useCallback, useEffect, useState } from "react"
import { View, Text, Animated } from "react-native"
import ChallengeCard from "../components/GameScreenComponents/ChallageCard"
import GameButton from "../components/GameScreenComponents/GameButton"
import { Card, Quiz } from "../utils/types"
import { fetchRandomChallenge } from "../api/challengerService"
import { fetchRandomQuiz } from "../api/quizService"
import { RouteProp, useRoute } from "@react-navigation/core"
import QuizCard from "../components/GameScreenComponents/QuizCard"
import { CheckIcon, X, XIcon } from "lucide-react-native"

type RootStackParamList = {
  GameType: undefined
  SetPlayer: { gameType: string }
}
type PlayerScreenRouteProp = RouteProp<RootStackParamList, "SetPlayer">

const GameScreen = () => {
  const [timer, setTimer] = useState<number>(Number)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [showStartButton, setShowStartButton] = useState<boolean>(true)
  const [challengeData, setChallengeData] = useState<Card | null>(null)
  const [quizData, setquizData] = useState<Quiz | null>(null)
  const [gameType, setGameType] = useState<string>("")
  const [quizCardAnswer, setQuizCardAnswer] = useState<boolean | undefined>()
  const [quizScore, setQuizScore] = useState<number>(0)
  const [quizAnswer, setQuizAnswer] = useState<string>("")
  const route = useRoute<PlayerScreenRouteProp>()
  const [disabled, setDisabled] = useState<boolean>(false)

  const fetchChallenge = async () => {
    setGameType(route.params.gameType)
    if (gameType != "") {
      const challengeCardData = await fetchRandomChallenge(gameType)
      if (challengeCardData) {
        setChallengeData(challengeCardData)
        setTimer(challengeCardData.Time * 60)
      }
    }
  }

  const fetchQuiz = async () => {
    setGameType(route.params.gameType)
    if (gameType != "") {
      const quizDatafetch = await fetchRandomQuiz(gameType)
      if (quizDatafetch) {
        setquizData(quizDatafetch)
        setQuizCardAnswer(quizDatafetch.Answer)
      }
    }
  }

  if (gameType === "Free-for-all" || gameType === "Group-Battles") {
    useEffect(() => {
      fetchChallenge()
    }, [gameType])
  } else {
    useEffect(() => {
      fetchQuiz()
    }, [gameType])
  }

  const getRandomUser = () => {}

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer: any) => {
          if (challengeData && challengeData.GameType == "timedown") {
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
    setShowStartButton(false)
  }, [])

  const pauseTimer = useCallback(() => {
    setIsRunning(false)
    setShowStartButton(true)
  }, [])

  const resetTimer = useCallback(() => {
    if (challengeData) {
      setTimer(challengeData.Time * 60)
    } else {
      setTimer(0)
    }
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

  const FadeInView = (props: any) => {
    const [fadeAnim] = useState(new Animated.Value(1)) // Initial value for opacity: 0

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
          <ChallengeCard
            documentData={challengeData}
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
      )}
    </View>
  )
}

export default GameScreen
