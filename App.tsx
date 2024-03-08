import React, { useState } from "react"
import { Text, View, Button } from "react-native"
import Navbar from "./screens/components/Navbar"


export default function App() {
  const [openLandingPageOpen, setOpenLandingPageOpen] = useState<boolean>(false)

  return (
    <View className="min-w-full min-h-full">
      {!openLandingPageOpen ? (
        <View className="w-full h-full flex justify-center items-center ">
          <Text className=" ">Landingssida</Text>

          <Button
            title="Play Now!"
            onPress={() => setOpenLandingPageOpen(true)}
          ></Button>
        </View>
      ) : (
        <Navbar />
      )}
    </View>
  )
}