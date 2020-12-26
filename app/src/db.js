import firebase from "firebase/app";
import "firebase/firestore";

// Get a Firestore instance
export const db = firebase.initializeApp({
	apiKey: "AIzaSyAoXss-NMk_83OQ9bpPjr8vV1A-ZeHQ5H8",
	authDomain: "rss-bulletin.firebaseapp.com",
	databaseURL: "https://rss-bulletin-default-rtdb.firebaseio.com",
	projectId: "rss-bulletin",
	storageBucket: "rss-bulletin.appspot.com",
	messagingSenderId: "503151740867",
	appId: "1:503151740867:web:5d8fc9bff9da9942691f76",
	measurementId: "G-B8BBHMKYV4",
}).firestore();

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore;
export { Timestamp, GeoPoint };

// if using Firebase JS SDK < 5.8.0
db.settings({ timestampsInSnapshots: true });
