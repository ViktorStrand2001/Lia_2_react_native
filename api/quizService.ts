import { collection, getDocs, query } from "firebase/firestore"
import { FIRESTORE_DB } from "../firebaseConfig"
import { Quiz } from "../utils/types"

export const fetchRandomQuiz = async (
  gameType: string
): Promise<Quiz | null> => {
  try {
    const challengesRef = collection(FIRESTORE_DB, gameType)
    const queryRef = query(challengesRef)
    const querySnapshot = await getDocs(queryRef)
    const randomIndex = Math.floor(Math.random() * querySnapshot.docs.length)
    const randomChallengeDoc = querySnapshot.docs[randomIndex]
    const quizData = randomChallengeDoc.data() as Quiz
    return quizData
  } catch (error) {
    console.error("Error fetching document:", error)
    return null
  }
}
