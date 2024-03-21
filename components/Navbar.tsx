import "react-native-gesture-handler"
import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import GameTypeScreen from "../screens/gameTypeScreen"
import { SettingsIcon } from "lucide-react-native"
import SettingScreen from "../screens/settingscreen"
import GameScreen from "../screens/gameScreen"
import PlayerScreen from "../screens/playerScreen"
import CreateCardScreen from "../screens/createCardScreen"
import ScoreboardScreen from "../screens/scoreboardScreen"

const Navbar = () => {
  const Stack = createStackNavigator()

  const settings = {
    headerRight: (props: any) => (
      <SettingsIcon
        size={24}
        color="black"
        style={{ marginRight: 16 }}
        onPress={() => props.navigation.navigate("SetPlayer")}
      />
    ),
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Gametype"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#CAEFFF",
          },
          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen name="GameType" component={GameTypeScreen} />
        <Stack.Screen
          name="SetPlayer"
          component={PlayerScreen}
          options={settings}
        />
        <Stack.Screen name="Game" component={GameScreen} options={settings} />
        <Stack.Screen
          name="Scoreboard"
          component={ScoreboardScreen}
          options={settings}
        />
        <Stack.Screen
          name="Settings"
          component={SettingScreen}
          options={settings}
        />
        <Stack.Screen
          name="customCards"
          component={CreateCardScreen}
          options={settings}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navbar
