import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDQ1uNsBvzGdKAUwQzucRnWpReMCk3iTM8",
  authDomain: "lia2-challange.firebaseapp.com",
  projectId: "lia2-challange",
  storageBucket: "lia2-challange.appspot.com",
  messagingSenderId: "280638840111",
  appId: "1:280638840111:web:23697bc2284a3a300855da",
  measurementId: "G-FHFXTWFR2Y",
}

export const FIREBASE_APP = initializeApp(firebaseConfig)
export const FIRESTORE_DB = getFirestore(FIREBASE_APP)
