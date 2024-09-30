import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBrjWpSBiw2axdLJKB6eVNKkmxgEXE6E48",
  authDomain: "nullpointer-494f8.firebaseapp.com",
  projectId: "nullpointer-494f8",
  storageBucket: "nullpointer-494f8.appspot.com",
  messagingSenderId: "916605995445",
  appId: "1:916605995445:web:b1f750504bdca7fb55f1fc"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };