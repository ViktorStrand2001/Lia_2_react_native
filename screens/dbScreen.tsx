import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";
import { DocumentData } from "firebase/firestore";

const DbScreen = () => {
  const [documentData, setDocumentData] = useState<DocumentData | null>(null);
  const [selectedChallengeIndex, setSelectedChallengeIndex] = useState(0); // Default challenge index
  const challengeIds = ["MEUsaqyfyoMg2qUt4O3W", "1luIexuBu1dzg78oeMoY", "4JaMu6ODENoCN0zG2gdf"]; // List of all challenge IDs

  const handleSwitchChallenge = () => {
    setSelectedChallengeIndex((prevIndex) => (prevIndex + 1) % challengeIds.length); // Cycle through all challenge IDs
  };

  useEffect(() => {
    const fetchDocumentData = async () => {
      try {
        const docRef = doc(FIRESTORE_DB, "Lia2-challange", challengeIds[selectedChallengeIndex]);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDocumentData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchDocumentData();
  }, [selectedChallengeIndex]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "blue" }}>
      <View style={{ backgroundColor: "green", paddingTop: 16, paddingBottom: 16, marginHorizontal: 6, marginTop: 5, alignItems: "center", borderRadius: 20, justifyContent: "center", position: "relative" }}>
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
      <Button title="Switch Challenge" onPress={handleSwitchChallenge} />
    </View>
  );
};

export default DbScreen;
