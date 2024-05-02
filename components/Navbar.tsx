import React, { useState } from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer, DefaultTheme } from "@react-navigation/native"
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
import CreateTeamBattleCardScreen from "../screens/createTeamBattleCard"

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


  const navTheme = DefaultTheme
  navTheme.colors.background = "#CAEFFF"

  return (
    <NavigationContainer theme={navTheme}>
      <TouchableWithoutFeedback onPress={closeMenu}>
        <View className="flex-1 mt-8">
          <Stack.Navigator
            initialRouteName="Gamemode"
            screenOptions={{
              headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
                backgroundColor: "#CAEFFF",
              },
              headerLeftContainerStyle: {
                marginBottom: 40,
              },
              headerTintColor: "#000",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerTitleAlign: "center",
              headerRight: () => (
                <TouchableOpacity onPress={toggleMenu} className="mb-10">
                  <SettingsIcon
                    size={35}
                    color="black"
                    style={{ marginRight: 15 }}
                  />
                </TouchableOpacity>
              ),
            }}
          >
            <Stack.Screen
              name="Gamemode"
              component={GameTypeScreen}
              options={{
                headerTitle: () => (
                  <Gamepad2Icon size={80} color={black} className="mb-10" />
                ),
              }}
            />
            <Stack.Screen
              name="Players"
              component={PlayerScreen}
              options={{
                headerTitle: () => (
                  <Users2Icon size={80} color={black} className="mb-10" />
                ),
              }}
            />
            <Stack.Screen
              name="Game"
              component={GameScreen}
              options={{
                headerTitle: () => (
                  <Gamepad2Icon size={80} color={black} className="mb-10" />
                ),
              }}
            />
            <Stack.Screen
              name="Points"
              component={DistributePointScreen}
              options={{
                headerTitle: () => (
                  <StarIcon size={80} color={black} className="mb-10" />
                ),
              }}
            />
            <Stack.Screen
              name="Scoreboard"
              component={ScoreboardScreen}
              options={{
                headerTitle: () => (
                  <TrophyIcon size={80} color={black} className="mb-10" />
                ),
                headerLeft: () => null,
              }}
            />
            <Stack.Screen
              name="customCards"
              component={CreateCardScreen}
              options={{
                headerTitle: () => (
                  <Gamepad2Icon size={80} color={black} className="mb-10" />
                ),
              }}
            />
            <Stack.Screen
              name="customGroupCard"
              component={CreateTeamBattleCardScreen}
              options={{
                headerTitle: () => (
                  <Gamepad2Icon size={80} color={black} className="mb-10" />
                ),
              }}
            />

            <Stack.Screen
              name="customQuiz"
              component={CreateQuizCardScreen}
              options={{
                headerTitle: () => (
                  <Gamepad2Icon size={80} color={black} className="mb-10" />
                ),
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
