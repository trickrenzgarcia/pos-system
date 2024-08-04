import { firebaseConfig } from "@/config/firebase";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Initialize Firebase / Firebase Storage
const app = initializeApp(firebaseConfig);
const storage = getStorage(app, 'gs://pos-system-d288b.appspot.com')

export { app, storage }