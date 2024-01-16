import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyCiyuHtO6Bklwejw_fiVuggIomrZPJlYjI",
  authDomain: "loginactivity-68e27.firebaseapp.com",
  projectId: "loginactivity-68e27",
  storageBucket: "loginactivity-68e27.appspot.com",
  messagingSenderId: "347726672580",
  appId: "1:347726672580:web:78b7c71e768842e3cfcf91",
  measurementId: "G-L1TP10T9YG"
};

const app = initializeApp(firebaseConfig);
const db= getFirestore(app)
const auth= getAuth(app)

export  {db,auth};