import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDF6_0RoTNzezBAhf4X8EFcvjNMW-ZglAM",
    authDomain: "news-c2458.firebaseapp.com",
    databaseURL: "https://news-c2458.firebaseio.com",
    projectId: "news-c2458",
    storageBucket: "news-c2458.appspot.com",
    messagingSenderId: "901413898402",
    appId: "1:901413898402:web:234450e03eac82bf476ffb",
    measurementId: "G-Z1LE7BXZCQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
