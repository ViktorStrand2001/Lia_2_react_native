import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native"
import { FIRESTORE_DB } from "../firebaseConfig"
import { addDoc, collection } from "firebase/firestore"
import { Select } from "native-base"

const CreateTeamBattleCardScreen = () => {
  const [formData, setFormData] = useState({
    Gamemode: "",
    Title: "",
    Instructions: "",
    Rules: "",
    Time: "",
    YouWillNeed: "",
  })

  const handleSubmit = async () => {
    try {
      const cardRef = collection(FIRESTORE_DB, "Group-Battles")
      await addDoc(cardRef, formData)
      console.log("Card added successfully!")
      console.log(addDoc)

      setFormData({
        Gamemode: "",
        Title: "",
        Instructions: "",
        Rules: "",
        Time: "",
        YouWillNeed: "",
      })
    } catch (error) {
      console.error("Error adding card: ", error)
    }
  }

  return (
    <View className="w-full h-full flex justify-center items-center mt-4">
      <ScrollView className="w-full px-6 h-screen">
        <Text className="text-2xl font-bold mb-5">
          Make a Free for all Card!
        </Text>
        <View className="py-4">
          <Select
            className=" border-gray-300 rounded p-4 mb-4 w-full"
            accessibilityLabel="Choose Service"
            onValueChange={(text) =>
              setFormData({ ...formData, Gamemode: text })
            }
          >
            <Select.Item label="Countdown" value="Countdown" />
            <Select.Item label="Timer" value="Timer" />
          </Select>
        </View>
        <TextInput
          className="border border-gray-300 rounded p-4 mb-4 w-full"
          placeholder="Title"
          value={formData.Title}
          onChangeText={(text) => setFormData({ ...formData, Title: text })}
        />
        <TextInput
          placeholder="Instructions"
          value={formData.Instructions}
          onChangeText={(text) =>
            setFormData({ ...formData, Instructions: text })
          }
          multiline
          numberOfLines={4}
          className="border border-gray-300 rounded p-4 mb-4 w-full"
        />
        <TextInput
          placeholder="Rules"
          value={formData.Rules}
          onChangeText={(text) => setFormData({ ...formData, Rules: text })}
          multiline
          numberOfLines={4}
          className="border border-gray-300 rounded p-4 mb-4 w-full"
        />
        <TextInput
          placeholder="Time (in minutes)"
          value={formData.Time}
          onChangeText={(text) => {
            if (formData.Gamemode === "Timer") {
              setFormData({ ...formData, Time: "0" })
            } else {
              setFormData({ ...formData, Time: text })
            }
          }}
          keyboardType="numeric"
          className="border border-gray-300 rounded p-4 mb-4 w-full"
        />
        <TextInput
          placeholder="You Will Need"
          value={formData.YouWillNeed}
          onChangeText={(text) =>
            setFormData({ ...formData, YouWillNeed: text })
          }
          multiline
          numberOfLines={4}
          className="border border-gray-300 rounded p-4 mb-4 w-full"
        />
        <View className="w-full flex justify-center items-center ">
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-blue-600 py-2 px-5 rounded flex justify-center items-center w-32 h-12"
          >
            <Text className="text-white">Create Post</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default CreateTeamBattleCardScreen
