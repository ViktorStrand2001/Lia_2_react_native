import "react-native-gesture-handler"
import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import SettingScreen from "../screens/settingScreen"
import HomeScreen from "../screens/gameScreen"

const Navbar = () => {
const Stack = createStackNavigator()

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Game">
          <Stack.Screen name="Game" component={HomeScreen} />
          <Stack.Screen name="Settings" component={SettingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}

export default Navbar
