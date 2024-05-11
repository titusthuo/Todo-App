import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDrWySFdV_UVieZVTcqueusvEMUci0CjOU",
    authDomain: "todo-list-c7cca.firebaseapp.com",
    databaseURL: "https://todo-list-c7cca-default-rtdb.firebaseio.com",
    projectId: "todo-list-c7cca",
    storageBucket: "todo-list-c7cca.appspot.com",
    messagingSenderId: "790407574131",
    appId: "1:790407574131:web:cbd991d3e5baa63f1e7006"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();