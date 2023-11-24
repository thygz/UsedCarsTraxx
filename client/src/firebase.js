// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: 'estate-mern-ca810.firebaseapp.com',
    projectId: 'estate-mern-ca810',
    storageBucket: 'estate-mern-ca810.appspot.com',
    messagingSenderId: '579681835951',
    appId: '1:579681835951:web:04d13f342565f9000bad5a',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
