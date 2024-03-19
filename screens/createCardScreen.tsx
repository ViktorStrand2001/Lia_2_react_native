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

const CreateCardScreen = () => {
  const [formData, setFormData] = useState({
    title: "",
    instructions: "",
    rules: "",
    time: "",
    youWillNeed: "",
  })

  const handleSubmit = async () => {
    try {
      const cardRef = collection(FIRESTORE_DB, "Lia2-challange")
      await addDoc(cardRef, formData)
      console.log("Card added successfully!")
      console.log(addDoc);
      // Reset form after submission
      setFormData({
        title: "",
        instructions: "",
        rules: "",
        time: "",
        youWillNeed: "",
      })
    } catch (error) {
      console.error("Error adding card: ", error)
    }
  }

  return (
    <View className="w-full h-full flex justify-center items-center mt-4">
      <ScrollView className="w-full px-6 h-screen">
        <Text className="text-2xl font-bold mb-5">Make a Card!</Text>
        <TextInput
          className="border border-gray-300 rounded p-4 mb-4 w-full"
          placeholder="Title"
          value={formData.title}
          onChangeText={(text) => setFormData({ ...formData, title: text })}
        />
        <TextInput
          placeholder="Instructions"
          value={formData.instructions}
          onChangeText={(text) =>
            setFormData({ ...formData, instructions: text })
          }
          multiline
          numberOfLines={4}
          className="border border-gray-300 rounded p-4 mb-4 w-full"
        />
        <TextInput
          placeholder="Rules"
          value={formData.rules}
          onChangeText={(text) => setFormData({ ...formData, rules: text })}
          multiline
          numberOfLines={4}
          className="border border-gray-300 rounded p-4 mb-4 w-full"
        />
        <TextInput
          placeholder="Time (in minutes)"
          value={formData.time}
          onChangeText={(text) => setFormData({ ...formData, time: text })}
          keyboardType="numeric"
          className="border border-gray-300 rounded p-4 mb-4 w-full"
        />
        <TextInput
          placeholder="You Will Need"
          value={formData.youWillNeed}
          onChangeText={(text) =>
            setFormData({ ...formData, youWillNeed: text })
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

export default CreateCardScreen
