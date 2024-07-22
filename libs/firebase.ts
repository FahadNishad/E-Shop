// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD57tDYUukCufRQS0nyvYjhh25ssOOfZ6I",
    authDomain: "e-shop-nextjs-7ba0e.firebaseapp.com",
    projectId: "e-shop-nextjs-7ba0e",
    storageBucket: "e-shop-nextjs-7ba0e.appspot.com",
    messagingSenderId: "413661733852",
    appId: "1:413661733852:web:d11e0e8d5b7ebe8f6ea519"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp