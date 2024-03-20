import { collection, getDocs, query } from "firebase/firestore"
import { FIRESTORE_DB } from "../firebaseConfig"
import { Card } from "../utils/types"

export const fetchRandomChallenge = async (): Promise<Card | null> => {
  try {
    const challengesRef = collection(FIRESTORE_DB, "Lia2-challange")
    const queryRef = query(challengesRef)
    const querySnapshot = await getDocs(queryRef)
    const randomIndex = Math.floor(Math.random() * querySnapshot.docs.length)
    const randomChallengeDoc = querySnapshot.docs[randomIndex]
    const cardData = randomChallengeDoc.data() as Card
    return cardData
  } catch (error) {
    console.error("Error fetching document:", error)
    return null
  }
}
