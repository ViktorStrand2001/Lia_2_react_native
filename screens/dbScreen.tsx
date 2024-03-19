import React, { useEffect, useState } from "react"
import { View, Text, Button } from "react-native"
import { collection, getDocs, query, where } from "firebase/firestore"
import { FIRESTORE_DB } from "../firebaseConfig"
import { DocumentData } from "firebase/firestore"

const DbScreen = () => {
  const [documentData, setDocumentData] = useState<DocumentData | null>(null)

  const fetchRandomChallenge = async () => {
    try {
      const challengesRef = collection(FIRESTORE_DB, "Lia2-challange")
      const q = query(challengesRef)
      const querySnapshot = await getDocs(q)
      const randomIndex = Math.floor(Math.random() * querySnapshot.docs.length)
      const randomChallengeDoc = querySnapshot.docs[randomIndex]
      setDocumentData(randomChallengeDoc.data())
    } catch (error) {
      console.error("Error fetching document:", error)
      // Handle error, e.g., display an error message to the user
    }
  }



  useEffect(() => {
    fetchRandomChallenge()
  }, [])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "blue",
      }}
    >
      <View
        style={{
          backgroundColor: "green",
          paddingTop: 16,
          paddingBottom: 16,
          marginHorizontal: 6,
          marginTop: 5,
          alignItems: "center",
          borderRadius: 20,
          justifyContent: "center",
          position: "relative",
        }}
      >
        {documentData && (
          <>
            <View style={{ padding: 10, borderRadius: 10, marginBottom: 20 }}>
              <Text style={{ fontWeight: "bold" }}>Instructions: </Text>
              <Text>{documentData.instructions}</Text>
            </View>
            <View style={{ padding: 10, borderRadius: 10, marginBottom: 20 }}>
              <Text style={{ fontWeight: "bold" }}>Rules: </Text>
              <Text>{documentData.Rules}</Text>
            </View>
            <View style={{ padding: 10, borderRadius: 10 }}>
              <Text style={{ fontWeight: "bold" }}>You will need: </Text>
              <Text>{documentData.YouWillNeed}</Text>
            </View>
          </>
        )}
      </View>
      <Button title="Switch Challenge" onPress={fetchRandomChallenge} />
    </View>
  )
}

export default DbScreen
