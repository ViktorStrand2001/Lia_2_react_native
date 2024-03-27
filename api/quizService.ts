import { collection, getDocs, query } from "firebase/firestore"
import { FIRESTORE_DB } from "../firebaseConfig"
import { Quiz } from "../utils/types"

export const fetchRandomQuiz = async (gameType: string): Promise<Quiz | null> => {
  try {
    const QuizRef = collection(FIRESTORE_DB, gameType)
    const queryRef = query(QuizRef)
    const querySnapshot = await getDocs(queryRef)
    const randomIndex = Math.floor(Math.random() * querySnapshot.docs.length)
    const randomQuizDoc = querySnapshot.docs[randomIndex]
    const quizData = randomQuizDoc.data() as Quiz
    return quizData
  } catch (error) {
    console.error("Error fetching document:", error)
    return null
  }
}
