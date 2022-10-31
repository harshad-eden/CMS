import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMRPhql1iZ_Wqu5tqT_01dE6MXSJSv4YQ",
  authDomain: "edencarecms.firebaseapp.com",
  projectId: "edencarecms",
  storageBucket: "edencarecms.appspot.com",
  messagingSenderId: "109454063032",
  appId: "1:109454063032:web:5ca008e554a2ef9742cb4d",
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const storageRef = ref(app);
export const auth = getAuth(app);
