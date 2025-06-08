import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC4B597_A_pmJX2uE3AxRKxjdumFkmUNec",
  authDomain: "elkblog-4de59.firebaseapp.com",
  projectId: "elkblog-4de59",
  storageBucket: "elkblog-4de59.appspot.com",
  messagingSenderId: "746056422268",
  appId: "1:746056422268:web:77cffd72484ef009f7caf9",
  measurementId: "G-STEX9CQPHK"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);      
export const storage = getStorage(app);   
