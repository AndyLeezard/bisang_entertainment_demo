// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
//import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
  appId: process.env.FIREBASE_APPID,
  //measurementId: process.env.FIREBASE_MID,
}

const app = initializeApp(firebaseConfig)
/* let analytics
if (firebaseConfig?.projectId && app.name && typeof window !== "undefined") {
  analytics = getAnalytics(app)
} */
const firestore = getFirestore(app)
const firebase_auth = getAuth(app)

export { firestore, firebase_auth }
