import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyAVvArBMj4LqYjqDN10Qamr5ESk_Z3xVsA",
  authDomain: "how-far-1e98d.firebaseapp.com",
  databaseURL: "https://how-far-1e98d-default-rtdb.firebaseio.com",
  projectId: "how-far-1e98d",
  storageBucket: "how-far-1e98d.firebasestorage.app",
  messagingSenderId: "602820378639",
  appId: "1:602820378639:web:5c241f8d60afb069b8237a"
}

const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)
