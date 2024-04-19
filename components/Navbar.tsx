import React, { useState } from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import {
  Gamepad2Icon,
  SettingsIcon,
  StarIcon,
  TrophyIcon,
  Users2Icon,
} from "lucide-react-native"
import { black } from "tailwindcss/colors"
import {
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from "react-native"
import CustomSideNavbar from "./NavbarComponents/CustomSideNavbar"
import GameTypeScreen from "../screens/gameTypeScreen"
import GameScreen from "../screens/gameScreen"
import PlayerScreen from "../screens/playerScreen"
import CreateCardScreen from "../screens/createCardScreen"
import ScoreboardScreen from "../screens/scoreboardScreen"
import CreateQuizCardScreen from "../screens/createQuizCardScreen"
import DistributePointScreen from "../screens/distributePointScreen"

const Navbar: React.FC = () => {
  const Stack = createStackNavigator()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const slideAnim = useState(new Animated.Value(-300))[0] // Initial position off-screen

  const toggleMenu = () => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? -300 : 0, // Slide out or slide in based on current state
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start()
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    if (isOpen) {
      toggleMenu()
    }
  }

  return (
    <NavigationContainer>
      <TouchableWithoutFeedback onPress={closeMenu}>
        <View style={{ flex: 1 }}>
          <Stack.Navigator
            initialRouteName="GameType"
            screenOptions={{
              headerStyle: {
                backgroundColor: "#CAEFFF",
              },
              headerTintColor: "#000",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerTitleAlign: "center",
              headerRight: () => (
                <TouchableOpacity onPress={toggleMenu}>
                  <SettingsIcon
                    size={30}
                    color="black"
                    style={{ marginRight: 15 }}
                  />
                </TouchableOpacity>
              ),
            }}
          >
            <Stack.Screen
              name="GameType"
              component={GameTypeScreen}
              options={{
                headerTitle: () => <Gamepad2Icon size={60} color={black} />,
              }}
            />
            <Stack.Screen
              name="SetPlayer"
              component={PlayerScreen}
              options={{
                headerTitle: () => <Users2Icon size={60} color={black} />,
              }}
            />
            <Stack.Screen
              name="Game"
              component={GameScreen}
              options={{
                headerTitle: () => <Gamepad2Icon size={60} color={black} />,
              }}
            />
            <Stack.Screen
              name="Points"
              component={DistributePointScreen}
              options={{
                headerTitle: () => <StarIcon size={60} color={black} />,
              }}
            />
            <Stack.Screen
              name="Scoreboard"
              component={ScoreboardScreen}
              options={{
                headerTitle: () => <TrophyIcon size={60} color={black} />,
              }}
            />
            <Stack.Screen
              name="customCards"
              component={CreateCardScreen}
              options={{
                headerTitle: () => <Gamepad2Icon size={60} color={black} />,
              }}
            />

            <Stack.Screen
              name="customQuiz"
              component={CreateQuizCardScreen}
              options={{
                headerTitle: () => <Gamepad2Icon size={60} color={black} />,
              }}
            />
          </Stack.Navigator>
          <Animated.View
            style={{
              position: "absolute",
              transform: [{ translateX: slideAnim }],
              width: "100%",
              height: "100%",
            }}
            className={`${isOpen ? "z-10" : "-z-10"} `}
          >
            <CustomSideNavbar onPress={toggleMenu} />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </NavigationContainer>
  )
}

export default Navbar
