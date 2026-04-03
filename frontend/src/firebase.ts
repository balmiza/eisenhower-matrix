import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAWFl4UzLf2HQYjERZjW8lyUixYu_vI90w",
  authDomain: "plataforme-performance.firebaseapp.com",
  projectId: "plataforme-performance",
  storageBucket: "plataforme-performance.firebasestorage.app",
  messagingSenderId: "1030324086847",
  appId: "1:1030324086847:web:26350185b716b56283f08a"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
