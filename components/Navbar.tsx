import "react-native-gesture-handler"
import { createStackNavigator } from "@react-navigation/stack"
import React, { useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import GameTypeScreen from "../screens/gameTypeScreen"
import { SettingsIcon } from "lucide-react-native"
import SettingScreen from "../screens/settingscreen"
import GameScreen from "../screens/gameScreen"
import PlayerScreen from "../screens/playerScreen"
import CreateCardScreen from "../screens/createCardScreen"

const Navbar = () => {
  const Stack = createStackNavigator()

  const settings = {
    headerRight: () => (
      <SettingsIcon size={24} color="black" style={{ marginRight: 16 }} />
    ),
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Game"
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
