import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

console.log(process.env.projectId)

const firebaseConfig = {
  apiKey: "AIzaSyCmoHElG4dpgP8VsXJ2FDdSTC-hd8QTMzE",
  authDomain: "firegram-5f437.firebaseapp.com",
  databaseURL: "https://firegram-5f437.firebaseio.com",
  projectId: "firegram-5f437",
  storageBucket: "firegram-5f437.appspot.com",
  messagingSenderId: "1012235796944",
  appId: "1:1012235796944:web:4fd1636fb1acce085bb9d5"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const projectStorage = firebase.storage();
export const projectFirestore = firebase.firestore();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
