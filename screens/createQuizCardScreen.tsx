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
    Title: "",
    Context: "",
    Answer: "",
  })

  const handleSubmit = async () => {
    try {
      const cardRef = collection(FIRESTORE_DB, "Quiz")
      await addDoc(cardRef, formData)
      console.log("Card added successfully!")
      console.log(addDoc)

      setFormData({
        Title:"",
        Context:"",
        Answer:""
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
          value={formData.Title}
          onChangeText={(text) => setFormData({ ...formData, Title: text })}
        />
        <TextInput
          placeholder="Context"
          value={formData.Context}
          onChangeText={(text) =>
            setFormData({ ...formData, Context: text })
          }
          multiline
          numberOfLines={4}
          className="border border-gray-300 rounded p-4 mb-4 w-full"
        />
        <TextInput
          placeholder="Answer"
          value={formData.Answer}
          onChangeText={(text) => setFormData({ ...formData, Answer: text })}
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
