import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage"
/**
 * @description Firebase configuration code - exporting Firestore, FireAuth and FireStorage
*/
const firebaseConfig = {
  apiKey: "AIzaSyDLvw0GsxoG0GCgv8NrWQNXYiiq9bLu2Oc",
  authDomain: "personal-dashboard-414ef.firebaseapp.com",
  projectId: "personal-dashboard-414ef",
  storageBucket: "personal-dashboard-414ef.appspot.com",
  messagingSenderId: "535499391091",
  appId: "1:535499391091:web:cecc2faf98d6ee51c92a06",
};
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const fireAuth = firebase.auth();
const fireStorage = firebase.storage();
const timestamp = firebase.firestore.Timestamp;
export { firestore, fireAuth, fireStorage, timestamp };
