import { StyleSheet, Text, View, Button } from "react-native"
import React from "react"

const GameScreen = (props: any) => {
  console.log(props)

  return (
    <View className="min-w-full min-h-full flex justify-center items-center">
      <Text>GameScreen</Text>
      <Button
        title="Game"
        onPress={() => props.navigation.navigate("Settings")}
      />
    </View>
  )
}

export default GameScreen
