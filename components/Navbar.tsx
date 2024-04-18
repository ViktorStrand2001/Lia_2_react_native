import React, { useState } from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import GameTypeScreen from "../screens/gameTypeScreen"
import {
  Gamepad2Icon,
  SettingsIcon,
  StarIcon,
  TrophyIcon,
  Users2Icon,
  UsersRoundIcon,
} from "lucide-react-native"
import GameScreen from "../screens/gameScreen"
import PlayerScreen from "../screens/playerScreen"
import CreateCardScreen from "../screens/createCardScreen"
import ScoreboardScreen from "../screens/scoreboardScreen"
import CreateQuizCardScreen from "../screens/createQuizCardScreen"
import DistributePointScreen from "../screens/distributePointScreen"
import { black } from "tailwindcss/colors"
import { TouchableOpacity, View, Text } from "react-native"
import Logo from "./Logo"
import CustomSideNavbar from "./NavbarComponents/CustomSideNavbar"

const Navbar: React.FC = (props: any) => {
  const Stack = createStackNavigator()
  const [toggle, setToggle] = useState<boolean>(true)

  const settings = {
    headerRight: () => (
      <>
        <TouchableOpacity onPress={() => setToggle(!toggle)}>
          <SettingsIcon size={30} color="black" className="mr-5" />
        </TouchableOpacity>
      </>
    ),
  }

  return (
    <NavigationContainer>
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
          ...settings,
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
        <Stack.Screen
          component={<CustomSideNavbar navigation={props.navigation} />}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navbar
