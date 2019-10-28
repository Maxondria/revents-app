import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDUxpMQ6SiHY4l_e5dMPW7MkaoqJprXyEY",
  authDomain: "revents-app-store.firebaseapp.com",
  databaseURL: "https://revents-app-store.firebaseio.com",
  projectId: "revents-app-store",
  storageBucket: "revents-app-store.appspot.com",
  messagingSenderId: "34138011366",
  appId: "1:34138011366:web:da9b66d9859dc4c546ad27",
  measurementId: "G-B740VKYR9J"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
