import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC4B597_A_pmJX2uE3AxRKxjdumFkmUNec",
    authDomain: "elkblog-4de59.firebaseapp.com",
    projectId: "elkblog-4de59",
    storageBucket: "elkblog-4de59.firebasestorage.app",
    messagingSenderId: "746056422268",
    appId: "1:746056422268:web:77cffd72484ef009f7caf9",
    measurementId: "G-STEX9CQPHK"
  };

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default db;