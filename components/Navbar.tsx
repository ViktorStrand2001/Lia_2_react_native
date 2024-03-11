import "react-native-gesture-handler"
import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import SettingScreen from "../screens/settingScreen"
import HomeScreen from "../screens/gameScreen"
import GameTypeScreen from "../screens/gameTypeScreen"
import { SettingsIcon } from "lucide-react-native"

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
        initialRouteName=" "
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
        <Stack.Screen name=" " component={GameTypeScreen} />
        <Stack.Screen name="Game" component={HomeScreen} options={settings} />
        <Stack.Screen
          name="Settings"
          component={SettingScreen}
          options={settings}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navbar
